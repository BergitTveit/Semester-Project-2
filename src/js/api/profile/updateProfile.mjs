import { API_BASE, API_SOCIAL } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function updateProfile(profileData) {
    const { name, ...updateData } = profileData;

    if (!updateData.bio && !updateData.banner && !updateData.avatar) {
        throw new Error('At least one property (bio, banner, or avatar) must be provided.');
    }

    const url = `${API_BASE}${API_SOCIAL}${name}`;
    console.log('Updating profile at URL:', url);

    try {
        const resolvedHeaders = await headers(true, true);
        const response = await fetch(url, {
            method: 'PUT',
            headers: resolvedHeaders,
            body: JSON.stringify(updateData),
        });

        if (response.ok) {
            const updatedProfileData = await response.json();
            console.log('Updated profile data:', updatedProfileData);
            return updatedProfileData;
        } else {
            const errorData = await response.json();
            throw new Error(`Failed to update profile: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}
