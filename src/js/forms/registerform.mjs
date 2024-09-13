import { createButton } from '../components.mjs';
import { handleCancelButtonClick, handleRegisterButtonClick } from './formhandlers.mjs';
import { createEmailInput, createNameInput, createPasswordInput } from './forminputs.mjs';

export function initializeRegisterForm() {
    const form = document.getElementById('registerForm');

    const nameInput = createNameInput();
    const emailInput = createEmailInput();
    const passwordInput = createPasswordInput();

    const cancelButton = createButton('Cancel', handleCancelButtonClick);
    const registerButton = createButton('Register', () =>
        handleRegisterButtonClick(nameInput, emailInput, passwordInput)
    );

    registerButton.disabled = true;

    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    form.appendChild(cancelButton);
    form.appendChild(registerButton);

    function checkFormValidity() {
        const isFormValid =
            nameInput.checkValidity() &&
            emailInput.checkValidity() &&
            passwordInput.checkValidity();
        registerButton.disabled = !isFormValid;
    }

    nameInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);
}
