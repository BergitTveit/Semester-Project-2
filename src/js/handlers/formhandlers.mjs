import { loginUser } from '../api/auth/loginUser.mjs';
import { logoutUser } from '../api/auth/logoutUser.mjs';
import { updateProfile } from '../api/profile/updateProfile.mjs';
import { redirectToProfileOrLogin } from '../utils/storage/checkLoginStatus.mjs';

import { save } from '../utils/storage/save.mjs';

export async function handleLoginButtonClick(emailInput, passwordInput) {
    const email = emailInput.querySelector('input').value.trim();
    const password = passwordInput.querySelector('input').value.trim();
    try {
        await loginUser(email, password);
        window.location.href = redirectToProfileOrLogin();
    } catch (error) {
        console.error('Error registering:', error.message);
    }
}

export async function handleLogoutButtonClick() {
    logoutUser();
}
export function handleCancelButtonClick() {
    window.location.href = '/index.html';
}

export async function handleUpdateButtonClick(event) {
    event.preventDefault();

    const form = document.getElementById('settingsForm');
    const nameInput = form.querySelector('input[placeholder="Name"]');
    const bioInput = form.querySelector('textarea[placeholder="Bio"]');
    const avatarInput = form.querySelector('input[placeholder="Avatar Image URL"]');

    const profileData = {
        name: nameInput.value,
        bio: bioInput.value,
        avatar: avatarInput.value ? { url: avatarInput.value, alt: 'User Avatar' } : undefined,
    };

    try {
        const updatedProfile = await updateProfile(profileData);
        save('profile', updatedProfile.data);
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
}

export function handleGoToRegisterPageClick() {
    window.location.href = '/pages/register/index.html';
}
