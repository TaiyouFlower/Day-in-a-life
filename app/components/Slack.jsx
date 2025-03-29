// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/components/Slack.jsx
"use client";
import { useAppContext } from '../context/AppContext';
import { WindowFrame } from './WindowFrame'; // Corrected Import

export default function Slack() {
  const { closeSlack } = useAppContext();

  // Mock data for display
  const channels = ["# general", "# frontend-dev", "# project-phoenix", "# random"];
  const directMessages = ["Alex (Lead)", "Sarah (Design)", "Tutorial Bot"];
  const currentChannel = "# frontend-dev";
  const messages = [
    { sender: "Alex (Lead)", time: "10:05 AM", text: "Hey @You, can you take a look at task #task001 when you get a chance? The mobile animation needs tweaking." },
    { sender: "You", time: "10:06 AM", text: "Sure thing, will check it out after reviewing the spec." },
    { sender: "Sarah (Design)", time: "10:15 AM", text: "FYI, updated mockups for the dashboard are in Figma." }
  ];

  return (
     <WindowFrame title="Slack Simulation" onClose={closeSlack} iconPath="/images/slack.png">
        <div className="flex h-full text-sm">
            {/* Sidebar */}
            <div className="w-48 bg-slate-800/50 flex-shrink-0 flex flex-col border-r border-white/10">
                <div className="p-3 border-b border-white/10">
                    <h2 className="text-white font-semibold text-sm">Innovatech Sim</h2>
                </div>
                <div className="flex-1 overflow-y-auto py-2 space-y-1">
                    <div className="px-3 text-xs text-gray-400 font-medium uppercase mb-1">Channels</div>
                    {channels.map(channel => (
                        <button key={channel} className={`w-full text-left px-3 py-0.5 rounded truncate ${channel === currentChannel ? 'bg-blue-600/50 text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                            {channel}
                        </button>
                    ))}
                     <div className="px-3 text-xs text-gray-400 font-medium uppercase mb-1 pt-3">Direct Messages</div>
                    {directMessages.map(dm => (
                         <button key={dm} className="w-full text-left px-3 py-0.5 rounded text-gray-300 hover:bg-white/10 truncate flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> {/* Online indicator */}
                            {dm}
                        </button>
                    ))}
                </div>
                 <div className="p-2 border-t border-white/10 text-xs text-gray-400"> User: You (Simulated)</div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Channel Header */}
                <div className="p-3 border-b border-white/10 flex-shrink-0">
                    <h3 className="text-white font-semibold">{currentChannel}</h3>
                    <p className="text-xs text-gray-400">Frontend team discussions and updates.</p>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="flex gap-3">
                            <div className="w-8 h-8 rounded bg-indigo-600 flex-shrink-0 text-center pt-1 font-bold text-xs">{msg.sender.substring(0,1)}</div>
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-medium text-white">{msg.sender}</span>
                                    <span className="text-xs text-gray-500">{msg.time}</span>
                                </div>
                                <p className="text-gray-300">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 {/* Message Input */}
                <div className="p-3 border-t border-white/10 mt-auto">
                    <input
                        type="text"
                        placeholder={`Message ${currentChannel}`}
                        className="w-full p-2 bg-slate-700/60 rounded border border-slate-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm text-gray-200 placeholder-gray-400"
                    />
                </div>
            </div>
        </div>
     </WindowFrame>
  );
}