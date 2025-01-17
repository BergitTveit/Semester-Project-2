import { clearError } from '../../utils/errors/displayError.mjs';
import {
    bidAmountValidation,
    dateValidation,
    emailValidation,
    passwordValidation,
    titleValidation,
    urlValidation,
    usernameValidation,
    validateFormInput,
} from '../../utils/validation/validators.mjs';

function createInputField({ type, placeholder, validationFn, onInput }) {
    const container = document.createElement('div');
    container.classList.add('relative', 'mb-4');

    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.classList.add('form-input');

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('text-red-500', 'text-sm', 'mt-1');
    errorMessage.style.display = 'none';

    input.addEventListener('input', () => {
        validateFormInput(input.value, validationFn, errorMessage, input);
        if (onInput) onInput();
    });

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

export function createMediaInput(onInput) {
    return createInputField({
        type: 'url',
        placeholder: 'Avatar Image URL',
        validationFn: urlValidation,
        onInput,
    });
}

export function createTitleInput(onInput) {
    return createInputField({
        type: 'text',
        placeholder: 'Title (required)',
        validationFn: titleValidation,
        onInput,
    });
}

export function createDateInput(onInput) {
    return createInputField({
        type: 'datetime-local',
        placeholder: 'End Date (required)',
        validationFn: dateValidation,
        onInput,
    });
}

export function createListingMediaInput(onInput) {
    return createInputField({
        type: 'url',
        placeholder: 'Image URL (optional)',
        onInput,
    });
}

export function createDescriptionInput(onInput) {
    const container = document.createElement('div');
    container.classList.add('relative', 'mb-4');

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Description (optional)';
    textarea.classList.add('form-textarea');
    textarea.rows = 4;

    if (onInput) {
        textarea.addEventListener('input', onInput);
    }

    container.appendChild(textarea);
    return container;
}

export function createBidAmountInput(onInput) {
    return createInputField({
        type: 'number',
        placeholder: 'Your bid amount ($)',
        validationFn: bidAmountValidation,
        onInput,
    });
}

export function createSearchInput(onInput) {
    const searchField = createInputField({
        type: 'search',
        placeholder: 'Search listings...',
        onInput: () => {
            const errorContainer = document.getElementById('searchErrorContainer');
            if (errorContainer) {
                clearError(errorContainer);
            }
            if (onInput) onInput();
        },
    });

    const input = searchField.querySelector('input');
    if (input) {
        input.setAttribute('aria-label', 'Search listings');
    }

    return searchField;
}
