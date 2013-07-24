/*chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    chrome.tabs.query({}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, {action: "get"}, function(response) {
	    sendResponse(response + " modified by background");
	});
    });
    return true;
});*/