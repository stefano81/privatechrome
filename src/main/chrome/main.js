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

function resetDOM(doc) {
    var i = 0;
    while (0 != doc.childNodes.length) {
	console.log((i++) + " removing " + doc.childNodes[0].outerHTML);
	doc.removeChild(doc.childNodes[0]);
    }
}

function restoreDecryptedDOM(doc, dec) {
    for (i = 0; i < dec.attributes.length; ++i) {
	var attr = dec.attributes[i];
	doc.setAttribute(attr.name, attr.value);
    }
    for (i = 0; i < dec.childNodes.length; ++i) {
	    doc.appendChild(dec.childNodes[i]);
    }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.encrypt) {
	var ct = encrypt(message.schema, document.documentElement.outerHTML, message.password);
	var response = "<!doctype html><html><head><meta name=\"prichrome\" content=\"" + message.schema + "\" />" +   "</head><body>" + ct + "</body></html>";
    } else {
	var oHtml = document.documentElement;
	var metas = document.getElementsByTagName("meta");
	for (var i = 0; i < metas.length; ++i) {
	    if ("prichrome" == metas[i].getAttribute("name")) {
		var schema = metas[i].getAttribute("content");
	    }
	};

	var plain = decrypt(schema, oHtml.textContent.trim(), message.password);

	/*var element = document.createElement('html');
	element.innerHTML = plain;

	resetDOM(document.documentElement);

	restoreDecryptedDOM(document.documentElement, element);*/
	
	oHtml.innerHTML = plain;

	var script = document.createElement('script');
	/*script.textContent = [ "function(){",
			       "alert('something');",
			       "var myevent = new Event('DOMContentLoaded', {bubble : true, cancelable: true});",
			       "document.documentElement.dispatchEvent(myevent);",
			       "}();"
	].join('\n');*/
	script.textContent = [
	    //"document.documentElement.dispatchEvent(new Event('DOMContentLoaded', {bubbles : true, cancelable : true}));",
	    "document.addEventListener('load', function() {",
	    "alert('loaded')",
	    "});",
	    "var evt = new Event('load', {bubbles : true, cancelable : true});",
	    //"var evt = new Event('DOMContentLoaded', {bubbles : true, cabcelable : true});",
	    "document.body.dispatchEvent(evt);"
	].join('\n');
	var doc = (document.head || document.documentElement);
	doc.insertBefore(script, doc.childNodes[0]);
	script.parentNode.removeChild(script);

	var response = "Decrypted!";//element.outerHTML;
    }

    sendResponse(response);
});

