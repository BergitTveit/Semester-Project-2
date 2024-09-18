import { load } from './load.mjs';

export function redirectToProfileOrLogin() {
    const token = load('token');
    const profile = load('profile');
    if (token && profile) {
        return `/pages/profile/index.html?name=${profile.name}`;
    } else {
        return '/pages/login/index.html';
    }
}
