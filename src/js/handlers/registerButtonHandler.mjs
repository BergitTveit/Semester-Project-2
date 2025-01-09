import { loginUser } from '../api/auth/loginUser.mjs';
import { registerNewUser } from '../api/auth/registerUser.mjs';
import { redirectToProfileOrLogin } from '../utils/storage/checkLoginStatus.mjs';

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
