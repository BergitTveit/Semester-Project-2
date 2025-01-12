import { createListing } from '../api/auction/createListing.mjs';
import { loginUser } from '../api/auth/loginUser.mjs';
import { logoutUser } from '../api/auth/logoutUser.mjs';
import { registerNewUser } from '../api/auth/registerUser.mjs';
import { updateProfile } from '../api/profile/updateProfile.mjs';
import { redirectToProfileOrLogin } from '../utils/storage/checkLoginStatus.mjs';

import { save } from '../utils/storage/save.mjs';

export async function handleRegisterButtonClick(nameInput, emailInput, passwordInput) {
    const name = nameInput.querySelector('input').value.trim();
    const email = emailInput.querySelector('input').value.trim();
    const password = passwordInput.querySelector('input').value.trim();

    try {
        await registerNewUser(name, email, password);

        await loginUser(email, password);
        window.location.href = redirectToProfileOrLogin();
    } catch (error) {
        console.error('Error during registration process:', error.message);

        const apiError = error?.errors?.[0]?.message;

        if (apiError === 'Profile already exists') {
            alert('This email is already registered. Please sign in instead.');
            emailInput.querySelector('input')?.focus();
            return;
        }

        alert('An error occurred during registration. Please try again later.');
    }
}

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

export function handleGoToRegisterPageClick() {
    window.location.href = '/pages/register/index.html';
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

export async function handleCreateListingSubmit(formData) {
    try {
        const response = await createListing(
            formData.title,
            formData.description,
            formData.media,
            new Date(formData.endsAt).toISOString()
        );

        showSuccessMessage('Auction listing created successfully!');

        setTimeout(() => {
            if (typeof window !== 'undefined' && window.location) {
                window.location.href = `/auction/${response.data.id}`;
            }
        }, 2000);
    } catch (error) {
        showErrorMessage(error.message || 'Failed to create auction listing');
    }
}

function showSuccessMessage(message) {
    const form = document.getElementById('createListingForm');
    const successMessage = document.createElement('div');
    successMessage.classList.add('text-green-500', 'text-sm', 'mt-4', 'text-center');
    successMessage.textContent = message;
    form.appendChild(successMessage);

    setTimeout(() => successMessage.remove(), 2000);
}

function showErrorMessage(message) {
    const form = document.getElementById('createListingForm');
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('text-red-500', 'text-sm', 'mt-4', 'text-center');
    errorDiv.textContent = message;
    form.appendChild(errorDiv);

    setTimeout(() => errorDiv.remove(), 3000);
}
