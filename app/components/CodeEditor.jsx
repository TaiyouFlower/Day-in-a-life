// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/components/CodeEditor.jsx
"use client";
import { useAppContext } from '../context/AppContext';
import { WindowFrame } from './WindowFrame';
// --- NEW: Import Syntax Highlighter ---
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// --- NEW: Import a theme (choose one you like, e.g., vscDarkPlus, atomOneDark, nord) ---
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Or atomOneDark, etc.

export default function CodeEditor() {
  const { closeCodeEditor } = useAppContext();

  // Example code snippet (can be dynamic later)
  const codeSnippet = `// File: components/Button.jsx
import React from 'react';

function Button({ children, onClick, variant = 'primary' }) {
  // Base styles for all buttons
  const baseStyle = 'px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant specific styles
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
       onClick={onClick}
       className={\`\${baseStyle} \${variants[variant]}\`}
     >
      {children}
    </button>
  );
}

// Don't forget to export!
export default Button;
`;

  return (
     <WindowFrame title="Code Editor Simulation - Button.jsx" onClose={closeCodeEditor} iconPath="/images/code.png">
        {/* Remove the explicit dark background if the theme provides one */}
        <div className="flex flex-col h-full text-sm">
             {/* Optional: Tab Bar or File Path */}
            <div className="flex border-b border-gray-700/50 flex-shrink-0 px-4 py-1.5 bg-gray-700/60">
                <span className="text-gray-300 text-xs">components / Button.jsx</span>
            </div>

             {/* Editor Area using SyntaxHighlighter */}
            <div className="flex-1 overflow-auto font-mono text-xs"> {/* Ensure overflow */}
                <SyntaxHighlighter
                    language="javascript" // Specify the language
                    style={vscDarkPlus} // Apply the imported theme
                    showLineNumbers={true} // Optional: Show line numbers
                    wrapLines={true} // Optional: Wrap long lines
                    customStyle={{ // Optional: Apply custom styles like padding or background override
                        margin: 0, // Remove default margin
                        padding: '1rem', // Add padding inside
                        height: '100%', // Ensure it tries to fill space
                        backgroundColor: 'transparent' // Use theme's background, or set one like '#1e1e1e'
                    }}
                    codeTagProps={{ // Style the inner code tag if needed
                       style: { fontFamily: 'var(--font-geist-mono)' } // Use your mono font
                    }}
                 >
                    {codeSnippet.trim()} {/* Pass the code string as children, trim whitespace */}
                </SyntaxHighlighter>
            </div>

            {/* Optional: Status Bar */}
            <div className="h-6 bg-blue-800/80 text-white flex items-center justify-between px-3 text-xs flex-shrink-0 border-t border-gray-700/50">
                <span>Ln 1, Col 1</span>
                <span>JavaScript</span>
                <span>UTF-8</span>
                <span>Spaces: 2</span>
                <span>Ready</span>
            </div>
        </div>
     </WindowFrame>
  );
}