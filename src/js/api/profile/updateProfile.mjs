import { API_BASE, API_SOCIAL } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function updateProfile(profileData) {
    const { name, ...updateData } = profileData;

    if (
        !updateData.bio &&
        !updateData.banner &&
        !updateData.avatar &&
        updateData.credits === undefined
    ) {
        throw {
            status: 400,
            message: 'At least one property (bio, banner, avatar, or credits) must be provided.',
            errors: [],
        };
    }

    const url = `${API_BASE}${API_SOCIAL}${name}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers(true, true),
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                message: `Failed to update profile: ${errorData.message || 'Unknown error'}`,
                errors: errorData.errors || [],
            };
        }

        const updatedProfileData = await response.json();
        return updatedProfileData;
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
// add class for api and other for validatioin,and for network fault
