if (classCertisignerExtended) {
  //GET CERTIFICATE
	document.addEventListener('certisigner-getCertificate', function(event) {
		chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, provider: event.detail.provider, serialNumber: event.detail.serialNumber, repository: event.detail.repository, validatePassword: event.detail.validatePassword, messageValidate: event.detail.messageValidate, action: "getCertificate"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
  //IMPORTAR CERTIFICADO
	document.addEventListener('certisigner-importCertificate', function(event) {
		chrome.runtime.sendMessage({requireCompleteChain: event.detail.requireCompleteChain, action: "importCertificate"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
  //EXPORTAR CERTIFICADO
	document.addEventListener('certisigner-repoExportCertificate', function(event) {
		chrome.runtime.sendMessage({serialNumber: event.detail.serialNumber, timeout: timeout, criteria: event.detail.criteria, action: "repoExportCertificate"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
  //REMOVER CERTIFICADO
	document.addEventListener('certisigner-repoRemoveCertificate', function(event) {
		chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, fingerprint: event.detail.fingerprint, action: "repoRemoveCertificate"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
  //ALTERAR SENHA REPOSITÓRIO
  document.addEventListener('certisigner-repoChangePassword', function(event) {
    chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, criteria: event.detail.criteria, action: "repoChangePassword"}, function(response) {
      returnMessage = createReturnMessage(response);
      sendEvent(event.type + '-return', returnMessage);
    });
  });
	//LISTA PKCS11
	document.addEventListener('certisigner-listPKCS11', function(event) {
		chrome.runtime.sendMessage({pkcs11List: event.detail.pkcs11List, action: "listPKCS11"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
	function repoGenarateCsr(event) {
		chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, repository: event.detail.repository, keyLength: event.detail.keyLength, hash: event.detail.hash, provider: event.detail.provider, alias: event.detail.alias, action: "repoGenarateCsr"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	}
	//LISTA REPO GERAR CSR
	document.addEventListener('certisigner-repoGenarateCsr', function(event) {
		repoGenarateCsr(event);
	});
	function repoInstallCertificate(event) {
		chrome.runtime.sendMessage({requireCompleteChain: event.detail.requireCompleteChain, alias: event.detail.alias, provider: event.detail.provider, repository: event.detail.repository, hash: event.detail.hash, certificatePem: event.detail.certificatePem, action: "repoInstallCertificate"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	}
	//LISTA REPO INSTALA CERTIFICADO
	document.addEventListener('certisigner-repoInstallCertificate', function(event) {
		repoInstallCertificate(event);
	});
	//LISTA REPO GERAR CSR BUFFER
	document.addEventListener('certisigner-repoGenarateCsr-buffer', function(event) {
		if (event.detail.repository){
		  chrome.storage.local.set({'repository': event.detail.repository});
			chrome.storage.local.set({'provider': event.detail.provider});
			chrome.storage.local.set({'alias': event.detail.alias});
			chrome.storage.local.set({'hash': event.detail.hash});
	  }
	  repoGenarateCsr(event);
	});
	//LISTA REPO INSTALA CERTIFICADO BUFFER
	document.addEventListener('certisigner-repoInstallCertificate-buffer', function(event) {
		chrome.storage.local.get('provider', function(result) {
			event.detail.provider = result.provider;
			chrome.storage.local.get('alias', function(result) {
				event.detail.alias = result.alias;
				chrome.storage.local.get('hash', function(result) {
					event.detail.hash = result.hash;
					chrome.storage.local.get('repository', function(result) {
						event.detail.repository = result.repository;
						repoInstallCertificate(event);
					});
				});
			});
		});
	});
	//SELECIONA ARQUIVOS PARA ASSINAR
	document.addEventListener('certisigner-getFilePath', function(event) {
		chrome.runtime.sendMessage({id: generateGUID(), timeout: timeout, multiple: event.detail.multiple, action: "getFilePath"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
	//ASSINA ARQUIVOS
	document.addEventListener('certisigner-digestFiles', function(event) {
		chrome.runtime.sendMessage({files: event.detail.files, hash: event.detail.hash, action: "digestFiles"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
	//ASSINA ARQUIVOS LOCAL
	document.addEventListener('certisigner-signFiles', function(event) {
		chrome.runtime.sendMessage({content: event.detail.content, action: "signFiles"}, function(response) {
			returnMessage = createReturnMessage(response);
			sendEvent(event.type + '-return', returnMessage);
		});
	});
}
