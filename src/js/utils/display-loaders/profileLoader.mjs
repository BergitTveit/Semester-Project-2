import { getProfile } from '../../api/profile/getProfile.mjs';
import { displayProfile } from '../../components/features/profileDisplay.mjs';
import { load } from '../storage/load.mjs';

export async function loadAndDisplayProfile() {
    const container = document.getElementById('profile-container');
    if (!container) return;

    container.innerHTML = `<p class="text-blue-500">Create LOADER for loading auction list-....</p>`;
    try {
        const userName =
            load('profile')?.name || new URLSearchParams(window.location.search).get('name');

        if (!userName) throw new Error('Profile name is not provided');

        const profileResult = await getProfile(userName);

        displayProfile(profileResult);
    } catch (error) {
        console.error('Error loading profile:', error);
        window.location.href = `/index.html`;
    }
}

document.addEventListener('DOMContentLoaded', loadAndDisplayProfile);
