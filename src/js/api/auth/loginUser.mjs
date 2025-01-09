import { save } from '../../utils/storage/save.mjs';
import { API_AUTH, API_BASE, API_LOGIN } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function loginUser(email, password) {
    try {
        const url = `${API_BASE}${API_AUTH}${API_LOGIN}`;
        const requestOptions = {
            headers: headers(true, true),
            method: 'POST',
            body: JSON.stringify({ email, password }),
        };

        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: responseData.message || 'Login failed',
                errors: responseData.errors || [],
            };
        }

        const { accessToken, ...userProfile } = responseData.data;
        save('token', accessToken);
        save('profile', userProfile);

        return userProfile;
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
