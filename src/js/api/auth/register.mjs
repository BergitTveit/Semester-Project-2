import { API_AUTH, API_BASE, API_REGISTER } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function registerNewUser(name, email, password) {
    try {
        const response = await fetch(API_BASE + API_AUTH + API_REGISTER, {
            headers: headers(true, true),
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'Registration failed',
                errors: data.errors || [],
            };
        }

        return data;
    } catch (error) {
        if (error instanceof TypeError) {
            throw {
                status: 0,
                message: 'Network error - please check your connection',
                errors: [],
            };
        }

        throw error;
    }
}
// add error class for api
