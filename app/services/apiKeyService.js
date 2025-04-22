import { supabase } from '../lib/supabase';

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache = new Map();
let validationPromise = null;

// Error messages
const ERROR_MESSAGES = {
  SERVER_ERROR: 'Server error while validating API key',
  INVALID_REQUEST: 'Invalid request',
  UNEXPECTED: 'Unexpected error during validation'
};

// Response handlers
const responseHandlers = {
  200: (data) => ({ isValid: true, cache: true }),
  401: (data) => ({ isValid: false, cache: true }),
  400: (data) => ({ error: new Error(data.error || ERROR_MESSAGES.INVALID_REQUEST), cache: false }),
  500: (data) => {
    console.error('Server error:', data.error);
    return { error: new Error(ERROR_MESSAGES.SERVER_ERROR), cache: false };
  },
  default: (data) => ({ error: new Error(data.error || ERROR_MESSAGES.UNEXPECTED), cache: false })
};

// API Key operations
const validateApiKey = async (key) => {
  // Check cache first
  const cachedResult = cache.get(key);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  // If there's already a validation in progress, wait for it
  if (validationPromise) {
    return validationPromise;
  }

  try {
    validationPromise = fetch('/api/validate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key })
    })
      .then(async (response) => {
        const data = await response.json();
        const handler = responseHandlers[response.status] || responseHandlers.default;
        const result = handler(data);

        if (result.error) throw result.error;
        if (result.cache) {
          cache.set(key, result.isValid);
          setTimeout(() => cache.delete(key), CACHE_TTL);
        }
        
        return result.isValid;
      });

    return await validationPromise;
  } catch (error) {
    console.error('Error validating API key:', error);
    throw error;
  } finally {
    validationPromise = null;
  }
};

// Database operations
const handleSupabaseOperation = async (operation) => {
  const { data, error } = await operation;
  if (error) throw error;
  return data;
};

const fetchApiKeys = () => 
  handleSupabaseOperation(
    supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false })
  );

const createApiKey = (keyData) =>
  handleSupabaseOperation(
    supabase
      .from('api_keys')
      .insert([keyData])
      .select()
      .single()
  );

const updateApiKey = (id, updates) =>
  handleSupabaseOperation(
    supabase
      .from('api_keys')
      .update(updates)
      .eq('id', id)
  );

const deleteApiKey = (id) =>
  handleSupabaseOperation(
    supabase
      .from('api_keys')
      .delete()
      .eq('id', id)
  );

const clearCache = () => cache.clear();

export const apiKeyService = {
  validateApiKey,
  fetchApiKeys,
  createApiKey,
  updateApiKey,
  deleteApiKey,
  clearCache
}; 