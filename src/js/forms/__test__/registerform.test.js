import { jest } from '@jest/globals';

// Mock the modules
jest.mock('../../components/buttons.mjs', () => ({
    createButton: jest.fn(),
}));

jest.mock('../../components/forminputs.mjs', () => ({
    createNameInput: jest.fn(),
    createEmailInput: jest.fn(),
    createPasswordInput: jest.fn(),
}));

// Import the function to test and the mocked modules
import { initializeRegisterForm } from '../registerform.mjs';
import { createButton } from '../../components/buttons.mjs';
import {
    createNameInput,
    createEmailInput,
    createPasswordInput,
} from '../../components/forminputs.mjs';

describe('initializeRegisterForm', () => {
    beforeEach(() => {
        document.body.innerHTML = `<form id="registerForm"></form>`;
        jest.clearAllMocks();

        // Mock implementations
        createButton.mockImplementation((text, handler) => {
            const button = document.createElement('button');
            button.textContent = text;
            button.addEventListener('click', handler);
            return button;
        });

        createNameInput.mockImplementation(() => {
            const nameDiv = document.createElement('div');
            const input = document.createElement('input');
            input.value = '';
            const errorSpan = document.createElement('span');
            errorSpan.className = 'text-red-500';
            nameDiv.appendChild(input);
            nameDiv.appendChild(errorSpan);
            return nameDiv;
        });

        createEmailInput.mockImplementation(() => {
            const emailDiv = document.createElement('div');
            const input = document.createElement('input');
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
            input.value = '';
            const errorSpan = document.createElement('span');
            errorSpan.className = 'text-red-500';
            passwordDiv.appendChild(input);
            passwordDiv.appendChild(errorSpan);
            return passwordDiv;
        });
    });

    it('should initialize the register button as disabled', () => {
        initializeRegisterForm();

        const registerButton = document.getElementById('registerButton');
        expect(registerButton).not.toBeNull();
        expect(registerButton.textContent).toBe('Register');
        expect(registerButton.disabled).toBe(true);
        expect(registerButton.classList.contains('opacity-50')).toBe(true);
        expect(registerButton.classList.contains('cursor-not-allowed')).toBe(true);

        expect(createButton).toHaveBeenCalledWith('Register', expect.any(Function));
        expect(createNameInput).toHaveBeenCalled();
        expect(createEmailInput).toHaveBeenCalled();
        expect(createPasswordInput).toHaveBeenCalled();
    });
});
