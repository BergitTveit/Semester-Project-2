import { API_AUTH, API_BASE, API_REGISTER } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function registerNewUser(name, email, password) {
    try {
        const url = `${API_BASE}${API_AUTH}${API_REGISTER}`;
        const requestOptions = {
            headers: headers(true, true),
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        };

        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: responseData.message || 'Registration failed',
                errors: responseData.errors || [],
            };
        }

        return responseData;
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
