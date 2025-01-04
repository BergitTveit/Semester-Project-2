import { loginUser } from '../api/auth/login.mjs';
// import { registerNewUser } from '../api/auth/register.mjs';
// import { addInitialCredits } from '../api/profile/addInitialCredits.mjs';

import { updateProfile } from '../api/profile/updateProfile.mjs';
import { clear } from '../storage/clear.mjs';
import { save } from '../storage/save.mjs';

// export async function handleRegisterButtonClick(nameInput, emailInput, passwordInput) {
//     const name = nameInput.querySelector('input').value;
//     const email = emailInput.querySelector('input').value;
//     const password = passwordInput.querySelector('input').value;

//     const nameError = nameInput.querySelector('.text-red-500').textContent;
//     const emailError = emailInput.querySelector('.text-red-500').textContent;
//     const passwordError = passwordInput.querySelector('.text-red-500').textContent;

//     if (nameError || emailError || passwordError) {
//         console.error('Form contains validation errors.');
//         return;
//     }

//     try {
//         const registrastionResult = await registerNewUser(name, email, password);
//         console.log('Registered successfully:', registrastionResult);

//         // Log in the user after successful registration
//         const loginResult = await loginUser(email, password);
//         console.log('User logged in successfully:', loginResult);
//         save('token', loginResult.accessToken);
//         save('profile', loginResult);

//         // Add initial credits
//         const updatedProfile = await addInitialCredits(name);
//         console.log('Initial credits added successfully:', updatedProfile);
//         save('profile', updatedProfile);

//         console.log('Initial credits added successfully');

//         // Redirect to profile page or perform any other post-registration actions
//         // window.location.href = '/pages/profile/index.html?name=' + name;
//     } catch (error) {
//         console.error('Error during registration process:', error.message);
//     }
// }

// export async function handleRegisterButtonClick(nameInput, emailInput, passwordInput) {
//     const name = nameInput.querySelector('input').value;
//     const email = emailInput.querySelector('input').value;
//     const password = passwordInput.querySelector('input').value;

//     const nameError = nameInput.querySelector('.text-red-500').textContent;
//     const emailError = emailInput.querySelector('.text-red-500').textContent;
//     const passwordError = passwordInput.querySelector('.text-red-500').textContent;

//     if (nameError || emailError || passwordError) {
//         console.error('Form contains validation errors.');
//         return;
//     }

//     try {
//         const result = await registerNewUser(name, email, password);
//         console.log('Registered successfully:', result);
//     } catch (error) {
//         console.error('Error registering:', error.message);
//     }
// }

export async function handleLoginButtonClick(emailInput, passwordInput) {
    const email = emailInput.querySelector('input').value;
    const password = passwordInput.querySelector('input').value;

    const emailError = emailInput.querySelector('.text-red-500').textContent;
    const passwordError = passwordInput.querySelector('.text-red-500').textContent;
    if (emailError || passwordError) {
        console.error('Form contains validation errors.');
        return;
    }
    try {
        const result = await loginUser(email, password);
        console.log('Login successfully:', result);
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
