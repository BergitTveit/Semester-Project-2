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

function createInputField({ type, placeholder, validationFn, onInput, rows = 1 }) {
    const container = document.createElement('div');
    container.classList.add('relative', 'mb-6', 'w-[350px]');

    const input =
        type === 'textarea' ? document.createElement('textarea') : document.createElement('input');

    if (type === 'textarea') {
        input.rows = rows;
    } else {
        input.type = type;
    }

    input.placeholder = placeholder;

    input.classList.add(
        'w-full',
        'px-3',
        'py-2',
        'text-gray-700',
        'font-istok-web',
        'text-base',
        'bg-white',
        'rounded-md',
        'shadow-inner',
        'shadow-darkGray/30',
        'focus:outline-none',
        'focus:ring-1',
        'focus:ring-secondary',
        'placeholder-darkGray',
        'border-0'
    );

    if (type === 'textarea') {
        input.classList.add('resize-y');
    } else {
        input.classList.add('h-10');
    }

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
export function createTextareaInput(onInput, placeholder = 'text input') {
    return createInputField({
        type: 'textarea',
        placeholder: placeholder,
        onInput: onInput,
        rows: 3,
    });
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
