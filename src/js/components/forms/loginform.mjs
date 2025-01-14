import { handleLoginButtonClick } from '../../utils/handlers/auth-handlers/loginHandler.mjs';
import { handleGoToRegisterPageClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
import { createButton } from '../common/buttons.mjs';
import { createEmailInput, createPasswordInput } from '../common/forminputs.mjs';

export function initializeLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const loginButton = createButton('Login', null, 'submit');
    loginButton.id = 'loginButton';
    loginButton.disabled = true;

    const emailInput = createEmailInput();
    const passwordInput = createPasswordInput();
    const registerButton = createButton('Register', handleGoToRegisterPageClick, 'button');

    function checkFormValidity() {
        const isEmailValid = emailInput.querySelector('input').value.trim() !== '';
        const isPasswordValid = passwordInput.querySelector('input').value.trim() !== '';

        const isFormValid = isEmailValid && isPasswordValid;

        loginButton.disabled = !isFormValid;
        loginButton.classList.toggle('opacity-50', !isFormValid);
        loginButton.classList.toggle('cursor-not-allowed', !isFormValid);
    }

    emailInput.querySelector('input').addEventListener('input', checkFormValidity);
    passwordInput.querySelector('input').addEventListener('input', checkFormValidity);

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!loginButton.disabled) {
            handleLoginButtonClick(emailInput, passwordInput);
        }
    });

    form.append(emailInput, passwordInput, registerButton, loginButton);

    checkFormValidity();
}
