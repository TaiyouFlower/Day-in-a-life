// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/components/DocumentViewer.jsx
"use client";
import { useAppContext } from '../context/AppContext';
import { WindowFrame } from './WindowFrame';

export default function DocumentViewer() {
  const { closeDocViewer } = useAppContext();

  const documentTitle = "Project Phoenix - Requirements Spec V1.2";
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nPhasellus egestas tellus rutrum tellus pellentesque eu. Purus semper eget duis at tellus at urna condimentum. Nunc sed id semper risus in hendrerit gravida rutrum. Amet justo donec enim diam vulputate ut. Accumsan lacus vel facilisis volutpat est velit egestas. Nisl tincidunt eget nullam non nisi est sit amet facilisis.";

  return (
     <WindowFrame title={documentTitle} onClose={closeDocViewer} iconPath="/images/docs.png">
         <div className="flex flex-col h-full">
             {/* Toolbar */}
             <div className="p-2 border-b border-white/10 flex items-center space-x-3 flex-shrink-0 bg-gray-700/40">
                <button className="p-1 rounded hover:bg-white/10 text-gray-300" title="Zoom Out"><svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg></button>
                <span className="text-xs text-gray-300">100%</span>
                 <button className="p-1 rounded hover:bg-white/10 text-gray-300" title="Zoom In"><svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" /></svg></button>
                 <div className="w-px h-4 bg-white/10 mx-2"></div>
                 <span className="text-xs text-gray-400">Page 1 of 1 (Simulated)</span>
             </div>
             {/* Document Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-600/20">
                 {/* Simulate a page */}
                <div className="bg-white/90 p-8 rounded shadow-lg max-w-2xl mx-auto">
                    <h1 className="text-lg font-bold text-black mb-4">{documentTitle}</h1>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {loremIpsum}
                    </p>
                     <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed mt-4">
                        {loremIpsum}
                    </p>
                </div>
            </div>
         </div>
     </WindowFrame>
  );
}