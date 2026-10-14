#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const OAUTH_CLIENT_IDS = {
  dev: '376371791920-pb7haeavc0kk57oida8mehhisoeos3qm.apps.googleusercontent.com',
  prod: '376371791920-mv6rthroj7ohcbjjrs380l0b2jsj6fl8.apps.googleusercontent.com'
};

const env = (process.argv[2] || 'prod').toLowerCase();
if (env !== 'dev' && env !== 'prod') {
  console.error('Usage: node scripts/set-manifest-oauth.js <dev|prod>');
  process.exit(1);
}

const manifestPath = path.join(__dirname, '..', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (!manifest.oauth2) manifest.oauth2 = { scopes: [] };
manifest.oauth2.client_id = OAUTH_CLIENT_IDS[env];
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log('manifest.json oauth2.client_id →', env);
