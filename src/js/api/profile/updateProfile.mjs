import { API_BASE, API_SOCIAL } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function updateProfile(profileData) {
    if (!profileData.bio && !profileData.banner && !profileData.avatar) {
        throw new Error('At least one property (bio, banner, or avatar) must be provided.');
    }

    const url = `${API_BASE + API_SOCIAL}${profileData.name}`;
    console.log('Updating profile at URL:', url);

    try {
        const resolvedHeaders = await headers(true, true);

        const response = await fetch(url, {
            method: 'PUT',
            headers: resolvedHeaders,
            body: JSON.stringify(profileData),
        });

        if (response.ok) {
            const updatedProfileData = await response.json();
            console.log('Updated profile data:', updatedProfileData);
            return updatedProfileData;
        } else {
            throw new Error('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}
