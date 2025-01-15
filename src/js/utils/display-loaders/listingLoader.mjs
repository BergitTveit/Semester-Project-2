import { getAuctionListings } from '../../api/auction/getlistings.mjs';
import { displayAuctionListings } from '../../components/features/auctionDisplay.mjs';
import { AuctionError } from '../errors/AuctionError.mjs';
import { clearError, displayError } from '../errors/displayError.mjs';
import { AuctionErrorMessages } from '../errors/errorMessages.mjs';
import { AuctionErrorTypes } from '../errors/errorTypes.mjs';

export async function loadAndDisplayAuctionListings() {
    const container = document.getElementById('auctionListingsContainer');
    if (!container) return;

    clearError(container);
    container.innerHTML = `<p class="text-blue-500">Create LOADER for loading auction list-....</p>`;

    try {
        const listings = await getAuctionListings();

        if (!listings) {
            throw new AuctionError(AuctionErrorTypes.LISTING_NOT_FOUND, 404);
        }
        displayAuctionListings(listings);
    } catch (error) {
        if (error instanceof AuctionError) {
            const errorMessage =
                AuctionErrorMessages[error.type] || 'An unexpected error occurred.';

            if (error.type === AuctionErrorTypes.SESSION_EXPIRED) {
                container.innerHTML = `<p class="text-red-500">${errorMessage} Redirecting...</p>`;
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 3000);
            } else {
                displayError(error, container);
            }
        } else {
            displayError(
                new Error('An unexpected error occurred. Please try again later.'),
                container
            );
        }
    }
}
