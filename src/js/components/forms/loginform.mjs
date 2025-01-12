import { handleLoginButtonClick } from '../../utils/handlers/auth-handlers/loginHandler.mjs';
import { handleGoToRegisterPageClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
import { createButton } from '../common/buttons.mjs';
import { createEmailInput, createPasswordInput } from '../common/forminputs.mjs';

//rename the file tologinForm with camel case

// export function initializeLoginForm() {
//     const form = document.getElementById('loginForm');
//     if (!form) return;

//     const loginButton = createButton('Login', null, 'submit');
//     loginButton.id = 'loginButton';
//     loginButton.disabled = true;

//     form.addEventListener('submit', async event => {
//         event.preventDefault();
//         if (!loginButton.disabled) {
//             handleLoginButtonClick(emailInput, passwordInput);
//         }
//     });

//     let emailInput, passwordInput;

//     function checkFormValidity() {
//         if (!emailInput || !passwordInput) return;

//         const emailError = emailInput.querySelector('.text-red-500').textContent;
//         const passwordError = passwordInput.querySelector('.text-red-500').textContent;

//         const isFormValid =
//             !(emailError || passwordError) &&
//             emailInput.querySelector('input').value &&
//             passwordInput.querySelector('input').value;

//         loginButton.disabled = !isFormValid;
//         loginButton.classList.toggle('opacity-50', !isFormValid);
//         loginButton.classList.toggle('cursor-not-allowed', !isFormValid);
//     }

//     emailInput = createEmailInput(() => setTimeout(checkFormValidity, 0));
//     passwordInput = createPasswordInput(() => setTimeout(checkFormValidity, 0));

//     const registerButton = createButton('Register', handleGoToRegisterPageClick, 'button');

//     form.appendChild(emailInput);
//     form.appendChild(passwordInput);
//     form.appendChild(registerButton);
//     form.appendChild(loginButton);

//     checkFormValidity();
// }
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

    // Direct event listeners instead of setTimeout callback
    emailInput.querySelector('input').addEventListener('input', checkFormValidity);
    passwordInput.querySelector('input').addEventListener('input', checkFormValidity);

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!loginButton.disabled) {
            handleLoginButtonClick(emailInput, passwordInput);
        }
    });

    // Cleaner append using modern syntax
    form.append(emailInput, passwordInput, registerButton, loginButton);

    checkFormValidity();
}
