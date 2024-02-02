export function generateUniqueId(): string {
    const timestamp = Date.now().toString(36);
    const randomChars = Math.random().toString(36).substring(2, 9);
    return `${timestamp}-${randomChars}`;
}