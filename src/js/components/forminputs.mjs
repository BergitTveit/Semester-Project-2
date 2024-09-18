import {
    emailValidation,
    passwordValidation,
    urlValidation,
    usernameValidation,
} from '../utils/validators.mjs';

//Create input field

export function createInputField({ type, placeholder, validationFn, onInput }) {
    const container = document.createElement('div');
    container.classList.add('relative', 'mb-4');

    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.classList.add('form-input');

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('text-red-500', 'text-sm', 'mt-1');
    errorMessage.style.display = 'none';

    function validateInput() {
        const error = validationFn ? validationFn(input.value) : null;
        if (error) {
            errorMessage.textContent = error;
            errorMessage.style.display = 'block';
            input.classList.add('border-red-500');
        } else {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
            input.classList.remove('border-red-500');
        }
        if (onInput) {
            onInput();
        }
    }

    input.addEventListener('input', validateInput);

    container.appendChild(input);
    container.appendChild(errorMessage);

    return container;
}

//Create different input fields for forms
export function createNameInput(onInput) {
    return createInputField({
        type: 'text',
        placeholder: 'Name',
        validationFn: usernameValidation,
        onInput,
    });
}

export function createEmailInput(onInput) {
    return createInputField({
        type: 'email',
        placeholder: 'Email',
        validationFn: emailValidation,
        onInput,
    });
}

export function createPasswordInput(onInput) {
    return createInputField({
        type: 'password',
        placeholder: 'Password',
        validationFn: passwordValidation,
        onInput,
    });
}

export function createBioInput(onInput) {
    const container = document.createElement('div');
    container.classList.add('relative', 'mb-4');

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Bio';
    textarea.classList.add('form-textarea');
    textarea.rows = 3;

    if (onInput) {
        textarea.addEventListener('input', onInput);
    }

    container.appendChild(textarea);
    return container;
}

export function createAvatarInput(onInput) {
    return createInputField({
        type: 'url',
        placeholder: 'Avatar Image URL',
        validationFn: urlValidation,
        onInput,
    });
}
