import { handleRegisterButtonClick } from '../../utils/handlers/auth-handlers/registerHandler.mjs';
import { handleCancelButtonClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
import { createButton } from '../common/buttons.mjs';
import { createEmailInput, createNameInput, createPasswordInput } from '../common/forminputs.mjs';

export function initializeRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    const registerButton = createButton('Register', null, 'submit');
    registerButton.id = 'registerButton';
    registerButton.disabled = true;

    const cancelButton = createButton('Cancel', handleCancelButtonClick, 'button');

    const nameInput = createNameInput();
    const emailInput = createEmailInput();
    const passwordInput = createPasswordInput();

    function checkFormValidity() {
        const isNameValid = nameInput.querySelector('input').value.trim() !== '';
        const isEmailValid = emailInput.querySelector('input').value.trim() !== '';
        const isPasswordValid = passwordInput.querySelector('input').value.trim() !== '';

        const isFormValid = isNameValid && isEmailValid && isPasswordValid;

        registerButton.disabled = !isFormValid;
        registerButton.classList.toggle('opacity-50', !isFormValid);
        registerButton.classList.toggle('cursor-not-allowed', !isFormValid);
    }

    nameInput.querySelector('input').addEventListener('input', checkFormValidity);
    emailInput.querySelector('input').addEventListener('input', checkFormValidity);
    passwordInput.querySelector('input').addEventListener('input', checkFormValidity);

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!registerButton.disabled) {
            handleRegisterButtonClick(nameInput, emailInput, passwordInput);
        }
    });

    form.append(nameInput, emailInput, passwordInput, cancelButton, registerButton);

    checkFormValidity();
}
