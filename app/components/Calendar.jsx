// /home/any1/Documents/GDG_HACKATHON/Day-in-a-life-master/app/components/Calendar.jsx
"use client";
import { useAppContext } from '../context/AppContext';
import { WindowFrame } from './WindowFrame';

export default function Calendar() {
  const { closeCalendar } = useAppContext();

  // Mock data
  const events = [
    { time: "10:00 AM", title: "Sync with Alex (Lead)" },
    { time: "02:00 PM", title: "Frontend Team Meeting" },
    { time: "04:30 PM", title: "Project Phoenix Demo Prep" },
  ];
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
     <WindowFrame title="Calendar Simulation" onClose={closeCalendar} iconPath="/images/calendar.svg">
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-3 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">{day}</h2>
                {/* Add view controls (Day/Week/Month) later */}
                <div className="flex space-x-1">
                    <button className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20">Day</button>
                    <button className="px-2 py-1 text-xs rounded text-gray-400 hover:bg-white/10">Week</button>
                </div>
            </div>
            {/* Calendar Grid Area (Simplified Day View) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                 <h3 className="text-sm font-medium text-gray-300">Today's Events:</h3>
                {events.map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-blue-800/40 rounded border border-blue-600/50">
                       <span className="font-mono text-xs text-blue-200 w-16 text-right flex-shrink-0">{event.time}</span>
                       <span className="text-sm text-white">{event.title}</span>
                    </div>
                ))}
                 {events.length === 0 && <p className="text-sm text-gray-400 italic">No events scheduled for today.</p>}
            </div>
        </div>
     </WindowFrame>
  );
}