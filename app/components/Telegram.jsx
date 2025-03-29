"use client";
import { useAppContext } from '../context/AppContext';
import { useState, useMemo, useEffect } from 'react';

export default function Telegram() {
  // --- Get State/Functions from Context ---
  const {
    closeTelegram,
    simulationData,
    currentStepId,
    messageStatuses, // Get message statuses
    updateMessageStatus, // Get function to update status
    goToNextStep
  } = useAppContext();

  // --- Local State for UI ---
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // --- Process messages to display in sidebar ---
  const visibleMessages = useMemo(() => {
    // Guard clause: Ensure data needed exists
    if (!simulationData?.emails || !simulationData?.steps || !currentStepId) {
      return [];
    }
    const currentStepIndex = simulationData.steps.findIndex(step => step.id === currentStepId);
    if (currentStepIndex === -1) return [];

    // Filter messages based on when they should appear
    return simulationData.emails.filter(email => {
         const showStepIndex = simulationData.steps.findIndex(step => step.id === email.stepIdToShow);
         return showStepIndex !== -1 && showStepIndex <= currentStepIndex;
    });
  }, [simulationData, currentStepId]);

  // --- Get the currently selected message object ---
  const activeChat = useMemo(() => {
    // Find the full message object from the original data, not just visible ones
    return simulationData?.emails?.find(m => m.id === selectedMessageId);
  }, [simulationData, selectedMessageId]);

  // --- Handler for selecting a message ---
  const handleSelectMessage = (messageId) => {
    console.log(`Telegram: Selecting message ${messageId}`);
    setSelectedMessageId(messageId);
    // Mark as read if currently unread (check if messageStatuses exists)
    if (messageStatuses && messageStatuses[messageId] === 'unread') {
        console.log(`Telegram: Marking message ${messageId} as read`);
        updateMessageStatus(messageId, 'read');
    }

    // Optional: Advance simulation based on selection
    const currentStep = simulationData?.steps.find(step => step.id === currentStepId);
    if (currentStep?.type === 'waitForMessageSelect' && currentStep?.messageId === messageId) {
        console.log(`Telegram: Message ${messageId} selected, advancing simulation from step ${currentStepId}`);
        setTimeout(goToNextStep, 0); // Use timeout for state updates
    }
  };

  // --- Simulate sending a message ---
  const handleSendMessage = () => {
     if (!newMessage.trim()) return;
     console.log("Telegram: Simulating sending message:", newMessage);
     setNewMessage('');
     // TODO: Add visual feedback or mock adding to chat (more complex)
  };

  // --- RENDER LOGIC ---
  // Could rely on parent component's loading state, or add one here
  if (!simulationData) {
      return (
         <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-2xl flex items-center justify-center border border-gray-200 mb-16 mt-6 z-20">
            <p className="text-gray-500 animate-pulse">Loading Messages...</p>
         </div>
      )
  }

  return (
    <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-2xl flex overflow-hidden border border-gray-200 mb-16 mt-6 z-20">

      {/* --- Left Sidebar --- */}
      <div className="w-80 border-r bg-[#f8f9fa] flex flex-col flex-shrink-0">
        {/* Header */}
        <div className="p-3 bg-[#f0f2f5] flex items-center justify-between border-b h-16">
          <div className="flex items-center space-x-3">
             <button className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400"></button>
            <input type="text" placeholder="Search" className="bg-white rounded-full px-3 py-1 text-sm border focus:outline-none focus:border-blue-400 w-full" />
          </div>
          <button onClick={closeTelegram} title="Close Telegram" className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 ml-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Message List Area */}
        <div className="flex-1 overflow-y-auto">
          {visibleMessages.length === 0 && (
              <p className="text-center text-sm text-gray-500 p-4">No messages yet.</p>
          )}
          {/* Map over messages determined to be visible */}
          {visibleMessages.map(msg => {
                // *** KEY FIX: Check if messageStatuses exists before accessing ***
                const isUnread = messageStatuses && messageStatuses[msg.id] === 'unread';
                return (
                    <div
                        key={msg.id}
                        onClick={() => handleSelectMessage(msg.id)}
                        className={`flex items-center space-x-3 p-3 hover:bg-[#e5ebf1] cursor-pointer transition-colors border-l-2 ${
                            selectedMessageId === msg.id ? 'bg-[#d9e2ec] border-blue-500' : 'border-transparent'
                        }`}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-light">
                                {msg.avatar || msg.sender?.substring(0, 2) || '?'} {/* Added fallback */}
                            </div>
                        </div>
                        {/* Message Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-sm text-gray-900 truncate">{msg.sender || 'Unknown Sender'}</span>
                                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{msg.time || ''}</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                {/* Apply style based on isUnread status */}
                                <p className={`text-sm truncate ${isUnread ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                                    {msg.subject || msg.body?.substring(0, 50) + '...' || 'No Content'} {/* Added fallback */}
                                </p>
                                {/* Unread indicator */}
                                {isUnread && (
                                    <span className="bg-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ml-2 flex-shrink-0">!</span>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>

      {/* --- Chat Area --- */}
      <div className="flex-1 flex flex-col bg-[#e5ebf0]">
        {/* Chat Header */}
        <div className="p-3 bg-white border-b flex items-center justify-between space-x-4 h-16">
          {activeChat ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                    {activeChat.avatar || activeChat.sender?.substring(0, 2) || '?'}
                  </div>
                </div>
                <div>
                  <h2 className="font-medium text-gray-800">{activeChat.sender || 'Unknown Sender'}</h2>
                  <div className="text-xs text-gray-500">last seen recently</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                   <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"><svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg></button>
                   <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"><svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg></button>
               </div>
            </>
          ) : (
             <div className="flex items-center justify-center w-full h-full">
                <p className="text-gray-500">Select a chat to start messaging</p>
             </div>
          )}
        </div>

        {/* Message Display Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {activeChat ? (
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-lg rounded-bl-none p-3 bg-white text-gray-800 shadow-sm">
                <p className="text-sm whitespace-pre-wrap">{activeChat.body || 'No message content.'}</p>
                <div className="flex items-center justify-end space-x-1 mt-1 text-gray-400">
                  <span className="text-xs">{activeChat.time || ''}</span>
                </div>
              </div>
            </div>
          ) : (
             <div className="flex items-center justify-center h-full">
                 {/* Optionally show a placeholder graphic */}
             </div>
          )}
        </div>

        {/* Message Input Area */}
        <div className="p-2 bg-white border-t flex items-center space-x-2">
          <button className="text-gray-500 hover:text-blue-500 p-2 rounded-full"> {/* Attach */}
             <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" /></svg>
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            placeholder="Write a message..."
            className="flex-1 border-none rounded-full px-4 py-2 text-sm focus:outline-none bg-[#f0f2f5] focus:bg-white text-gray-800"
          />
          <button onClick={handleSendMessage} className="text-blue-500 hover:text-blue-600 p-2 rounded-full disabled:text-gray-400" disabled={!newMessage.trim()}> {/* Send */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}