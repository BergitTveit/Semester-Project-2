import { loginUser } from '../api/auth/login_user.mjs';
import { registerNewUser } from '../api/auth/register_new_user.mjs';
import { updateProfile } from '../api/profile/updateProfile.mjs';

export async function handleRegisterButtonClick(nameInput, emailInput, passwordInput) {
    const name = nameInput.querySelector('input').value;
    const email = emailInput.querySelector('input').value;
    const password = passwordInput.querySelector('input').value;

    const nameError = nameInput.querySelector('.text-red-500').textContent;
    const emailError = emailInput.querySelector('.text-red-500').textContent;
    const passwordError = passwordInput.querySelector('.text-red-500').textContent;

    if (nameError || emailError || passwordError) {
        console.error('Form contains validation errors.');
        return;
    }

    try {
        const result = await registerNewUser(name, email, password);
        console.log('Registered successfully:', result);
    } catch (error) {
        console.error('Error registering:', error.message);
    }
}

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

export async function handleUpdateButtonClick(nameInput, emailInput, passwordInput, avatarInput) {
    console.log('Update button clicked');
    const name = nameInput.querySelector('input').value;
    const email = emailInput.querySelector('input').value;
    const password = passwordInput.querySelector('input').value;
    const avatarFile = avatarInput.files[0];

    let avatarUrl = null;

    if (avatarFile) {
        // Convert image file to URL
        const reader = new FileReader();
        reader.onloadend = async () => {
            avatarUrl = reader.result;
            await updateProfile({ name, email, password, avatar: avatarUrl });
        };
        reader.readAsDataURL(avatarFile);
    } else {
        // Update without avatar
        await updateProfile({ name, email, password });
    }
}

// export async function handleUpdateButtonClick() {
//     const nameInput = document.querySelector('#nameInput input');
//     const emailInput = document.querySelector('#emailInput input');
//     const passwordInput = document.querySelector('#passwordInput input');
//     const avatarInput = document.querySelector('#avatarInput');

//     const name = nameInput.value;
//     const email = emailInput.value;
//     const password = passwordInput.value;
//     const avatarFile = avatarInput.files[0];

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);

//     if (avatarFile) {
//         formData.append('avatar', avatarFile);
//     }

//     const storedProfile = load('profile');
//     const profileName = storedProfile ? storedProfile.name : '';

//     try {
//         await updateProfile(profileName, formData);
//         alert('Profile updated successfully');

//         window.location.reload();
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         alert('Failed to update profile');
//     }
// }

export function handleCancelButtonClick() {
    window.location.href = '/index.html';
}

export function handleGoToRegisterPageClick() {
    window.location.href = '/pages/register/index.html';
}
