"use client";
import { useAppContext } from '../context/AppContext';
import Chrome from '@/app/components/Chrome';  
import Telegram from '@/app/components/Telegram';  
import TutorialBot from '@/app/components/TutorialBot';

export default function Windows11Desktop() {
  const { openChrome, openTelegram, chromeVisible, telegramVisible } = useAppContext();

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/w11.jpg')" }}
    >
      <TutorialBot/>
      {chromeVisible && <Chrome />}
      {telegramVisible && <Telegram />}
      {/* Taskbar */}
      <div className="flex justify-center items-center gap-4 absolute bottom-0 left-0 right-0 h-12 bg-gray-800/80 backdrop-blur-md px-4 z-51">
        <div className="flex items-center space-x-4">
          {/* Windows Start Button */}
          <button className="hover:scale-115 cursor-pointer rounded-full p-2 transition-colors">
            <img 
              src="/images/windows.png" 
              alt="Windows" 
              className="w-13 h-13 object-contain"
            />
          </button>

          {/* Search Bar*/}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-1.5 space-x-2 hover:bg-white/30 transition-colors w-64">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path 
                d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent text-white placeholder-gray-200 outline-none w-full"
            />
          </div>
        </div>

        {/* Right-side Icons */}
        <div className="flex items-center space-x-4">
          {/* Chrome Icon */}
          <button 
            onClick={openChrome}
            className="hover:scale-115 cursor-pointer rounded-full p-2 transition-colors"
          >
            <img 
              src="/images/chrome.png" 
              alt="Chrome" 
              className="w-9 h-9 object-contain"
            />
          </button>

          {/* Telegram Icon */}
          <button 
            onClick={openTelegram}
            className="hover:scale-115 cursor-pointer rounded-full p-2 transition-colors"
          >
            <img 
              src="/images/telegram.png" 
              alt="Telegram" 
              className="w-13 h-13] object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  )
}