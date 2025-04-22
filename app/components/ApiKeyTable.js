import { maskApiKey, copyToClipboard } from '../utils/apiKeyUtils';
import toast from 'react-hot-toast';

export const ApiKeyTable = ({ 
  apiKeys, 
  visibleKeys, 
  onToggleVisibility, 
  onEdit, 
  onDelete 
}) => {
  const handleCopy = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('API key copied to clipboard!', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast.error('Failed to copy API key', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">NAME</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">TYPE</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">USAGE</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">KEY</th>
            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-600">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((key) => (
            <tr key={key.id} className="border-b border-gray-100 hover:bg-gray-50/50">
              <td className="py-4 px-4 text-gray-800">{key.name}</td>
              <td className="py-4 px-4">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-800">{key.type}</span>
              </td>
              <td className="py-4 px-4 text-gray-800">{key.usage}</td>
              <td className="py-4 px-4 font-mono text-sm text-gray-800">
                <span>{visibleKeys.has(key.id) ? key.value : maskApiKey(key.value)}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onToggleVisibility(key.id)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                    title={visibleKeys.has(key.id) ? "Hide API Key" : "Show API Key"}
                  >
                    {visibleKeys.has(key.id) ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleCopy(key.value)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                    title="Copy to clipboard"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onEdit(key)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(key.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {apiKeys.length === 0 && (
        <p className="text-center py-8 text-gray-500">No API keys found. Create one to get started.</p>
      )}
    </div>
  );
}; 