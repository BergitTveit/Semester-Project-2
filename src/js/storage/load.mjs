export function load(key) {
    const token = localStorage.getItem(key);
    console.log('Loaded token:', token);
    if (!token) {
        console.error(`Token not found for: ${key}`);
        throw new Error('Token not found in localStorage!!!!!!!!');
    }
    return JSON.parse(token);
}
