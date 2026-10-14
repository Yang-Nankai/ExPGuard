// auth.js — Google OAuth2 PKCE Authentication Module
// Cross-browser: Firefox (Desktop/Android) + Chrome/Chromium
// Scopes: drive.appdata (books scope temporarily removed — see TODO below)

(function () {
    'use strict';

    const GOOGLE_CLIENT_ID = '275551020017-arsi5k9t28esd0o2h40i9hgn4afuum0i.apps.googleusercontent.com';
    const GOOGLE_CLIENT_SECRET = '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';

    // ── Scope Configuration ─────────────────────────────────────
    // AUTH_SCOPES is the single source of truth for all OAuth2 scopes
    // requested during login. To add or remove a scope, edit this
    // array — do NOT hardcode scope strings elsewhere in this file.
    const AUTH_SCOPES = [
        'email',
        'https://www.googleapis.com/auth/drive.appdata'
        /* TODO: Books integration pending scope update
        'https://www.googleapis.com/auth/books'
        */
    ];

    // Derived scope string consumed by the OAuth2 authorization URL.
    const GOOGLE_SCOPES = AUTH_SCOPES.join(' ');

    // Storage keys — must mirror the constants in options.js
    const GOOGLE_TOKEN_KEY   = 'google_access_token';
    const GOOGLE_REFRESH_KEY = 'google_refresh_token';
    const GOOGLE_EXPIRY_KEY  = 'google_token_expiry';
    const GOOGLE_EMAIL_KEY   = 'google_user_email';

    // Cross-browser API handle
    const _api     = (typeof browser !== 'undefined' ? browser : chrome);
    const _storage = _api.storage;

    // ──────────────────────────────────────────────────────────
    //  PKCE Helpers
    // ──────────────────────────────────────────────────────────

    function base64urlEncode(buffer) {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }

    async function generateCodeVerifier() {
        const array = new Uint8Array(64);
        crypto.getRandomValues(array);
        return base64urlEncode(array.buffer);
    }

    async function generateCodeChallenge(verifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return base64urlEncode(hash);
    }

    // ──────────────────────────────────────────────────────────
    //  Core Auth Flow
    // ──────────────────────────────────────────────────────────

    /**
     * Launches the Google OAuth2 Authorization Code + PKCE flow.
     * Works on Chrome and Firefox via launchWebAuthFlow.
     */
    async function launchGoogleAuth() {
        if (!_api.identity) {
            throw new Error('Google Sign-In is not supported on this browser. Please use Export Sync Token/Import to copy your token to another device.');
        }

        const verifier   = await generateCodeVerifier();
        const challenge  = await generateCodeChallenge(verifier);
        const redirectUri = _api.identity.getRedirectURL();

        const params = new URLSearchParams({
            client_id:             GOOGLE_CLIENT_ID,
            redirect_uri:          redirectUri,
            response_type:         'code',
            scope:                 GOOGLE_SCOPES,
            code_challenge:        challenge,
            code_challenge_method: 'S256',
            access_type:           'offline',
            prompt:                'consent'
        });

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

        let redirectUrl;
        try {
            redirectUrl = await _api.identity.launchWebAuthFlow({
                url: authUrl,
                interactive: true
            });
        } catch (e) {
            console.error('[Auth] launchWebAuthFlow error:', e);
            throw new Error('Google sign-in was cancelled or failed.');
        }

        if (!redirectUrl) throw new Error('No redirect URL returned from auth flow.');

        const returnedUrl = new URL(redirectUrl);
        const code  = returnedUrl.searchParams.get('code');
        const error = returnedUrl.searchParams.get('error');

        if (error) throw new Error(`Google auth error: ${error}`);
        if (!code)  throw new Error('Authorization code not found in redirect URL.');

        await _exchangeCodeForTokens(code, verifier, redirectUri);
    }

    /**
     * Exchanges the authorization code for access + refresh tokens.
     * Stores all tokens and the user email in storage.local.
     * @private
     */
    async function _exchangeCodeForTokens(code, verifier, redirectUri) {
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id:     GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                code,
                code_verifier: verifier,
                grant_type:    'authorization_code',
                redirect_uri:  redirectUri
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(`Token exchange failed: ${err.error_description || err.error || response.status}`);
        }

        const data   = await response.json();
        const expiry = Date.now() + (data.expires_in * 1000);

        // Attempt to extract email from id_token JWT payload (no signature verification needed here)
        let email = null;
        if (data.id_token) {
            try {
                const payload = JSON.parse(atob(data.id_token.split('.')[1]));
                email = payload.email || null;
            } catch (e) { /* ignore */ }
        }

        // Fallback: fetch from userinfo endpoint
        if (!email && data.access_token) {
            try {
                const infoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${data.access_token}` }
                });
                if (infoRes.ok) {
                    const info = await infoRes.json();
                    email = info.email || null;
                }
            } catch (e) { /* ignore */ }
        }

        const toSave = {
            [GOOGLE_TOKEN_KEY]:  data.access_token,
            [GOOGLE_EXPIRY_KEY]: expiry
        };
        if (data.refresh_token) toSave[GOOGLE_REFRESH_KEY] = data.refresh_token;
        if (email)               toSave[GOOGLE_EMAIL_KEY]   = email;

        await new Promise((resolve, reject) => {
            _storage.local.set(toSave, () => {
                if (_api.runtime.lastError) reject(_api.runtime.lastError);
                else resolve();
            });
        });
    }

    // ──────────────────────────────────────────────────────────
    //  Token Management
    // ──────────────────────────────────────────────────────────

    /**
     * Returns a valid access token, refreshing it automatically if expired.
     * @param {boolean} forceRefresh - If true, bypasses the local expiry check and forces a refresh.
     * @returns {Promise<string>} A valid access token.
     */
    async function getValidAccessToken(forceRefresh = false) {
        const items = await new Promise(r =>
            _storage.local.get([GOOGLE_TOKEN_KEY, GOOGLE_REFRESH_KEY, GOOGLE_EXPIRY_KEY], r)
        );

        const now      = Date.now();
        const expiry   = items[GOOGLE_EXPIRY_KEY] || 0;
        const fiveMin  = 5 * 60 * 1000;

        // Token is still valid (more than 5 minutes remaining) and we aren't forcing a refresh
        if (!forceRefresh && items[GOOGLE_TOKEN_KEY] && (expiry - now) > fiveMin) {
            return items[GOOGLE_TOKEN_KEY];
        }

        // Try to refresh using the refresh token
        const refreshToken = items[GOOGLE_REFRESH_KEY];
        if (!refreshToken) {
            throw new Error('Session expired. Please log in with Google again.');
        }

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id:     GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                refresh_token: refreshToken,
                grant_type:    'refresh_token'
            })
        });

        if (!response.ok) {
            // Refresh token is invalid/revoked — clear storage
            await _clearTokens();
            throw new Error('Session expired. Please log in with Google again.');
        }

        const data     = await response.json();
        const newExpiry = Date.now() + (data.expires_in * 1000);

        await new Promise((resolve, reject) => {
            _storage.local.set({
                [GOOGLE_TOKEN_KEY]:  data.access_token,
                [GOOGLE_EXPIRY_KEY]: newExpiry
            }, () => {
                if (_api.runtime.lastError) reject(_api.runtime.lastError);
                else resolve();
            });
        });

        return data.access_token;
    }

    /**
     * Revokes the Google token and clears all auth data from storage.
     */
    async function revokeGoogleAuth() {
        const items = await new Promise(r =>
            _storage.local.get([GOOGLE_TOKEN_KEY, GOOGLE_REFRESH_KEY], r)
        );

        // Prefer revoking the refresh token; fall back to access token
        const tokenToRevoke = items[GOOGLE_REFRESH_KEY] || items[GOOGLE_TOKEN_KEY];

        if (tokenToRevoke) {
            try {
                await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(tokenToRevoke)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
            } catch (e) {
                // Ignore network errors — local data will still be cleared
                console.warn('[Auth] Token revocation request failed (ignoring):', e);
            }
        }

        await _clearTokens();
    }

    /** @private Removes all Google auth keys from local storage. */
    async function _clearTokens() {
        await new Promise(resolve =>
            _storage.local.remove([
                GOOGLE_TOKEN_KEY,
                GOOGLE_REFRESH_KEY,
                GOOGLE_EXPIRY_KEY,
                GOOGLE_EMAIL_KEY
            ], resolve)
        );
    }

    /**
     * Returns the stored Google account email, or null if not logged in.
     * @returns {Promise<string|null>}
     */
    async function getGoogleEmail() {
        const items = await new Promise(r =>
            _storage.local.get({ [GOOGLE_EMAIL_KEY]: null }, r)
        );
        return items[GOOGLE_EMAIL_KEY];
    }

    /**
     * Returns true if the user is currently authenticated with Google.
     * @returns {Promise<boolean>}
     */
    async function isAuthenticated() {
        const email = await getGoogleEmail();
        return email !== null;
    }

    /**
     * Exports the refresh token and email as a base64 encoded JSON string.
     * @returns {Promise<string>} The encoded token string.
     */
    async function exportToken() {
        const items = await new Promise(r =>
            _storage.local.get([GOOGLE_REFRESH_KEY, GOOGLE_EMAIL_KEY], r)
        );
        if (!items[GOOGLE_REFRESH_KEY]) throw new Error('No refresh token available to export.');
        
        const payload = {
            r: items[GOOGLE_REFRESH_KEY],
            e: items[GOOGLE_EMAIL_KEY]
        };
        return btoa(JSON.stringify(payload));
    }

    /**
     * Imports an encoded token string, saves it, and validates it.
     * @param {string} encodedString - The base64 encoded JSON string.
     */
    async function importToken(encodedString) {
        try {
            const jsonStr = atob(encodedString.trim());
            const payload = JSON.parse(jsonStr);
            
            if (!payload.r) throw new Error('Invalid token string: Missing refresh token.');
            
            const toSave = {
                [GOOGLE_REFRESH_KEY]: payload.r
            };
            if (payload.e) toSave[GOOGLE_EMAIL_KEY] = payload.e;

            // Clear existing access token and expiry to force a refresh
            toSave[GOOGLE_TOKEN_KEY] = '';
            toSave[GOOGLE_EXPIRY_KEY] = 0;

            await new Promise((resolve, reject) => {
                _storage.local.set(toSave, () => {
                    if (_api.runtime.lastError) reject(_api.runtime.lastError);
                    else resolve();
                });
            });

            // Validate the refresh token by getting a new access token
            await getValidAccessToken(true);
        } catch (e) {
            throw new Error('Failed to import token: ' + e.message);
        }
    }

    // ──────────────────────────────────────────────────────────
    //  Public API
    // ──────────────────────────────────────────────────────────
    window.googleAuth = {
        login:           launchGoogleAuth,
        logout:          revokeGoogleAuth,
        getToken:        getValidAccessToken,
        getEmail:        getGoogleEmail,
        isAuthenticated: isAuthenticated,
        exportToken:     exportToken,
        importToken:     importToken
    };

})();
