import { handleRegisterButtonClick } from '../../utils/handlers/auth-handlers/registerHandler.mjs';
import { handleCancelButtonClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
import { createButton } from '../common/buttons.mjs';
import { createEmailInput, createNameInput, createPasswordInput } from '../common/forminputs.mjs';

// export function initializeRegisterForm() {
//     const form = document.getElementById('registerForm');

//     if (!form) return;

//     const registerButton = createButton('Register', null, 'submit');
//     registerButton.id = 'registerButton';
//     registerButton.disabled = true;

//     const cancelButton = createButton('Cancel', handleCancelButtonClick, 'button');

//     let nameInput, emailInput, passwordInput;

//     function checkFormValidity() {
//         if (!nameInput || !emailInput || !passwordInput) return;

//         const nameError = nameInput.querySelector('.text-red-500').textContent;
//         const emailError = emailInput.querySelector('.text-red-500').textContent;
//         const passwordError = passwordInput.querySelector('.text-red-500').textContent;

//         const isFormValid =
//             !(nameError || emailError || passwordError) &&
//             nameInput.querySelector('input').value &&
//             emailInput.querySelector('input').value &&
//             passwordInput.querySelector('input').value;

//         registerButton.disabled = !isFormValid;
//         registerButton.classList.toggle('opacity-50', !isFormValid);
//         registerButton.classList.toggle('cursor-not-allowed', !isFormValid);
//     }

//     form.addEventListener('submit', async event => {
//         event.preventDefault();
//         if (!registerButton.disabled) {
//             handleRegisterButtonClick(nameInput, emailInput, passwordInput);
//         }
//     });

//     nameInput = createNameInput(() => setTimeout(checkFormValidity, 0));
//     emailInput = createEmailInput(() => setTimeout(checkFormValidity, 0));
//     passwordInput = createPasswordInput(() => setTimeout(checkFormValidity, 0));

//     form.appendChild(nameInput);
//     form.appendChild(emailInput);
//     form.appendChild(passwordInput);
//     form.appendChild(cancelButton);
//     form.appendChild(registerButton);

//     checkFormValidity();
// }

export function initializeRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    const registerButton = createButton('Register', null, 'submit');
    registerButton.id = 'registerButton';
    registerButton.disabled = true;

    const cancelButton = createButton('Cancel', handleCancelButtonClick, 'button');

    // Initialize inputs immediately
    const nameInput = createNameInput();
    const emailInput = createEmailInput();
    const passwordInput = createPasswordInput();

    function checkFormValidity() {
        // Direct value validation instead of checking error messages
        const isNameValid = nameInput.querySelector('input').value.trim() !== '';
        const isEmailValid = emailInput.querySelector('input').value.trim() !== '';
        const isPasswordValid = passwordInput.querySelector('input').value.trim() !== '';

        const isFormValid = isNameValid && isEmailValid && isPasswordValid;

        registerButton.disabled = !isFormValid;
        registerButton.classList.toggle('opacity-50', !isFormValid);
        registerButton.classList.toggle('cursor-not-allowed', !isFormValid);
    }

    // Direct event listeners instead of setTimeout callbacks
    nameInput.querySelector('input').addEventListener('input', checkFormValidity);
    emailInput.querySelector('input').addEventListener('input', checkFormValidity);
    passwordInput.querySelector('input').addEventListener('input', checkFormValidity);

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!registerButton.disabled) {
            handleRegisterButtonClick(nameInput, emailInput, passwordInput);
        }
    });

    // Modern append syntax
    form.append(nameInput, emailInput, passwordInput, cancelButton, registerButton);

    checkFormValidity();
}
