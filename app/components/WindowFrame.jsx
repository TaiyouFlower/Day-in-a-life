// app/components/WindowFrame.jsx
"use client";

// Reusable Window Frame Component
// Ensure 'export' is present before 'function'
export function WindowFrame({ title = "Application", children, onClose, iconPath }) {
    return (
        // Draggable window simulation (basic) - requires more libraries for real dragging
        // Using Tailwind's resize utility for visual cue (doesn't actually resize)
        <div className="absolute top-10 left-10 right-10 bottom-20 md:top-16 md:left-16 md:right-16 md:bottom-24 min-w-[320px] min-h-[250px] bg-gray-800/95 backdrop-blur-lg rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-600/50 z-30 animate-fade-in resize">
            {/* Title Bar */}
            <div className="h-8 flex items-center px-3 border-b border-gray-700/50 bg-gray-700/60 flex-shrink-0 justify-between cursor-grab active:cursor-grabbing" title={`Drag ${title}`}>
                 <div className="flex items-center space-x-2 overflow-hidden">
                     {iconPath && <img src={iconPath} alt="" className="w-4 h-4 opacity-80 flex-shrink-0" />}
                    <span className="text-xs font-medium text-gray-200 truncate">{title}</span>
                 </div>
                 {/* Window Controls */}
                <div className="flex space-x-1.5 flex-shrink-0">
                    <button title="Minimize" className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none border border-black/20"/>
                    <button title="Maximize" className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none border border-black/20"/>
                    <button onClick={onClose} title="Close" className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none border border-black/20"/>
                </div>
            </div>
            {/* Content Area */}
            <div className="flex-1 p-4 overflow-auto text-gray-200">
                {children}
            </div>
            {/* Optional: Status bar or resize handle visual */}
            <div className="h-2 bg-gray-700/50 flex-shrink-0 border-t border-gray-700/50 cursor-nwse-resize"></div>
        </div>
    );
}