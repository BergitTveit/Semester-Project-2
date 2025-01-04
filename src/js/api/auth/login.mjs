import { save } from '../../storage/save.mjs';
import { API_AUTH, API_BASE, API_LOGIN } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

headers;
export async function loginUser(email, password) {
    try {
        const response = await fetch(API_BASE + API_AUTH + API_LOGIN, {
            headers: headers(true, true),
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            throw {
                status: response.status,
                message: data.message || 'Login failed',
                errors: data.errors || [],
            };
        }

        const { accessToken, ...profile } = (await response.json()).data;

        save('token', accessToken);
        save('profile', profile);

        return profile;
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
