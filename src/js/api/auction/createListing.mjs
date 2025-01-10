import { API_BASE, API_LISTINGS } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function createListing(title, deadline, media, description) {
    try {
        const url = `${API_BASE}${API_LISTINGS}`;
        const requestOptions = {
            headers: headers(true, true),
            method: 'POST',
            body: JSON.stringify({ title, deadline, media, description }),
        };

        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: responseData.message || 'Failed to create listing',
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
