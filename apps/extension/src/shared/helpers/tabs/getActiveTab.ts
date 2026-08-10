declare const browser: typeof chrome;

/**
 * Возвращает активную вкладку текущего окна браузера
 */
export async function getActiveTabTitle(): Promise<chrome.tabs.Tab | undefined> {
  const api = typeof browser !== 'undefined' ? browser : chrome;
  const [tab] = await api.tabs.query({ active: true, currentWindow: true });

  return tab;
}