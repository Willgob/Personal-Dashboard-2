import crypto from 'crypto';
import { env } from '$env/dynamic/private';

/** @type {Buffer | undefined} */
let cachedKey;

function getKey() {
    if (cachedKey) return cachedKey;

    const keyBase64 = env.TOKEN_ENCRYPTION_KEY;
    if (!keyBase64) {
        throw new Error('Missing TOKEN_ENCRYPTION_KEY environment variable');
    }

    const key = Buffer.from(keyBase64, 'base64');
    if (key.length !== 32) {
        throw new Error('TOKEN_ENCRYPTION_KEY must be a base64-encoded 32-byte key for aes-256-gcm');
    }

    cachedKey = key;
    return cachedKey;
}

/** @param {string} item */
export function encrypt(item) {
    const key = getKey();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const encrypted = Buffer.concat([cipher.update(item, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

/** @param {string} encrypted_item */
export function decrypt(encrypted_item) {
    const key = getKey();
    const data = Buffer.from(encrypted_item, 'base64');

    const iv = data.subarray(0, 12);
    const tag= data.subarray(12, 28);
    const encrypted = data.subarray(28);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    const decrypted= Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}