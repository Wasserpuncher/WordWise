// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('Advanced Text Analyzer installed.');
    
    // Set default settings if none exist
    chrome.storage.local.get(['keywords'], (result) => {
        if (!result.keywords) {
            chrome.storage.local.set({ keywords: [] });
        }
    });
});

// Optional: Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getKeywords') {
        chrome.storage.local.get(['keywords'], (result) => {
            sendResponse({ keywords: result.keywords });
        });
        return true; // Will respond asynchronously
    }
});
