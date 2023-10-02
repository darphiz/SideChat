chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

  chrome.runtime.onInstalled.addListener(function() {
    const generateUUID = ()=> {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const uuid = generateUUID();

    // Store the UUID in Chrome storage
    chrome.storage.local.set({ guest_cid: uuid }, function() {
        console.log('guest UUID generated and stored:', uuid);
    });
});


// eslint-disable-next-line no-unused-vars
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
    if (request.action === "closeSettingsTab") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            for (let i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id);
            }
        });
    }

});
