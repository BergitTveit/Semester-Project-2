import { API_AUTH, API_BASE, API_REGISTER } from '../../utils/constants.mjs';

export async function registerNewUser(name, email, password) {
    try {
        const response = await fetch(API_BASE + API_AUTH + API_REGISTER, {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            return await response.json();
        }

        throw new Error('Could not register the account');
    } catch (error) {
        console.error('Registration failed:', error.message);
        throw error;
    }
}
