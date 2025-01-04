import { loginUser } from '../api/auth/login.mjs';
import { registerNewUser } from '../api/auth/register.mjs';
import { addInitialCredits } from '../api/profile/addInitialCredits.mjs';
import { save } from '../storage/save.mjs';

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
        } catch (creditError) {
            console.error('Error adding initial credits:', creditError.message);
            save('creditAdditionError', creditError.message);
        }
    } catch (error) {
        console.error('Error during registration process:', error.message);
    }
}
