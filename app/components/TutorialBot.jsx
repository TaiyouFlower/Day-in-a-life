"use client";
import { useState, useEffect } from 'react';

export default function TutorialBot() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div className="absolute bottom-20 right-4 flex items-end gap-2 animate-bounce-in">
        {/* Speech Bubble */}
        <div className="relative bg-white rounded-lg p-4 shadow-xl max-w-xs animate-fade-out">
          <p className="text-sm text-gray-700">
            DevsData developers usually check their messages on Telegram before starting work
          </p>
        </div>
        
        {/* Bot Image */}
        <img 
          src="/images/bot.png" 
          alt="Tutorial Bot"
          className="w-16 h-16 object-contain animate-fade-out"
        />
      </div>
    )
  );
}