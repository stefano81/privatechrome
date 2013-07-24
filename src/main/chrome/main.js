function encrypt(schema, plaintext, password) {
    switch (schema) {
	case "aes":
	var enc = CryptoJS.AES.encrypt(plaintext, password);
	break;
	case "tripledes":
	var enc = CryptoJS.TripleDES.encrypt(plaintext, password);
	default:
	var enc = plaintext;
	break;
    }

    return enc.toString();
}
/*
function decrypt(schema, ciphertext, password) {
    var metas = document.getElementsByTagName("meta");
    for (var i = 0; i < metas.length; ++i) {
	if ("prichrome" == metas[i].getAttribute("name")) {
	    var content = metas[i].getAttribute("content");
	    var body = document.getElementById("");
	}
    };
}
*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log(message);
    if (message.encrypt) {
	var ct = encrypt(message.schema, document.getElementsByTagName("html")[0].outerHTML, message.password);
	var v = "<!doctype html><html><head><meta name=\"prichrome\" content=\"" + message.schema + "\" />" +   "</head><body>" + ct + "</body></html>";
	sendResponse(v);
    } else {
	console.log(document.getElementsByTagName("html")[0].textContent);
    }
});

