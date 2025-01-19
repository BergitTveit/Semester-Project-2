import { handleRegisterButtonClick } from '../../utils/handlers/auth-handlers/registerHandler.mjs';
import { handleCancelButtonClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
import { createButton } from '../common/buttons.mjs';
import { createEmailInput, createNameInput, createPasswordInput } from '../common/forminputs.mjs';

export function initializeRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    const formWrapper = document.createElement('div');
    formWrapper.classList.add('min-h-screen', 'pt-20');

    form.parentNode.insertBefore(formWrapper, form);
    formWrapper.appendChild(form);

    const welcomeContainer = document.createElement('div');
    welcomeContainer.classList.add('text-center', 'mb-8');

    const welcomeText = document.createElement('h1');
    welcomeText.textContent = 'Create Account';
    welcomeText.classList.add(
        'text-2xl',
        'font-bold',
        'text-secondary',
        'mb-2',
        'font-irish-grover',
        'tracking-widest'
    );

    const subtitleText = document.createElement('p');
    subtitleText.textContent = 'Please fill in your details';
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

    const nameInput = createNameInput();
    const emailInput = createEmailInput();
    const passwordInput = createPasswordInput();

    [nameInput, emailInput, passwordInput].forEach(input => {
        input.classList.add('w-full');
    });

    const registerButton = createButton('Register', null, 'submit');
    registerButton.id = 'registerButton';
    registerButton.disabled = true;

    const cancelButton = createButton('Cancel', handleCancelButtonClick, 'button', 'secondary');
    cancelButton.id = 'cancelButton';

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'justify-between', 'items-center', 'w-full', 'mt-4');
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(registerButton);

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

    form.appendChild(welcomeContainer);

    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(buttonContainer);

    checkFormValidity();
}
