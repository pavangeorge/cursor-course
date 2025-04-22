export const maskApiKey = (key) => {
  const prefix = 'szilly-';
  const visiblePart = key.slice(prefix.length, prefix.length + 2);
  const maskedPart = key.slice(prefix.length + 2);
  return `${prefix}${visiblePart}${'•'.repeat(maskedPart.length)}`;
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}; 