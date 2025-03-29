"use client";
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Create the context
const AppContext = createContext(undefined);

// Create the provider component
export function AppWrapper({ children }) {
  // --- Visibility State ---
  const [chromeVisible, setChromeVisible] = useState(false);
  const [telegramVisible, setTelegramVisible] = useState(false);
  // NEW App Visibility States
  const [slackVisible, setSlackVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [codeEditorVisible, setCodeEditorVisible] = useState(false);
  const [docViewerVisible, setDocViewerVisible] = useState(false);

  // --- Simulation State ---
  const [simulationData, setSimulationData] = useState(null);
  const [currentStepId, setCurrentStepId] = useState(null);
  const [isLoadingSim, setIsLoadingSim] = useState(true);
  const [simError, setSimError] = useState(null);

  // --- Task & Message State ---
  const [taskStatuses, setTaskStatuses] = useState({});
  const [messageStatuses, setMessageStatuses] = useState({});

  // --- Initialize Task Statuses ---
  useEffect(() => {
    if (simulationData?.tasks) {
      const initialStatuses = {};
      simulationData.tasks.forEach(task => {
        initialStatuses[task.id] = task.column || 'Dev - To Do';
      });
      setTaskStatuses(initialStatuses);
      console.log("AppContext: Task statuses initialized:", initialStatuses);
    } else {
      setTaskStatuses({});
    }
  }, [simulationData]);

  // --- Initialize Message Statuses ---
  useEffect(() => {
    if (simulationData?.emails) {
      const initialStatuses = {};
      simulationData.emails.forEach(email => {
        initialStatuses[email.id] = 'unread';
      });
      setMessageStatuses(initialStatuses);
      console.log("AppContext: Message statuses initialized:", initialStatuses);
    } else {
      setMessageStatuses({});
    }
  }, [simulationData]);


  // --- Functions ---
  const loadSimulation = useCallback((data) => {
    if (data && data.steps && data.initialStepId) {
      setSimulationData(data);
      setCurrentStepId(data.initialStepId);
      setIsLoadingSim(false);
      setSimError(null);
      console.log("AppContext: Simulation data loaded, initial step:", data.initialStepId);
    } else {
      console.error("AppContext: Invalid simulation data structure received:", data);
      setSimError("Failed to load valid simulation data.");
      setSimulationData(null);
      setCurrentStepId(null);
      setIsLoadingSim(false);
    }
  }, []);

  const setSimLoadingError = useCallback((loading, error = null) => {
      setIsLoadingSim(loading);
      setSimError(error);
      if (error) {
          setSimulationData(null);
          setCurrentStepId(null);
      }
  }, []);

  const goToNextStep = useCallback(() => {
    if (!simulationData || currentStepId === null) return;
    const currentStep = simulationData.steps.find(step => step.id === currentStepId);
    if (currentStep && currentStep.nextStepId) {
      console.log(`AppContext: Advancing from step ${currentStepId} to ${currentStep.nextStepId}`);
      setCurrentStepId(currentStep.nextStepId);
    } else if (currentStep) {
       console.log(`AppContext: End of simulation reached or no nextStepId for step ${currentStepId}`);
       setCurrentStepId("end");
    }
  }, [simulationData, currentStepId]);

  // Generic handler for opening apps and potentially advancing simulation
  const handleAppOpen = useCallback((appName, setVisible) => {
      setVisible(true);
      const currentStep = simulationData?.steps.find(step => step.id === currentStepId);
      // Check if the current step was waiting for THIS specific app
      if (currentStep?.type === 'waitForAppOpen' && currentStep?.app === appName) {
          console.log(`AppContext: ${appName} opened while waiting on step ${currentStepId}, advancing.`);
          setTimeout(goToNextStep, 50); // Short delay might help ensure visibility update happens first
      }
   }, [simulationData, currentStepId, goToNextStep]);

  const updateTaskStatus = useCallback((taskId, newStatus) => { /* ... (no changes needed here) ... */ });
  const updateMessageStatus = useCallback((messageId, newStatus) => { /* ... (no changes needed here) ... */ });

  // The value provided to the context consumers
  const contextValue = {
    // Existing Visibility & Handlers
    chromeVisible,
    telegramVisible,
    openChrome: useCallback(() => handleAppOpen('chrome', setChromeVisible), [handleAppOpen]),
    closeChrome: useCallback(() => setChromeVisible(false), []),
    openTelegram: useCallback(() => handleAppOpen('telegram', setTelegramVisible), [handleAppOpen]),
    closeTelegram: useCallback(() => setTelegramVisible(false), []),

    // NEW App Visibility & Handlers
    slackVisible,
    calendarVisible,
    codeEditorVisible,
    docViewerVisible,
    openSlack: useCallback(() => handleAppOpen('slack', setSlackVisible), [handleAppOpen]),
    closeSlack: useCallback(() => setSlackVisible(false), []),
    openCalendar: useCallback(() => handleAppOpen('calendar', setCalendarVisible), [handleAppOpen]),
    closeCalendar: useCallback(() => setCalendarVisible(false), []),
    openCodeEditor: useCallback(() => handleAppOpen('codeEditor', setCodeEditorVisible), [handleAppOpen]),
    closeCodeEditor: useCallback(() => setCodeEditorVisible(false), []),
    openDocViewer: useCallback(() => handleAppOpen('docViewer', setDocViewerVisible), [handleAppOpen]),
    closeDocViewer: useCallback(() => setDocViewerVisible(false), []),


    // Simulation State & Functions
    simulationData,
    currentStepId,
    isLoadingSim,
    simError,
    loadSimulation,
    setSimLoadingError,
    goToNextStep,

    // Task & Message State & Functions
    taskStatuses,
    updateTaskStatus,
    messageStatuses,
    updateMessageStatus,
  };


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook remains the same
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
      throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}