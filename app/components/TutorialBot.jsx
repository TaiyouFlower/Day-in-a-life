"use client";
// Remove useEffect and useState for visibility
import { useAppContext } from '../context/AppContext';

export default function TutorialBot() {
  // Get simulation state and functions from context
  const { simulationData, currentStepId, goToNextStep, openChrome, openTelegram } = useAppContext();

  // Don't render if data isn't loaded or no current step
  if (!simulationData || !currentStepId) {
    return null;
  }

  // Find the current step object based on the ID
  const currentStep = simulationData.steps.find(step => step.id === currentStepId);

  // Don't render if the current step ID is invalid or step is missing
  if (!currentStep) {
    console.warn(`TutorialBot: Could not find step with ID: ${currentStepId}`);
    return null;
  }
   // Don't render if step type is 'waitForAppOpen' - user needs to click icon
   if (currentStep.type === 'waitForAppOpen') {
    // Optionally show a subtle hint near the taskbar icon? For now, just hide bot.
    console.log(`TutorialBot hidden: Waiting for user to open ${currentStep.app}`);
    return null;
  }

  // Handle specific button actions based on step type (optional)
  const handleActionClick = () => {
    // Example: If the step requires opening an app via button
    if (currentStep.type === 'promptOpenApp') {
      if (currentStep.app === 'chrome') {
        openChrome();
      } else if (currentStep.app === 'telegram') {
        openTelegram();
      }
      // Note: openChrome/openTelegram might already call goToNextStep
      // If not, call it here:
      // goToNextStep();
    } else {
      // Default action for most instructions/messages is just to go next
      goToNextStep();
    }
  };


  return (
    // Render the bot UI only if there's a valid current step to display
    <div className="absolute bottom-20 right-4 flex items-end gap-2 z-40 animate-fade-in"> {/* Use fade-in, maybe remove bounce */}
      {/* Speech Bubble */}
      <div className="relative bg-white rounded-lg p-4 shadow-xl max-w-xs">
        {/* Display dynamic content from the current step */}
        <p className="text-sm text-gray-700">
          {currentStep.content || "Missing content for this step."}
        </p>

        {/* Conditionally render a button if actionText is provided */}
        {currentStep.actionText && (
           <button
              onClick={handleActionClick}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
           >
             {currentStep.actionText}
           </button>
        )}
         {/* If no action text, but it's a simple message, maybe advance automatically or implicitly?
             For now, we require actionText or specific types like waitForAppOpen */}

      </div>

      {/* Bot Image */}
      <img
        src="/images/bot.png"
        alt="Tutorial Bot"
        className="w-16 h-16 object-contain"
      />
    </div>
  );
}