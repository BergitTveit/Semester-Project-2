import { API_BASE, API_PROFILE } from '../client/endpoints.mjs';
import { apiRequest } from '../client/apiRequest.mjs';

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

    const url = `${API_BASE}${API_PROFILE}${name}`;

    return apiRequest(url, 'PUT', updateData, true);
}
