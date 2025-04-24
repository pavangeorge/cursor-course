import { useState, useEffect } from 'react';
import { apiKeyService } from '../services/apiKeyService';
import toast from 'react-hot-toast';

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState(new Set());

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast.error('Failed to fetch API keys', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const createApiKey = async (name) => {
    if (!name.trim()) {
      toast.error('Please enter a key name', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const keyData = {
        name,
        value: generateApiKey(),
        usage: 0
      };
      await apiKeyService.createApiKey(keyData);
      setEditName('');
      cancelEditing();
      fetchApiKeys();
      toast.success('API key created successfully!', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error creating API key:', error);
      toast.error('Failed to create API key', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateApiKey = async () => {
    if (!editName.trim() || !editingKey) {
      toast.error('Please enter a key name', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
    
    try {
      await apiKeyService.updateApiKey(editingKey.id, { name: editName });
      fetchApiKeys();
      cancelEditing();
      toast.success('API key updated successfully!', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error updating API key:', error);
      toast.error('Failed to update API key', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const deleteApiKey = async (id) => {
    try {
      await apiKeyService.deleteApiKey(id);
      fetchApiKeys();
      toast.success('API key deleted successfully!', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#ef4444',
          color: '#fff',
        },
        icon: '×',
        iconTheme: {
          primary: '#fff',
          secondary: '#ef4444',
        },
      });
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error('Failed to delete API key', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const startEditing = (key) => {
    setEditingKey(key);
    setEditName(key?.name || '');
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditName('');
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `szilly-${key}`;
  };

  return {
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
  };
}; 