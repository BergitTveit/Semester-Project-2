import { jest } from '@jest/globals';

// Mock the modules
jest.mock('../../components/buttons.mjs', () => ({
    createButton: jest.fn(),
}));

jest.mock('../../components/forminputs.mjs', () => ({
    createEmailInput: jest.fn(),
    createPasswordInput: jest.fn(),
}));

// Import the function to test and the mocked modules
import { initializeLoginForm } from '../loginform.mjs';
import { createButton } from '../../components/buttons.mjs';
import { createEmailInput, createPasswordInput } from '../../components/forminputs.mjs';
// import { handleLoginButtonClick } from '../../handlers/formhandlers.mjs';

describe('initializeLoginForm', () => {
    beforeEach(() => {
        document.body.innerHTML = `<form id="loginForm"></form>`;
        jest.clearAllMocks();

        // Mock implementations
        createButton.mockImplementation((text, handler) => {
            const button = document.createElement('button');
            button.textContent = text;
            button.addEventListener('click', handler);
            return button;
        });

        createEmailInput.mockImplementation(() => {
            const emailDiv = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'email';
            input.value = '';
            const errorSpan = document.createElement('span');
            errorSpan.className = 'text-red-500';
            emailDiv.appendChild(input);
            emailDiv.appendChild(errorSpan);
            return emailDiv;
        });

        createPasswordInput.mockImplementation(() => {
            const passwordDiv = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'password';
            input.value = '';
            const errorSpan = document.createElement('span');
            errorSpan.className = 'text-red-500';
            passwordDiv.appendChild(input);
            passwordDiv.appendChild(errorSpan);
            return passwordDiv;
        });
    });

    it('should initialize the login button as disabled', () => {
        initializeLoginForm();

        const loginButton = document.getElementById('loginButton');
        expect(loginButton).not.toBeNull();
        expect(loginButton.textContent).toBe('Login');
        expect(loginButton.disabled).toBe(true);
        expect(loginButton.classList.contains('opacity-50')).toBe(true);
        expect(loginButton.classList.contains('cursor-not-allowed')).toBe(true);

        expect(createButton).toHaveBeenCalledWith('Login', expect.any(Function));
        expect(createEmailInput).toHaveBeenCalled();
        expect(createPasswordInput).toHaveBeenCalled();
    });

    // it('should enable the login button when inputs are valid', () => {
    //     initializeLoginForm();

    //     const loginButton = document.getElementById('loginButton');
    //     const emailInput = document.querySelector('input[type="email"]');
    //     const passwordInput = document.querySelector('input[type="password"]');

    //     // Simulate valid input
    //     emailInput.value = 'test@stud.noroff.no';
    //     passwordInput.value = 'validpassword';
    //     emailInput.dispatchEvent(new Event('input'));
    //     passwordInput.dispatchEvent(new Event('input'));

    //     // Check that the login button is enabled
    //     expect(loginButton.disabled).toBe(false);
    //     expect(loginButton.classList.contains('opacity-50')).toBe(false);
    //     expect(loginButton.classList.contains('cursor-not-allowed')).toBe(false);
    // });

    it('should keep the login button disabled if there are validation errors', () => {
        initializeLoginForm();

        const loginButton = document.getElementById('loginButton');
        const emailInput = document.querySelector('input[type="email"]');
        const passwordInput = document.querySelector('input[type="password"]');

        // Simulate invalid email input
        emailInput.value = 'invalid-email';
        emailInput.dispatchEvent(new Event('input'));

        const emailError = document.querySelector('.text-red-500');
        emailError.textContent = 'Invalid email';

        // Simulate valid password input
        passwordInput.value = 'validpassword';
        passwordInput.dispatchEvent(new Event('input'));

        // Check that the login button is still disabled
        expect(loginButton.disabled).toBe(true);
        expect(loginButton.classList.contains('opacity-50')).toBe(true);
        expect(loginButton.classList.contains('cursor-not-allowed')).toBe(true);
    });

    // it('should call handleLoginButtonClick when login button is clicked and form is valid', () => {
    //     initializeLoginForm();

    //     const loginButton = document.querySelector('button');
    //     const emailInput = document.querySelector('input[type="email"]');
    //     const passwordInput = document.querySelector('input[type="password"]');

    //     // Simulate valid input
    //     emailInput.value = 'test@stud.noroff.no';
    //     passwordInput.value = 'validpassword';
    //     emailInput.dispatchEvent(new Event('input'));
    //     passwordInput.dispatchEvent(new Event('input'));

    //     // Simulate button click
    //     loginButton.click();

    //     // Check that the login handler was called
    //     expect(handleLoginButtonClick).toHaveBeenCalledWith(
    //         expect.any(HTMLElement),
    //         expect.any(HTMLElement)
    //     );
    // });
});
