// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/components/CodeEditor.jsx
"use client";
import { useState } from 'react'; // Added useState
import { useAppContext } from '../context/AppContext';
import { WindowFrame } from './WindowFrame';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeEditor() {
  const { closeCodeEditor } = useAppContext();

  // --- State for Code and Output ---
  const [codeSnippet, setCodeSnippet] = useState(
    `// File: hello.js \nconsole.log("Hello, World!");\n\n// Try changing the message and running again!`
  ); // Default Hello World code
  const [output, setOutput] = useState(''); // State to hold the simulated output
  const [isRunning, setIsRunning] = useState(false); // State for run button feedback

  // --- Simulate Running the Code ---
  const handleRunCode = () => {
    if (isRunning) return; // Prevent multiple runs at once

    setIsRunning(true);
    setOutput('Running hello.js...\n'); // Initial output

    // Simulate execution time
    setTimeout(() => {
      // Simulate console.log output - extract message from code (basic example)
      const match = codeSnippet.match(/console\.log\("(.*)"\);/);
      const message = match ? match[1] : "Output not found in code";

      setOutput(prev => prev + `${message}\n\nProcess finished.`); // Append final output
      setIsRunning(false);
    }, 800); // Simulate 0.8 seconds execution time
  };

  // --- Clear the output ---
  const handleClearOutput = () => {
      setOutput('');
  };

  return (
     // Update Window Title Dynamically
     <WindowFrame title="Code Editor Simulation - hello.js" onClose={closeCodeEditor} iconPath="/images/code.png">
        {/* Main flex container for editor layout */}
        <div className="flex flex-col h-full text-sm bg-[#1e1e1e]"> {/* Editor background */}

            {/* Optional Toolbar (instead of just file tab) */}
            <div className="flex items-center justify-between border-b border-gray-700/50 flex-shrink-0 px-2 py-1 bg-gray-700/60 text-xs">
                <span className="text-gray-300 px-2">File: hello.js</span>
                {/* RUN BUTTON */}
                <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className={`flex items-center gap-1 px-3 py-0.5 rounded text-white transition-colors focus:outline-none focus:ring-1 focus:ring-green-400 ${
                        isRunning
                        ? 'bg-gray-500 cursor-wait'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                     {isRunning ? (
                        <>
                            <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-40"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-90"></path></svg>
                            Running...
                        </>
                    ) : (
                         <>
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"></path></svg>
                            Run
                         </>
                    )}
                </button>
            </div>

            {/* Editor Area */}
            {/* Using flex-grow with a percentage height for editor, leaving space for output */}
            <div className="overflow-auto font-mono text-xs flex-grow h-[65%]"> {/* Adjust height % as needed */}
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{
                        margin: 0,
                        padding: '0.75rem', // Slightly less padding
                        height: '100%',
                        fontSize: '0.8rem', // Slightly smaller font
                        backgroundColor: '#1e1e1e' // Explicit background match
                    }}
                    codeTagProps={{
                       style: { fontFamily: 'var(--font-geist-mono, monospace)' } // Fallback monospace
                    }}
                 >
                    {codeSnippet} {/* No trim needed if state handles it */}
                </SyntaxHighlighter>
            </div>

             {/* --- NEW: Output/Terminal Panel --- */}
             <div className="flex flex-col flex-shrink-0 border-t-2 border-gray-700 h-[35%]"> {/* Adjust height % */}
                 {/* Terminal Header */}
                 <div className="flex justify-between items-center px-3 py-1 bg-gray-700/80 text-xs flex-shrink-0 border-b border-gray-600/50">
                    <span className="text-gray-300 font-medium">Output / Terminal</span>
                    <button
                        onClick={handleClearOutput}
                        title="Clear Output"
                        className="text-gray-400 hover:text-white disabled:text-gray-600 p-0.5 rounded hover:bg-white/10 text-xs"
                        disabled={!output || isRunning}
                    >
                        Clear
                    </button>
                 </div>
                 {/* Terminal Content */}
                 <div className="flex-1 bg-black/80 p-2 overflow-y-auto font-mono text-xs">
                    <pre className="whitespace-pre-wrap text-gray-200">
                        {output || <span className="text-gray-500">Click 'Run' to execute hello.js...</span>}
                    </pre>
                 </div>
             </div>

            {/* Status Bar (Optional) */}
            {/* <div className="h-6 bg-blue-800/80 ...">...</div> */}
        </div>
     </WindowFrame>
  );
}