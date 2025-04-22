'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '../utils/cookies';
import { apiKeyService } from '../services/apiKeyService';

export default function ProtectedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateAndRedirect = async () => {
      try {
        const apiKey = getCookie('apiKey');
        
        if (!apiKey) {
          router.push('/playground');
          return;
        }

        const isValid = await apiKeyService.validateApiKey(apiKey);
        
        if (isValid) {
          setIsValid(true);
          setIsLoading(false);
        } else {
          router.push('/playground');
        }
      } catch (error) {
        console.error('Error validating API key:', error);
        router.push('/playground');
      }
    };

    validateAndRedirect();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isValid) {
    return null; // This will be replaced by the redirect
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">This is a protected page that can only be accessed with a valid API key.</p>
      </div>
    </div>
  );
} 