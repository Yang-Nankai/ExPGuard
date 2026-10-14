import { cU as toB64Buffer, cV as cryptoBrowserifyExports, am as Buffer$1, cW as toB64String } from './index.js';

const HASH = "SHA-256";
const ITERATRIONS = 1e4;
const DERIVIATION_KEY_LENGTH = 48;
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder("utf-8");
const DEFAULT_MSG_PASSWORD = "cardano";
const encryptMessage = async (msg, password, enc = "basic") => {
  if (enc !== "basic") {
    throw new Error("Unsupported decryption type: " + enc);
  }
  try {
    let salt8;
    if (typeof self !== "undefined") {
      salt8 = self.crypto.getRandomValues(new Uint8Array(8));
    } else {
      salt8 = cryptoBrowserifyExports.webcrypto.getRandomValues(new Uint8Array(8));
    }
    const derivation = await getDerivation(salt8, password);
    const keyObject = await getKey(derivation);
    const encryptedObject = await encrypt(JSON.stringify(msg), keyObject);
    const encObjectU8 = Uint8Array.from(Buffer$1.from(encryptedObject));
    const prefix = TEXT_ENCODER.encode("Salted__");
    const prefixedEncObject = new Uint8Array(prefix.length + salt8.length + encObjectU8.length);
    prefixedEncObject.set(prefix);
    prefixedEncObject.set(salt8, prefix.length);
    prefixedEncObject.set(encObjectU8, prefix.length + salt8.length);
    return toB64String(prefixedEncObject);
  } catch (e) {
    throw new Error("Failed to encrypt message: " + (e.message ?? e));
  }
};
const decryptMessage = async (msg, password, enc = "basic") => {
  if (enc !== "basic") {
    throw new Error("Unsupported decryption type: " + enc);
  }
  try {
    const derivation = await getDerivation(toB64Buffer(msg).slice(8, 16), password);
    const keyObject = await getKey(derivation);
    let decryptedObject = JSON.parse(await decrypt(toB64Buffer(msg).slice(16), keyObject));
    if (typeof decryptedObject === "string") {
      decryptedObject = decryptedObject.split("\n");
    }
    return decryptedObject;
  } catch (e) {
    throw new Error("Failed to decrypt message: " + (e.message ?? e));
  }
};
async function getDerivation(salt, password) {
  const passwordBuffer = TEXT_ENCODER.encode(password);
  const importedKey = await crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, ["deriveBits"]);
  const params = {
    name: "PBKDF2",
    hash: HASH,
    salt,
    iterations: ITERATRIONS
  };
  return await crypto.subtle.deriveBits(params, importedKey, DERIVIATION_KEY_LENGTH * 8);
}
async function getKey(derivation) {
  const derivedKey = derivation.slice(0, KEY_LENGTH);
  const iv = derivation.slice(KEY_LENGTH, KEY_LENGTH + IV_LENGTH);
  const importedEncryptionKey = await crypto.subtle.importKey("raw", derivedKey, { name: "AES-CBC" }, false, ["encrypt", "decrypt"]);
  return {
    key: importedEncryptionKey,
    iv
  };
}
async function encrypt(text, keyObject) {
  const textBuffer = TEXT_ENCODER.encode(text);
  return await crypto.subtle.encrypt({ name: "AES-CBC", iv: keyObject.iv }, keyObject.key, textBuffer);
}
async function decrypt(encryptedText, keyObject) {
  const decryptedText = await crypto.subtle.decrypt({ name: "AES-CBC", iv: keyObject.iv }, keyObject.key, encryptedText);
  return TEXT_DECODER.decode(decryptedText);
}

export { DEFAULT_MSG_PASSWORD as D, decryptMessage as d, encryptMessage as e };
