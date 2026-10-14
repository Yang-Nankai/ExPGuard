	extDiv = document.createElement('div');
	extDiv.setAttribute("id", chrome.runtime.id);
	document.body.appendChild(extDiv);

	//CHAMADA GENERICA
	document.addEventListener('certisigner', function(event) {
		chrome.runtime.sendMessage(event.detail, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});

	//LISTAR CERTIFICADOS
	table = document.querySelector("table#certisigner-certificate-list");
	select = document.querySelector("select#certisigner-certificate-list");

	if (table || select) {
		inputMessage = {id: generateGUID(), timeout: timeout, action: "listCertificates"};

		chrome.runtime.sendMessage(inputMessage, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent('certisigner-list-certificates-return', returnMessage);
		});
	 }

	 document.addEventListener('certisigner-list-certificates', function(event) {

		inputRepository = "";
		inputProvider = "";

		if (event.detail) {
			if (event.detail.repository) {
				inputRepository = event.detail.repository;
			}
			if (event.detail.provider) {
				inputProvider = event.detail.provider;
			}
		}
		inputMessage = {id: generateGUID(), timeout: timeout, repository: inputRepository, provider: inputProvider, action: "listCertificates"};

		chrome.runtime.sendMessage(inputMessage, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});

	//DNA
	document.addEventListener('certisigner-dna', function(event) {
			chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, action: "dna", driverLetter: "C:\\", serialNumber: event.detail.serialNumber}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});

	//CHECK HOST
	document.addEventListener('certisigner-check-host', function(event) {
		 chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, action: "check"}, function(response) {
			 if (response.error) {
				console.log(event.type + ': ' + response.error);
				sendEvent(event.type + '-return', 'false');
			 }
			 else {
				sendEvent(event.type + '-return', JSON.stringify(response.result));
			 }
		});
	 });

	 //GET VERSION
	document.addEventListener('certisigner-get-version', function(event) {
		chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, action: "getVersion"}, function(response) {
			if (response.error) {
				console.log(event.type + ': ' + response.error);
				sendEvent(event.type + '-return', 'false');
			}
			else {
				sendEvent(event.type + '-return', JSON.stringify({'versionLocalMachine' : response.result,'versionExpected' : versionExpected}));
			}
		});
	 });

	 //SIGN DETACHED
 	document.addEventListener('certisigner-sign-detached', function(event) {
 		chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, serialNumber: event.detail.serialNumber, content: event.detail.content, encoding: event.detail.encoding, action: "signDetached"}, function(response) {
 			returnMessage = createReturnMessage(response);
 			sendEvent(event.type + '-return', returnMessage);
 		});
 	});

	//SIGN
	document.addEventListener('certisigner-sign', function(event) {
			chrome.runtime.sendMessage({id: generateGUID(), signType: event.detail.signType, timeout: timeout, criteria: event.detail.criteria, content: event.detail.content, encoding: event.detail.encoding, type: event.detail.type, provider: event.detail.provider, repository: event.detail.repository, applayDigest: event.detail.applayDigest, hash: event.detail.hash, validatePassword: event.detail.validatePassword, messageValidate: event.detail.messageValidate, action: "sign"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});

	//GET CSP LIST
	document.addEventListener('certisigner-list-csp', function(event) {

		cspList = event.detail ? event.detail.providers : undefined;

		inputMessage = {};

		if (cspList) {
			inputMessage = {id: generateGUID(), timeout: timeout, action: "listCsp", csps: cspList};
		}
		else {
			inputMessage = {id: generateGUID(), timeout: timeout, action: "listCsp"};
		}

		chrome.runtime.sendMessage(inputMessage, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});

	//CREATE CSR
	document.addEventListener('certisigner-create-csr', function(event) {
		chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, alias: event.detail.alias, issuingType: event.detail.issuingType, keyLength: event.detail.keyLength, provider: event.detail.provider, hash: event.detail.hash, action: "createCsr"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});

	//INSTALL CERTIFICATE
	document.addEventListener('certisigner-install-certificate', function(event) {
		chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, alias: event.detail.alias, provider: event.detail.provider, issuingType: event.detail.issuingType, certificatePem: event.detail.certificatePem, updateCert: event.detail.updateCert, action: "installCertificate"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
