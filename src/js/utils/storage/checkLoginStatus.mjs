import { load } from './load.mjs';

export function redirectToProfileOrLogin() {
    const token = load('token');
    const profile = load('profile');
    if (token && profile) {
        return `/src/pages/profile/index.html?name=${profile.name}`;
    } else {
        return '/src/pages/login/index.html';
    }
}

export function isLoggedIn() {
    const token = load('token');
    return Boolean(token);
}
