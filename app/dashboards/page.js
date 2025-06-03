'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ApiKeyTable } from '../components/ApiKeyTable';
import { ApiKeyModal } from '../components/ApiKeyModal';
import { useApiKeys } from '../hooks/useApiKeys';

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const {
    apiKeys,
    isLoading,
    editingKey,
    editName,
    visibleKeys,
    setEditName,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    startEditing,
    cancelEditing,
    toggleKeyVisibility
  } = useApiKeys();

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Current Plan Section */}
          <div className="bg-gradient-to-r from-rose-400 via-purple-400 to-blue-500 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8 text-white">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-6">
                <div>
                  <div className="text-sm font-medium mb-2">CURRENT PLAN</div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">Researcher</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">API Usage</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors w-full sm:w-auto">
                  Manage Plan
                </button>
              </div>
              <div className="relative pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Plan</span>
                  <span>0 / 1,000 Credits</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-sm">Pay as you go</span>
                </div>
              </div>
            </div>
          </div>

          {/* API Keys Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">API Keys</h1>
            <button
              onClick={() => startEditing({})}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
            >
              <span>+</span> New API Key
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                The key is used to authenticate your requests to the API. To learn more, see the documentation page.
              </p>
              
              <ApiKeyTable
                apiKeys={apiKeys}
                visibleKeys={visibleKeys}
                onToggleVisibility={toggleKeyVisibility}
                onEdit={startEditing}
                onDelete={deleteApiKey}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modal for Create/Edit */}
      {editingKey && (
        <ApiKeyModal
          editingKey={editingKey}
          editName={editName}
          setEditName={setEditName}
          onCancel={cancelEditing}
          onCreate={() => createApiKey(editName)}
          onUpdate={updateApiKey}
          isLoading={isLoading}
        />
      )}
    </div>
  );
} 