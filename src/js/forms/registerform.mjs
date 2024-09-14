import { createButton } from '../components/buttons.mjs';
import {
    createEmailInput,
    createNameInput,
    createPasswordInput,
} from '../components/forminputs.mjs';
import { handleCancelButtonClick, handleRegisterButtonClick } from '../handlers/formhandlers.mjs';

export function initializeRegisterForm() {
    const form = document.getElementById('registerForm');
    const registerButton = createButton('Register', handleRegisterClick);
    registerButton.disabled = true;

    let nameInput, emailInput, passwordInput;

    function checkFormValidity() {
        if (!nameInput || !emailInput || !passwordInput) return;

        const nameError = nameInput.querySelector('.text-red-500').textContent;
        const emailError = emailInput.querySelector('.text-red-500').textContent;
        const passwordError = passwordInput.querySelector('.text-red-500').textContent;

        const isFormValid =
            !(nameError || emailError || passwordError) &&
            nameInput.querySelector('input').value &&
            emailInput.querySelector('input').value &&
            passwordInput.querySelector('input').value;

        registerButton.disabled = !isFormValid;
        registerButton.classList.toggle('opacity-50', !isFormValid);
        registerButton.classList.toggle('cursor-not-allowed', !isFormValid);
    }

    function handleRegisterClick() {
        if (!registerButton.disabled) {
            handleRegisterButtonClick(nameInput, emailInput, passwordInput);
        }
    }

    nameInput = createNameInput(() => setTimeout(checkFormValidity, 0));
    emailInput = createEmailInput(() => setTimeout(checkFormValidity, 0));
    passwordInput = createPasswordInput(() => setTimeout(checkFormValidity, 0));

    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(createButton('Cancel', handleCancelButtonClick));
    form.appendChild(registerButton);

    checkFormValidity();
}
