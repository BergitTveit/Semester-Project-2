import { handleApiError } from '../../utils/errors/errorHandlers.mjs';
import { headers } from '../../utils/headers.mjs';

export async function apiRequest(url, method = 'GET', body = null, needsAuth = false) {
    const options = {
        method,
        headers: headers(!!body, needsAuth),
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'An error occurred',
                errors: data.errors || [],
            };
        }

        return data;
    } catch (error) {
        throw handleApiError(error);
    }
}
