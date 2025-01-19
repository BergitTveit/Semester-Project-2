import { handleLoginButtonClick } from '../../utils/handlers/auth-handlers/loginHandler.mjs';
import { handleGoToRegisterPageClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
import { createButton } from '../common/buttons.mjs';
import { createEmailInput, createPasswordInput } from '../common/forminputs.mjs';

export function initializeLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const formWrapper = document.createElement('div');
    formWrapper.classList.add('min-h-screen', 'pt-20');

    form.parentNode.insertBefore(formWrapper, form);
    formWrapper.appendChild(form);

    const welcomeContainer = document.createElement('div');
    welcomeContainer.classList.add('text-center', 'mb-8');

    const welcomeText = document.createElement('h1');
    welcomeText.textContent = 'Welcome Back';
    welcomeText.classList.add(
        'text-4xl',
        'font-bold',
        'text-secondary',
        'mb-2',
        'font-irish-grover',
        'tracking-widest'
    );

    const subtitleText = document.createElement('p');
    subtitleText.textContent = 'Sign up, get 1000 credits';
    subtitleText.classList.add('text-darkGray', 'font-istok-web');

    welcomeContainer.appendChild(welcomeText);
    welcomeContainer.appendChild(subtitleText);

    form.classList.add(
        'flex',
        'flex-col',
        'items-center',
        'mx-auto',
        'gap-4',
        'px-4',
        'w-full',
        'max-w-lg'
    );

    const emailInput = createEmailInput();
    const passwordInput = createPasswordInput();

    [emailInput, passwordInput].forEach(input => {
        input.classList.add('w-full');
    });

    const loginButton = createButton('Login', null, 'submit');
    loginButton.id = 'loginButton';
    loginButton.disabled = true;

    const registerButton = createButton(
        'Register',
        handleGoToRegisterPageClick,
        'button',
        'primary'
    );
    registerButton.id = 'registerButton';

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'justify-between', 'items-center', 'w-full', 'mt-4');
    buttonContainer.appendChild(registerButton);
    buttonContainer.appendChild(loginButton);

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

    form.appendChild(welcomeContainer);

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(buttonContainer);

    checkFormValidity();
}
