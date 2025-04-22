'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';
import { setSecureCookie } from '../utils/cookies';
import { apiKeyService } from '../services/apiKeyService';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const isValid = await apiKeyService.validateApiKey(apiKey);
      
      if (isValid) {
        setSecureCookie('apiKey', apiKey);
        setNotification({
          message: 'API key is valid, /protected can be accessed',
          type: 'success'
        });
        setTimeout(() => {
          router.push('/protected');
        }, 1500);
      } else {
        setNotification({
          message: 'Invalid API key',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      setNotification({
        message: 'Error validating API key',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Playground</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Enter your API key"
              required
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Validating...' : 'Submit API Key'}
          </button>
        </form>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
} 