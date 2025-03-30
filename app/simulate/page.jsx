// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/simulate/page.jsx
"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "../context/AppContext"; // Corrected path relative to app/simulate/
import Chrome from "@/app/components/Chrome";
import Telegram from "@/app/components/Telegram";
import TutorialBot from "@/app/components/TutorialBot";
// --- Import new app components ---
import Slack from "@/app/components/Slack";
import Calendar from "@/app/components/Calendar";
import CodeEditor from "@/app/components/CodeEditor";
import DocumentViewer from "@/app/components/DocumentViewer";

/**
 * Internal component to handle loading simulation data based on URL params.
 * Wrapped in Suspense by the main export.
 */
function SimulationLoader() {
  const searchParams = useSearchParams();
  // Correct context import path
  const { loadSimulation, setSimLoadingError } = useAppContext();

  useEffect(() => {
    const company = searchParams.get("company"); // Keep company if needed later
    const position = searchParams.get("position");

    if (!position) {
      console.error("SimulationLoader: Position parameter missing!");
      setSimLoadingError(false, "Position parameter is missing in URL.");
      return;
    }

    // Construct filename (e.g., "Junior Frontend Developer" -> "Junior-Frontend-Developer.json")
    const filename = `${position.replace(/\s+/g, "-")}.json`;
    const dataUrl = `/simulation-data/${filename}`;

    console.log(
      `SimulationLoader: Attempting to load simulation data from: ${dataUrl}`
    );
    setSimLoadingError(true, null); // Set loading true via context

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} - Could not find or load file ${filename}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("SimulationLoader: Data fetched successfully.");
        loadSimulation(data); // Pass valid data to context
      })
      .catch((error) => {
        console.error(
          "SimulationLoader: Error loading simulation data:",
          error
        );
        setSimLoadingError(false, `Error loading simulation: ${error.message}`); // Set error state via context
      });

    // Cleanup function is not strictly necessary for fetch in basic useEffect
    // If you had subscriptions or timers, you'd return a cleanup function here.
  }, [searchParams, loadSimulation, setSimLoadingError]); // Dependencies for useEffect

  return null; // This component only exists to run the effect
}

/**
 * Main component for the simulation page.
 * Renders the desktop environment, taskbar, and conditionally displayed app windows.
 */
export default function Windows11Desktop() {
  // Get state and functions from context
  const {
    openChrome,
    openTelegram,
    chromeVisible,
    telegramVisible,
    openSlack,
    openCalendar,
    openCodeEditor,
    openDocViewer,
    slackVisible,
    calendarVisible,
    codeEditorVisible,
    docViewerVisible,
    isLoadingSim,
    simError,
  } = useAppContext(); // Correct context import path

  return (
    // Use Suspense to handle client-side data fetching in SimulationLoader
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white text-xl">
          Loading Simulation Interface...
        </div>
      }
    >
      {/* Component responsible for fetching data */}
      <SimulationLoader />

      {/* Main Desktop Container */}
      <div
        className="h-screen w-screen bg-cover bg-center relative font-windows overflow-hidden" // Added overflow-hidden here too
        style={{ backgroundImage: "url('/images/w11.jpg')" }} // Ensure this image exists in public/images
      >
        {/* Loading / Error Overlay */}
        {isLoadingSim && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
            <p className="text-white text-xl animate-pulse">
              Loading Simulation Data...
            </p>
          </div>
        )}
        {simError && (
          <div className="absolute inset-0 bg-red-900/90 backdrop-blur-sm flex items-center justify-center z-[999] p-6 text-center">
            <p className="text-white text-lg font-medium">{simError}</p>
          </div>
        )}

        {/* Render App Windows only if not loading and no error */}
        {!isLoadingSim && !simError && (
          <>
            <TutorialBot />
            {chromeVisible && <Chrome />}
            {telegramVisible && <Telegram />}
            {slackVisible && <Slack />}
            {calendarVisible && <Calendar />}
            {codeEditorVisible && <CodeEditor />}
            {docViewerVisible && <DocumentViewer />}
          </>
        )}

        {/* --- Taskbar --- */}
        <div className="flex justify-center items-center absolute bottom-0 left-0 right-0 h-14 bg-slate-900/85 backdrop-blur-xl px-4 border-t border-white/10 shadow-2xl z-50">
          {/* Pinned App Icons Area */}
          <div className="flex items-center space-x-2.5">
            {" "}
            {/* Slightly reduced spacing */}
            {/* Windows Start Button */}
            <button
              title="Start"
              className="p-2 rounded hover:bg-white/10 transition-colors"
            >
              <img
                src="/images/windows.png"
                alt="Start"
                className="w-12 h-12 object-contain"
              />
            </button>
            <div className="flex items-center bg-white/10 rounded-full px-4 h-10 hover:bg-white/20 transition-colors cursor-pointer w-64">
              <svg
                className="w-5 h-5 text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-white/80 text-sm ml-2">Search</span>
            </div>
            {/* App Icons */}
            <button
              title="Google Chrome"
              onClick={openChrome}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <img
                src="/images/chrome.png"
                alt="Chrome"
                className="w-9 h-9 object-contain"
              />
            </button>
            <button
              title="Telegram"
              onClick={openTelegram}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <img
                src="/images/telegram.png"
                alt="Telegram"
                className="w-11 h-11 object-contain"
              />
            </button>
            <button
              title="Slack"
              onClick={openSlack}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <img
                src="/images/slack.png"
                alt="Slack"
                className="w-7 h-7 object-contain"
              />
            </button>
            <button
              title="Calendar"
              onClick={openCalendar}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <img
                src="/images/calendar.png"
                alt="Calendar"
                className="w-7 h-7 object-contain"
              />
            </button>
            <button
              title="Code Editor"
              onClick={openCodeEditor}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <img
                src="/images/vscode.png"
                alt="Code Editor"
                className="w-10 h-10 object-contain"
              />
            </button>
            <button
              title="Documents"
              onClick={openDocViewer}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <img
                src="/images/docx.png"
                alt="Documents"
                className="w-10 h-10 object-contain"
              />
            </button>
          </div>

          {/* System Tray Icons (Right - Placeholder) */}
          <div className="absolute right-4 flex items-center space-x-3">
            {/* Add clock, wifi icon etc. */}
            <span className="text-base text-gray-300">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
