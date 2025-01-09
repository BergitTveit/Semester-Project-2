import { API_BASE, API_PROFILE } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function getProfile(userName) {
    try {
        const url = `${API_BASE}${API_PROFILE}${userName}`;
        const requestOptions = { headers: headers(false, true) };

        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: responseData.message || 'Failed to fetch profile data',
                errors: responseData.errors || [],
            };
        }

        return responseData.data;
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
