importScripts('forge.bundle.js');


var ClientEnrollment = function(parameters, sendResponse) {
	var clientEnrollment = {};

	var _str2ab = function(str) {
		var bufView = new Uint8Array(str.length);
		for (var i = 0; i < str.length; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return bufView;
	}

	clientEnrollment.redirectError = function(code, text) {
		console.log('Sending error response.', code, text);
		sendResponse({error: true, code: code, message: text});
	};

	clientEnrollment.installCertificate = function(token, pkcs7, callback) {
		console.log('Installing certificate.');

		function removeOldCertificates(certificate) {
			// try to find matching certs and remove them
			// failures here are non-fatal
			chrome.enterprise.platformKeys.getCertificates(token.id, function(certificates) {
				for (var i = 0; i < certificates.length; ++i) {
					otherCert = certificates[i];
					try {
						parsed = forge.pki.certificateFromAsn1(forge.asn1.fromDer(new forge.util.ByteBuffer(otherCert)));
						if (parsed.issuer.hash == certificate.issuer.hash && parsed.serialNumber != certificate.serialNumber) {
							console.log('Will remove old certificate with serial ' + parsed.serialNumber);
							chrome.enterprise.platformKeys.removeCertificate(token.id, otherCert);
						}
					} catch (e) {
						console.log(e);
					}
				}
			});
		};

		try {
			var p7 = forge.pkcs7.messageFromAsn1(forge.asn1.fromDer(pkcs7));
			if (p7.certificates.length < 1) {
				clientEnrollment.redirectError(1, 'Invalid certificate received from server');
				return;
			}
			var certificate = p7.certificates[0];

			var certData = _str2ab(forge.asn1.toDer(forge.pki.certificateToAsn1(certificate)).getBytes()).buffer;

			chrome.enterprise.platformKeys.importCertificate(token.id, certData);
			removeOldCertificates(certificate);
			callback();
		} catch (e) {
			console.log(e);
			clientEnrollment.redirectError(1, 'Invalid certificate received from server');
			return;
		}
	};

	clientEnrollment.estEnroll = function(config, callback) {
		console.log('Requesting certificate via EST.');
        parsed = JSON.parse(config);
		est = parsed.est;
        token = parsed.token;
        if (token === undefined) {
            token = "user";
        }
        console.log('Token type to use: ' + token);

		function getToken(callback) {
			chrome.enterprise.platformKeys.getTokens(function(tokens) {
				for (var i = 0; i < tokens.length; i++) {
					if (tokens[i].id == token) {
						callback(tokens[i]);
						return;
					}
				}
				clientEnrollment.redirectError(1, 'Unable to get ' + token + ' token, check your device is correctly provisioned.');
				return;
			});
		};

		function generateAndSign(token, callback) {
			var data = new Uint8Array([0, 5, 1, 2, 3, 4, 5, 6]);
			var algorithm = {
				name: "RSASSA-PKCS1-v1_5",
				// RsaHashedKeyGenParams
				modulusLength: est.key_size,
				publicExponent:
					new Uint8Array([0x01, 0x00, 0x01]),  // Equivalent to 65537
				hash: {
					name: "SHA-256",
				}
			};
			var cachedKeyPair;
			token.subtleCrypto.generateKey(algorithm, false, ["sign"])
				.then(function(keyPair) {
					cachedKeyPair = keyPair;
					return token.subtleCrypto.exportKey("spki", keyPair.publicKey);
				},
				console.log.bind(console))
				.then(function(publicKeySpki) {
					try {
						var publicKey = forge.pki.publicKeyFromAsn1(forge.asn1.fromDer(new forge.util.ByteBuffer(publicKeySpki)));
						var csr = forge.pki.createCertificationRequest();
						csr.publicKey = publicKey;
						csr.setSubject([{
							name: 'commonName',
							value: 'chromebook'
						}]);
						// create dummy private key to integrate forge with subtleCrypto
						var privateKey = {};
						privateKey.sign = function(md) {
							// need to sign all of CRI structure, which is now generated
							// then backfill the signature with the result as forge expects
							// sign to be sync and return a result immediately
							var data = _str2ab(forge.asn1.toDer(csr.certificationRequestInfo).getBytes());
							token.subtleCrypto.sign({name : "RSASSA-PKCS1-v1_5"}, cachedKeyPair.privateKey, data).then(function (signature) {
								csr.signature = new forge.util.ByteBuffer(signature).getBytes();
								callback(forge.pki.certificationRequestToPem(csr));
							});
						};
						csr.sign(privateKey, forge.md.sha256.create());
					} catch (e) {
						console.log(e);
						clientEnrollment.redirectError(1, 'Failed to sign CSR');
						return;
					}
				},
				console.log.bind(console));
		}

		function estEnroll(token, csr, callback) {
				fetch(est.url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/pkcs10',
				  },
				  body: csr.replace(/----.*----/g, ''),
				})
				.then(response => {
				  if (!response.ok) {
					return response.text().then(text => {
						clientEnrollment.redirectError(response.status, text);
					});
				  }
				  return response.text();
				})
				.then(data => {
					callback(token, forge.util.decode64(data));
				})
				.catch(error => {
				  console.error('Error encountered in enrolling client');
				});
		}

		getToken(function(token) {
			generateAndSign(token, function(csr) {
				estEnroll(token, csr, callback);
			});
		});
	}

	clientEnrollment.onboardEnroll = function(device_id, callback) {
		console.log('Requesting Onboard enrollment.');
		const url = parameters.host + '/onboard/mdps_qc_enroll.php';
		const version = navigator.userAgent.match(/Chrome\/([\d\.]+)/)
		const data = {
				otp: parameters.otp,
				device_udid: device_id,
				device_type: 'Chrome OS',
				product_name: 'Chromebook',
				product_version: version[1]
			};
		fetch(url, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		  })
		  .then(response => {
			if (!response.ok) {
			  return response.text().then(text => {
				  clientEnrollment.redirectError(response.status, text);
			  });
			}
			return response.text();
		  })
		  .then(data => {
				callback(data);
		  })
		  .catch(error => {
			console.error('Error:', error);
		  });

	};

	clientEnrollment.generateDeviceId = function(callback) {
		console.log('Generating device id.');
		var deviceId = 'OnboardUDID';
		chrome.storage.local.get(deviceId, function(item) {
			if (item[deviceId] === undefined) {
				// create new id
				forge.random.getBytes(16, function(err, bytes) {
					if (err) {
						clientEnrollment.redirect_error(1, 'Failed to generate device id');
						return;
					}
					item = {}
					item[deviceId] = forge.util.bytesToHex(bytes);
					chrome.storage.local.set(item, function() {
						if (chrome.runtime.lastError) {
							clientEnrollment.redirect_error(1, 'Failed to generate device id');
							return;
						}
						callback(item[deviceId]);
					});
				});
			} else {
				callback(item[deviceId]);
			}
		});
	};

	clientEnrollment.do_enroll = function() {
		console.log('Starting enrollment.');
		// check access to enterprise.platformKeys
		if (chrome.enterprise === undefined || chrome.enterprise.platformKeys === undefined) {
			clientEnrollment.redirectError(1, 'Onboard Extension does not have permissions to create a certificate. It must be installed by admin.google.com policy, not direct from the Chrome Web Store.')
		}
		clientEnrollment.generateDeviceId(function(device_id) {
			clientEnrollment.onboardEnroll(device_id, function(response) {
				clientEnrollment.estEnroll(response, function(token, certificate) {
					clientEnrollment.installCertificate(token, certificate, function() {
						console.log('Successfully installed certificate');
						sendResponse({error: false});
					});
				});
			});
		});
	};

	return clientEnrollment;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	clientEnrollment = new ClientEnrollment(message, sendResponse);
	clientEnrollment.do_enroll();
	return true; // we want to send a response
});
