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

function decrypt(schema, ciphertext, password) {
    switch (schema) {
	case "aes":
	var dec = CryptoJS.AES.decrypt(ciphertext, password);
	break;
	case "tripledes":
	var dec = CryptoJS.TripleDES.decrypt(ciphertext, password);
	default:
	var dec = plaintext;
	break;
    }

    return dec.toString(CryptoJS.enc.Utf8);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.encrypt) {
	var ct = encrypt(message.schema, document.getElementsByTagName("html")[0].outerHTML, message.password);
	var response = "<!doctype html><html><head><meta name=\"prichrome\" content=\"" + message.schema + "\" />" +   "</head><body>" + ct + "</body></html>";
    } else {
	var oHtml = document.getElementsByTagName("html")[0];
	var metas = document.getElementsByTagName("meta");
	for (var i = 0; i < metas.length; ++i) {
	    if ("prichrome" == metas[i].getAttribute("name")) {
		var schema = metas[i].getAttribute("content");
	    }
	};

	var plain = decrypt(schema, oHtml.textContent.trim(), message.password);

	oHtml.innerHTML = plain;
	
	var response = "Done!";
    }

    sendResponse(response);
});

