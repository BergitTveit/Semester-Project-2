import { loginUser } from '../../../api/auth/loginUser.mjs';
import { redirectToProfileOrLogin } from '../../storage/checkLoginStatus.mjs';

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
