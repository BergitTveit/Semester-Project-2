import { loginUser } from '../api/auth/login.mjs';
import { registerNewUser } from '../api/auth/register.mjs';
import { addInitialCredits } from '../api/profile/addInitialCredits.mjs';
import { redirectToProfileOrLogin } from '../utils/storage/checkLoginStatus.mjs';
import { save } from '../utils/storage/save.mjs';

export async function handleRegisterButtonClick(nameInput, emailInput, passwordInput) {
    const name = nameInput.querySelector('input').value.trim();
    const email = emailInput.querySelector('input').value.trim();
    const password = passwordInput.querySelector('input').value.trim();

    const formErrors = {
        name: nameInput.querySelector('.text-red-500').textContent,
        email: emailInput.querySelector('.text-red-500').textContent,
        password: passwordInput.querySelector('.text-red-500').textContent,
    };
    if (Object.values(formErrors).some(error => error)) {
        console.error('Form contains validation errors:', formErrors);
        return;
    }
    //refactor login too.
    try {
        const registrationResult = await registerNewUser(name, email, password);
        console.log('Registered successfully:', registrationResult);

        const loginResult = await loginUser(email, password);
        console.log('User logged in successfully:', loginResult);

        try {
            const updatedProfile = await addInitialCredits(name);
            console.log('Profile after adding initial credits:', updatedProfile.data);
            console.log('Credits added:', updatedProfile.data.credits);

            save('profile', updatedProfile.data);
            save('creditAdditionComplete', 'true');

            window.location.href = redirectToProfileOrLogin();
        } catch (creditError) {
            console.error('Error adding initial credits:', creditError.message);
            save('creditAdditionError', creditError.message);
        }
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
