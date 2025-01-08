import { API_BASE, API_PROFILE } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function getProfile(name) {
    const url = `${API_BASE + API_PROFILE}${name}`;

    try {
        const response = await fetch(url, {
            headers: headers(false, true),
        });

        if (!response.ok) {
            const data = await response.json();
            throw {
                status: response.status,
                message: data.message || 'Failed to fetch profile data',
                errors: data.errors || [],
            };
        }

        const profileData = await response.json();
        return profileData;
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
