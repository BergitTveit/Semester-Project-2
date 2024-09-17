import { createButton } from '../components/buttons.mjs';
import { createEmailInput, createPasswordInput } from '../components/forminputs.mjs';
import { handleGoToRegisterPageClick, handleLoginButtonClick } from '../handlers/formhandlers.mjs';

export function initializeLoginForm() {
    const form = document.getElementById('loginForm');
    const loginButton = createButton('Login', handleLoginClick);
    loginButton.id = 'loginButton';
    loginButton.disabled = true;

    let emailInput, passwordInput;

    function checkFormValidity() {
        if (!emailInput || !passwordInput) return;

        const emailError = emailInput.querySelector('.text-red-500').textContent;
        const passwordError = passwordInput.querySelector('.text-red-500').textContent;

        const isFormValid =
            !(emailError || passwordError) &&
            emailInput.querySelector('input').value &&
            passwordInput.querySelector('input').value;

        loginButton.disabled = !isFormValid;
        loginButton.classList.toggle('opacity-50', !isFormValid);
        loginButton.classList.toggle('cursor-not-allowed', !isFormValid);
    }

    function handleLoginClick() {
        if (!loginButton.disabled) {
            handleLoginButtonClick(emailInput, passwordInput);
        }
    }

    emailInput = createEmailInput(() => setTimeout(checkFormValidity, 0));
    passwordInput = createPasswordInput(() => setTimeout(checkFormValidity, 0));

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(createButton('Register', handleGoToRegisterPageClick));
    form.appendChild(loginButton);

    checkFormValidity();
}
