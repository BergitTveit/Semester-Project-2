import { createButton } from '../components/buttons.mjs';
import {
    createEmailInput,
    createNameInput,
    createPasswordInput,
} from '../components/forminputs.mjs';
import { handleCancelButtonClick, handleRegisterButtonClick } from '../handlers/formhandlers.mjs';

export function initializeRegisterForm() {
    const form = document.getElementById('registerForm');
    const registerButton = createButton('Register', () => {
        handleRegisterButtonClick(nameInput, emailInput, passwordInput);
    });
    registerButton.disabled = true;

    function checkFormValidity() {
        const nameError = nameInput.querySelector('.text-red-500').textContent;
        const emailError = emailInput.querySelector('.text-red-500').textContent;
        const passwordError = passwordInput.querySelector('.text-red-500').textContent;
        registerButton.disabled = !!(nameError || emailError || passwordError);
    }

    const nameInput = createNameInput(checkFormValidity);
    const emailInput = createEmailInput(checkFormValidity);
    const passwordInput = createPasswordInput(checkFormValidity);

    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(createButton('Cancel', handleCancelButtonClick));
    form.appendChild(registerButton);

    checkFormValidity();
}
