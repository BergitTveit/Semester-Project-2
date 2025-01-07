import { getProfile } from './get.mjs';
import { displayProfile } from '../../components/profileDisplay.mjs';
import { load } from '../../utils/storage/load.mjs';

export async function loadAndDisplayProfile() {
    const container = document.getElementById('profile-container');
    if (!container) return;
    // check loader and order syntax
    container.innerHTML = `<p class="text-blue-500">Create LOADER for loading auction list-....</p>`;
    try {
        const profileName =
            load('profile')?.name || new URLSearchParams(window.location.search).get('name');

        if (!profileName) throw new Error('Profile name is not provided');

        const profileData = await getProfile(profileName);

        displayProfile(profileData);
    } catch (error) {
        console.error('Error loading profile:', error);
        window.location.href = `/index.html`;
    }
}

document.addEventListener('DOMContentLoaded', loadAndDisplayProfile);
// add consistent error handling for UI
