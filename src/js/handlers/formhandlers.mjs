import { registerNewUser } from '../api/auth/register_new_user.mjs';

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

export function handleCancelButtonClick() {
    console.log('Cancel button clicked');
}
