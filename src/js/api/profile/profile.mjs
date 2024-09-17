import { getProfile } from './getProfile.mjs';
import { displayProfile } from '../../components/profileDisplay.mjs';
import { load } from '../../storage/load.mjs';

export async function loadAndDisplayProfile() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let profileName = urlParams.get('name');

        if (!profileName) {
            const storedProfile = load('profile');
            profileName = storedProfile ? storedProfile.name : null;
        }

        if (profileName) {
            const profileData = await getProfile(profileName);

            displayProfile(profileData);
        } else {
            throw new Error('Profile name is not provided');
        }
    } catch (error) {
        console.error('Error loading profile:', error);

        window.location.href = `/index.html`;
    }
}

document.addEventListener('DOMContentLoaded', loadAndDisplayProfile);
