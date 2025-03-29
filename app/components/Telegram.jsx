"use client";
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

export default function Telegram() {
  const { closeTelegram } = useAppContext();
  const [selectedMessage, setSelectedMessage] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    { 
      id: 1, 
      sender: "Design Team", 
      text: "New UI mockups ready for review", 
      time: "09:30",
      avatar: "DT",
      unread: 2,
      online: true,
      pinned: true
    },
    { 
      id: 2, 
      sender: "QA Team", 
      text: "Found 3 critical bugs in latest build", 
      time: "10:15",
      avatar: "QA",
      unread: 0,
      online: false
    }
  ];

  const chatMessages = {
    1: [
      {
        id: 1,
        text: "New UI mockups ready for review",
        time: "09:30",
        sender: "them",
        status: "read"
      },
    ],
    2: [
      {
        id: 1,
        text: "Found 3 critical bugs in latest build",
        time: "10:15",
        sender: "them",
        status: "read"
      },
    ]
  };

  const activeChat = messages.find(m => m.id === selectedMessage);

  return (
    <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-2xl flex overflow-hidden border border-gray-200 mb-16 mt-6">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-[#f8f9fa] flex flex-col">
        <div className="p-4 bg-[#f0f2f5] flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              JD
            </div>
            <div className="font-medium text-gray-800">John Doe</div>
          </div>
          <button 
            onClick={closeTelegram}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-2 bg-[#e5ebf1] text-sm font-medium text-gray-700">Pinned chats</div>
          {messages.map(msg => (
            <div
              key={msg.id}
              onClick={() => setSelectedMessage(msg.id)}
              className={`p-3 hover:bg-gray-100 cursor-pointer transition-colors ${selectedMessage === msg.id ? 'bg-gray-100' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    {msg.avatar}
                  </div>
                  {msg.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm text-gray-800">{msg.sender}</div>
                    {msg.pinned && (
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2z"/>
                      </svg>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 truncate">{msg.text}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-gray-400">{msg.time}</div>
                    {msg.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {msg.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#e5ebf0] to-[#f0f4f7]">
        <div className="p-4 bg-white border-b flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {activeChat?.avatar}
            </div>
            {activeChat?.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h2 className="font-medium text-gray-800">{activeChat?.sender}</h2>
            <div className="text-xs text-gray-500">
              {activeChat?.online ? 'online' : 'last seen recently'}
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-auto space-y-4">
          {chatMessages[selectedMessage].map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === 'me' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-black rounded-bl-none shadow-sm'
              }`}>
                <p>{msg.text}</p>
                <div className={`flex items-center justify-end space-x-1 mt-2 ${
                  msg.sender === 'me' ? 'text-blue-200' : 'text-gray-400'
                }`}>
                  <span className="text-xs">{msg.time}</span>
                  {msg.sender === 'me' && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-600 p-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
              </svg>
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 bg-gray-100 focus:bg-white text-black"
            />
            <button className="text-blue-500 hover:text-blue-600 p-2 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}