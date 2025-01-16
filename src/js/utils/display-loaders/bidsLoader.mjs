import { getListingBids } from '../../api/auction/getlistings.mjs';
import { AuctionError } from '../errors/AuctionError.mjs';
import { clearError, displayError } from '../errors/displayError.mjs';
import { AuctionErrorTypes } from '../errors/errorTypes.mjs';
import { isLoggedIn } from '../storage/checkLoginStatus.mjs';
import { displayListingBids } from '../../components/features/bidsDisplay.mjs';

export async function loadListingBids(listingId) {
    const bidContainer = document.getElementById('bidContainer');
    if (!bidContainer) return;

    clearError(bidContainer);

    if (!isLoggedIn()) {
        bidContainer.innerHTML = `
            <div class="text-center p-4 bg-gray-50 rounded border">
                <p>Please log in to view bids on this listing</p>
            </div>`;
        return;
    }

    bidContainer.innerHTML = `<p class="text-blue-500">Loading bids...</p>`;

    try {
        const bidsData = await getListingBids(listingId);
        if (!bidsData) {
            throw new AuctionError(AuctionErrorTypes.REQUEST_FAILED, 404);
        }
        displayListingBids(bidsData);
    } catch (error) {
        if (error instanceof AuctionError) {
            if (error.type === AuctionErrorTypes.SESSION_EXPIRED) {
                bidContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}. Redirecting...</p>`;
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 3000);
            } else {
                displayError(error, bidContainer);
            }
        } else {
            displayError(
                new Error('An unexpected error occurred while loading bids.'),
                bidContainer
            );
        }
    }
}
