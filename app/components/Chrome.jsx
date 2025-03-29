"use client";
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

export default function Chrome() {
  const { closeChrome } = useAppContext();
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = {
    'Ideas': [
      {
        id: 1,
        title: "Implement dark theme switcher",
        description: "Create theme context with light/dark modes",
        labels: [{color: '#61bd4f', text: 'UI/UX'}, {color: '#f2d600', text: 'Feature'}],
        deadline: "2023-12-05",
        comments: 2,
        assignees: ['JD']
      },
      {
        id: 2,
        title: "Add internationalization support",
        description: "Implement i18n for multiple language support",
        labels: [{color: '#c377e0', text: 'Enhancement'}],
        deadline: "2023-12-10",
        comments: 1,
        assignees: ['TM']
      }
    ],
    'Dev - To Do': [
      {
        id: 3,
        title: "Fix mobile menu animation jank",
        description: "Optimize CSS transitions for mobile menu",
        labels: [{color: '#eb5a46', text: 'Bug'}, {color: '#0079bf', text: 'Mobile'}],
        deadline: "2023-12-03",
        comments: 3,
        assignees: ['JD', 'TM']
      },
      {
        id: 4,
        title: "Implement image lazy loading",
        description: "Add Intersection Observer for images",
        labels: [{color: '#00c2e0', text: 'Performance'}],
        deadline: "2023-12-04",
        comments: 2,
        assignees: ['JD']
      },
      {
        id: 5,
        title: "Create reusable button component",
        description: "Develop customizable button with variants",
        labels: [{color: '#f2d600', text: 'Component'}],
        deadline: "2023-12-05",
        comments: 1,
        assignees: ['TM']
      }
    ],
    'Code Review': [
      {
        id: 6,
        title: "PR #142: Auth module refactor",
        description: "Review JWT implementation changes",
        labels: [{color: '#ff9f1a', text: 'Security'}],
        deadline: "2023-12-02",
        comments: 4,
        assignees: ['CR']
      },
      {
        id: 7,
        title: "PR #145: Dashboard layout fixes",
        description: "Verify responsive breakpoints",
        labels: [{color: '#0079bf', text: 'Responsive'}],
        deadline: "2023-12-03",
        comments: 2,
        assignees: ['JD']
      }
    ],
    'Testing': [
      {
        id: 8,
        title: "Cross-browser form validation",
        description: "Test in Safari, Firefox, Chrome",
        labels: [{color: '#eb5a46', text: 'Testing'}],
        deadline: "2023-12-06",
        comments: 1,
        assignees: ['QA']
      },
      {
        id: 9,
        title: "Mobile touch event testing",
        description: "Verify swipe gestures on iOS/Android",
        labels: [{color: '#0079bf', text: 'Mobile'}],
        deadline: "2023-12-07",
        comments: 3,
        assignees: ['QA']
      }
    ],
    'Done': [
      {
        id: 10,
        title: "Setup CI/CD pipeline",
        description: "GitHub Actions workflow implemented",
        labels: [{color: '#00c2e0', text: 'DevOps'}],
        deadline: "2023-11-30",
        comments: 5,
        assignees: ['JD']
      },
      {
        id: 11,
        title: "Implement error boundaries",
        description: "React error boundary components added",
        labels: [{color: '#61bd4f', text: 'React'}],
        deadline: "2023-12-01",
        comments: 2,
        assignees: ['TM']
      }
    ]
  };

  return (
    <div className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
      {/* Windows 11 Chrome Title Bar */}
      <div className="h-11 flex items-center px-4 border-b bg-gray-50 justify-between">
        <div className="flex items-center space-x-4">
          {/* Window Controls */}
          <div className="flex space-x-2">
            <button 
              onClick={closeChrome}
              className="w-[12px] h-full hover:bg-red-500 flex items-center justify-center group"
            >
              <svg className="w-3 h-3 text-gray-500 group-hover:text-white" viewBox="0 0 12 12">
                <path fill="currentColor" d="M10.207 2.207L1 11.414 0.586 11 9.793 1.793 10.207 2.207z"/>
                <path fill="currentColor" d="M10.207 10.207L1 1 1.414 0.586 11 10.172 10.207 10.207z"/>
              </svg>
            </button>
            <button className="w-[46px] h-full hover:bg-gray-200 flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 16 16">
                <path fill="currentColor" d="M3 8.5h10a.5.5 0 0 0 0-1H3a.5.5 0 0 0 0 1z"/>
              </svg>
            </button>
            <button className="w-[46px] h-full hover:bg-gray-200 flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 16 16">
                <path fill="currentColor" d="M4 2h8v1H4zm0 3h8v1H4zm0 3h8v1H4z"/>
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center">
            <div className="w-48 h-9 bg-white border-r border-gray-200 flex items-center px-3 rounded-tl-lg">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l-7-7 7-7m4 14l7-7-7-7"/>
              </svg>
              <span className="text-sm text-gray-700">Trello</span>
            </div>
          </div>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="h-9 bg-gray-100 rounded-lg flex items-center px-3 space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              defaultValue="trello.com/b/frontend-projects" 
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
            />
            <div className="w-px h-4 bg-gray-300 mx-2"></div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Window Controls */}
        <div className="flex items-center">
          <button className="w-10 h-10 hover:bg-gray-200 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Trello Board */}
      <div className="flex-1 bg-[#0079bf] p-4 overflow-auto">
        <div className="flex gap-12 items-start justify-center mt-8">
          {Object.entries(columns).map(([columnName, tasks]) => (
            <div key={columnName} className="w-72 bg-[#ebecf0] rounded-lg p-2 shadow-sm">
              <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="font-medium text-sm text-gray-700">{columnName}</h3>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500">{tasks.length}</span>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {tasks.map(task => (
                <div 
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="bg-white p-3 rounded mb-2 shadow-sm hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="flex flex-wrap gap-1 mb-2">
                    {task.labels.map((label, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: label.color }}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-800">{task.title}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span className="text-xs">{task.deadline}</span>
                    </div>
                    <div className="flex -space-x-1">
                      {task.assignees.map((a, i) => (
                        <div 
                          key={i} 
                          className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center"
                        >
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                + Add card
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[760px] max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedTask.title}
                </h2>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-sm text-gray-600">{selectedTask.description}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Activity</h3>
                  {[...Array(selectedTask.comments)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        {selectedTask.assignees[0]}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Comment {i+1}</span>
                            <span className="text-xs text-gray-500">2h ago</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {i === 0 ? "Started working on this task" : "Updated progress"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Due Date</h3>
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-sm text-blue-600">{selectedTask.deadline}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Labels</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedTask.labels.map((label, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: label.color }}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Assignees</h3>
                  <div className="flex -space-x-1">
                    {selectedTask.assignees.map((a, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm"
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}