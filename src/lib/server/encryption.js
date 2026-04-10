import crypto from 'crypto';

const key = Buffer.from(process.env.TOKEN_ENCRYPTION_KEY, 'base64');

export function encrypt(item) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const encrypted = Buffer.concat([cipher.update(item, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decrypt(encrypted_item) {
    const data = Buffer.from(encrypted_item, 'base64');

    const iv = data.subarray(0, 12);
    const tag= data.subarray(12, 28);
    const encrypted = data.subarray(28);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    const decrypted= Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}