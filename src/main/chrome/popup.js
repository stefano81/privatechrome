// function encrypt(schema, password, plaintext) {
//     var encodedPT = CryptoJS.enc.Base64(plaintext);
//     switch (schema) {
// 	case "aes":
// 	var enc = CryptoJS.AES.encrypt(encodedPT, password);
// 	break;
//     }

//     return enc;
// }

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#encrypt').addEventListener('click', function(event) {
	var schema = document.getElementById("schema");
	var password = document.getElementById("pwd").value;

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, {msg: "ok"}, function(response) {
		document.getElementById("ciphertext").value = response;
	    });
	});
    });
});
