import { logoutUser } from '../../../api/auth/logoutUser.mjs';

export async function handleLogoutButtonClick() {
    logoutUser();
}
