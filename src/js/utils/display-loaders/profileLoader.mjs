import { getProfile } from '../../api/profile/getProfile.mjs';
import { displayProfile } from '../../components/features/profileDisplay.mjs';
import { load } from '../storage/load.mjs';
import { clearError, displayError } from '../errors/displayError.mjs';
import { AuctionError } from '../errors/AuctionError.mjs';
import { AuctionErrorTypes } from '../errors/errorTypes.mjs';

export async function loadAndDisplayProfile() {
    const container = document.getElementById('profileContainer');
    if (!container) return;

    clearError(container);
    container.innerHTML = `<p class="text-blue-500">Loading profile...</p>`;

    try {
        const userName =
            load('profile')?.name || new URLSearchParams(window.location.search).get('name');

        if (!userName) {
            throw new AuctionError(AuctionErrorTypes.PROFILE_NOT_FOUND, 404);
        }

        const profileResult = await getProfile(userName);
        if (!profileResult) {
            throw new AuctionError(AuctionErrorTypes.PROFILE_NOT_FOUND, 404);
        }
        displayProfile(profileResult);
    } catch (error) {
        if (error instanceof AuctionError) {
            if (
                error.type === AuctionErrorTypes.PROFILE_NOT_FOUND ||
                error.type === AuctionErrorTypes.SESSION_EXPIRED
            ) {
                container.innerHTML = `<p class="text-red-500">Error: ${error.message}. Redirecting...</p>`;
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 3000);
            } else {
                displayError(error, container);
            }
        } else {
            displayError(
                new Error('An unexpected error occurred while searching. Please try again later.'),
                container
            );
        }
    }
}
