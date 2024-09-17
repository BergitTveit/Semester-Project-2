import { API_BASE, API_SOCIAL } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function getProfile(name) {
    const url = `${API_BASE + API_SOCIAL}${name}`;

    try {
        const resolvedHeaders = await headers(false, true);
        const response = await fetch(url, {
            headers: resolvedHeaders,
        });

        if (response.ok) {
            const profileData = await response.json();

            return profileData;
        } else {
            throw new Error('Failed to fetch user profile');
        }
    } catch (error) {
        await alert('Failed to fetch user profile');

        throw error;
    }
}
