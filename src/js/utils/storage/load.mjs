export function load(key) {
    const token = localStorage.getItem(key);
    if (!token) {
        return null;
    }
    return JSON.parse(token);
}
