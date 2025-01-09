import { clear } from '../../utils/storage/clear.mjs';

export async function logoutUser() {
    clear('token');
    clear('profile');
    window.location.href = '/index.html';
}
