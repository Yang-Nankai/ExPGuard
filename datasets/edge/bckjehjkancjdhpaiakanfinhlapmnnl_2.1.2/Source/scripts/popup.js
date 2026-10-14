(function(){

	function updateState() {
		if (sbxAPI.authorized()) {
			document.body.className = 'settings-mode';
			document.body.style.height =  document.getElementById('settings').outerHeight + 40;
			document.documentElement.style.height =  document.getElementById('settings').outerHeight + 40;
		}
		else {
			document.body.className = 'login-mode';
			document.body.style.height = 420;
			document.documentElement.style.height = 420;
		}
		populateSettings(sbxSettings());
		sbx.localize();
	}

	function populateSettings(settings) {
		sbx.each(settings, function(key, value){
			console.log(key, value);
			var el = document.getElementById('settings-'+key);

			if (el) {
				var format = 'sting';
				if (value === false || value === true){
					format = 'bool';
				}
				if (format == 'bool') {
					el.checked = value;
					el.onkeyup = el.onclick = el.onblur = function(){
						sbxSettings(key, this.checked);
					};
				}
				else {
					el.value = value;
                    el.onkeyup = el.onclick = el.onblur = function(){
						sbxSettings(key, this.value);
					};
				}
			}

			el = document.getElementById('info-'+key);

			if (el) {
				el.innerHTML = value;
				if (el.className == 'lastUrl') {
					el.href = value;
					el.title = value;
				}
			}
		});
		document.getElementById('email').value = settings.email;
	}


	function showError(msg) {
		document.getElementById('default-alert').className = 'alert hide';
		document.getElementById('failed-auth-alert').className = 'alert alert-danger';
		document.getElementById('auth-error-msg').innerHTML = msg;
	}

	function hideError() {
		document.getElementById('default-alert').className = 'alert hide';
		document.getElementById('failed-auth-alert').className = 'alert alert-danger hide';
		document.getElementById('auth-error-msg').innerHTML = '';
		var gh = document.getElementById('google-auth-hint');
		if (gh) gh.className = 'alert hide';
	}

	document.addEventListener('DOMContentLoaded', function () {

		sbxSettings(function(){
			updateState();
			sbxAPI.getFavorites(function(favorites){
				console.log(favorites);
				updateState();
			});
		});

		updateState();

		document.getElementById('signIn').onclick = function(){
			var email = document.getElementById('email').value.trim();
			var password = document.getElementById('password').value;

			if (!email || !password) {
				showError('Please enter email and password.');
				return false;
			}

			// Firebase Auth: sign in then get ID token and authorize with backend (same as Vue app)
			if (window.firebaseAuth && typeof window.firebaseAuth.signInAndGetToken === 'function') {
				window.firebaseAuth.signInAndGetToken(email, password)
					.then(function (idToken) {
						sbxAPI.getKey({
							idToken: idToken,
							email: email
						}, function () {
							hideError();
							updateState();
						}, function (err) {
							showError(err || 'Authorization failed');
						});
					})
					.catch(function (err) {
						var msg = err && err.message ? err.message : String(err);
						if (msg.indexOf('auth/') !== -1) {
							if (msg.indexOf('user-not-found') !== -1) msg = 'No account found with this email.';
							else if (msg.indexOf('wrong-password') !== -1 || msg.indexOf('invalid-credential') !== -1) msg = 'Invalid password.';
							else if (msg.indexOf('invalid-email') !== -1) msg = 'Invalid email address.';
							else if (msg.indexOf('too-many-requests') !== -1) msg = 'Too many attempts. Try again later or reset password.';
						}
						showError(msg);
					});
				return false;
			}

			// Fallback: legacy email + MD5 password (may not work with Firebase-only backend)
			sbxAPI.getKey({
				'l': email,
				'p': sbx.md5(password)
			}, function(){
				hideError();
				updateState();
			}, function(r){
				showError(r);
			});

			return false;
		};

		// Sign in with Google (Firebase popup, then backend getKey)
		var googleBtn = document.getElementById('signInGoogle');
		if (googleBtn) {
			googleBtn.onclick = function () {
				hideError();
				var authUrl = 'https://app.kiddoware.com/kw_backend_new/public/kpsb-extension-auth';
				if (chrome.tabs && chrome.tabs.create) {
					chrome.tabs.create({ url: authUrl });
				} else {
					window.open(authUrl, '_blank');
				}
				var hint = document.getElementById('google-auth-hint');
				if (hint) {
					hint.className = 'alert';
					hint.textContent = 'A new tab opened. Click Sign in with Google there and pick the account you want for Safe Browser (not the browser profile). When you see success, close the tab and open this extension again.';
				}
				return false;
			};
		}
	});

})();
