chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    sendResponse(encdocument.getElementsByTagName("body")[0].outerHTML);
});

var metas = document.getElementsByTagName("meta");
for (var i = 0; i < metas.length; ++i) {
    if ("prichrome" == metas[i].getAttribute("name")) {
	var content = metas[i].getAttribute("content");
	var body = document.getElementById("");
    }
};
