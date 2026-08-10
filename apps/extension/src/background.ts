chrome.runtime.onInstalled.addListener((details) => {
  console.log('[lophius] installed', details.reason);
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'ping') {
    sendResponse({ ok: true, from: 'background' });
    return true;
  }
  return false;
});
