import { customAlphabet } from 'nanoid';

// Generate a unique session ID
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 21);

export function generateSessionId(): string {
    return nanoid();
}

// Session expiration time (24 hours)
export const SESSION_EXPIRATION_MS = 24 * 60 * 60 * 1000;

export function isSessionExpired(createdAt: Date): boolean {
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    return diff > SESSION_EXPIRATION_MS;
}
