import { loginUser } from '../api/auth/login.mjs';
import { updateProfile } from '../api/profile/updateProfile.mjs';
// import { redirectToProfileOrLogin } from '../utils/storage/checkLoginStatus.mjs';
import { clear } from '../utils/storage/clear.mjs';
import { save } from '../utils/storage/save.mjs';

export async function handleLoginButtonClick(emailInput, passwordInput) {
    const email = emailInput.querySelector('input').value.trim();
    const password = passwordInput.querySelector('input').value.trim();

    const emailError = emailInput.querySelector('.text-red-500').textContent;
    const passwordError = passwordInput.querySelector('.text-red-500').textContent;
    if (emailError || passwordError) {
        console.error('Form contains validation errors.');
        return;
    }
    try {
        const result = await loginUser(email, password);
        console.log('Login successfully loginbutton:', result);
        // const redirectUrl = redirectToProfileOrLogin();
        // window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error registering:', error.message);
    }
}

export async function handleLogoutButtonClick() {
    clear('token');
    clear('profile');
    window.location.href = '/index.html';
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
