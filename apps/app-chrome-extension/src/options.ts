document.addEventListener('DOMContentLoaded', () => {
  const backendUrlInput = document.getElementById(
    'backendUrl'
  ) as HTMLInputElement;
  const saveButton = document.getElementById('save') as HTMLButtonElement;
  const statusDiv = document.getElementById('status') as HTMLDivElement;

  if (!backendUrlInput || !saveButton || !statusDiv) {
    console.error('Required elements not found');
    return;
  }

  const showStatus = (message: string, isError: boolean = false) => {
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? 'red' : 'green';
  };

  const saveBackendUrl = async (url: string) => {
    try {
      await chrome.storage.local.set({ backendUrl: url });
      showStatus('Saved.');
    } catch (error) {
      console.error('Failed to save:', error);
      showStatus('Failed to save.', true);
    }
  };

  const loadBackendUrl = async () => {
    try {
      const result = await chrome.storage.local.get(['backendUrl']);
      if (result.backendUrl) {
        backendUrlInput.value = result.backendUrl;
      }
    } catch (error) {
      console.error('Failed to load backend URL:', error);
      showStatus('Failed to load saved URL.', true);
    }
  };

  // Save button click event
  saveButton.addEventListener('click', () => {
    const backendUrl = backendUrlInput.value.trim();
    if (!backendUrl) {
      showStatus('Enter your backend URL.', true);
      return;
    }
    saveBackendUrl(backendUrl);
  });

  // Load saved Backend URL on page load
  loadBackendUrl();
});
