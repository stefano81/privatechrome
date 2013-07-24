document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#encrypt').addEventListener('click', function(event) {
	var oSchema = document.getElementById("schema");
	var passwd = document.getElementById("pwd").value;
	if ("" == passwd) {
	    passwd = "012345";
	}

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, {
		encrypt: true,
		schema : oSchema.options[oSchema.selectedIndex].value,
		password : passwd
	    }, function(response) {
		document.getElementById("ciphertext").value = response;
	    });
	});
    });

    document.querySelector('#decrypt').addEventListener('click', function(event) {
	var passwd = document.getElementById("pwd").value;

	if ("" == passwd) {
	    passwd = "012345";
	}

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, {
		encrypt: true,
		password : passwd
	    }, function(response) {
		document.getElementById("ciphertext").value = response;
	    });
	});
	
    });
});
