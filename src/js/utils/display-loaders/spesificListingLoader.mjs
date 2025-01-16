import { getSpecificListing } from '../../api/auction/getlistings.mjs';
import { displaySpecificListing } from '../../components/features/spesificListingDisplay.mjs';
import { AuctionError } from '../errors/AuctionError.mjs';
import { clearError, displayError } from '../errors/displayError.mjs';
import { AuctionErrorTypes } from '../errors/errorTypes.mjs';
import { loadListingBids } from './bidsLoader.mjs';

export async function loadSpecificListing() {
    const container = document.getElementById('listingContainer');
    if (!container) return;

    clearError(container);
    container.innerHTML = `<p class="text-blue-500">Loading listing...</p>`;

    try {
        const listingId = new URLSearchParams(window.location.search).get('id');
        if (!listingId) {
            throw new AuctionError(AuctionErrorTypes.LISTING_NOT_FOUND, 404);
        }

        const listingData = await getSpecificListing(listingId);
        displaySpecificListing(listingData);

        await loadListingBids(listingId);
    } catch (error) {
        if (error instanceof AuctionError) {
            if (
                error.type === AuctionErrorTypes.SESSION_EXPIRED ||
                error.type === AuctionErrorTypes.LISTING_NOT_FOUND
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
                new Error('An unexpected error occurred while loading the listing.'),
                container
            );
        }
    }
}
