import { getListingsAccordingToSearch } from '../../api/auction/getlistings.mjs';
import { displayAuctionListings } from '../../components/features/auctionDisplay.mjs';
import { AuctionError } from '../errors/AuctionError.mjs';
import { clearError, displayError } from '../errors/displayError.mjs';
import { AuctionErrorTypes } from '../errors/errorTypes.mjs';

export async function loadAndDisplaySearchResults(searchText) {
    const container = document.getElementById('auctionListingsContainer');
    if (!container) return;

    clearError(container);
    container.innerHTML = `<p class="text-blue-500">Searching for results...</p>`;

    try {
        const searchResults = await getListingsAccordingToSearch(searchText);

        if (!searchResults) {
            throw new AuctionError(AuctionErrorTypes.REQUEST_FAILED, 404);
        }

        if (searchResults.length === 0) {
            container.innerHTML = `
                <div class="text-gray-600">
                    <p>No listings found matching "${searchText}"</p>
                    <p>Try adjusting your search terms or <a href="/index.html" class="text-blue-500">return to home</a></p>
                </div>`;
            return;
        }
        displayAuctionListings({ data: searchResults });
    } catch (error) {
        if (error instanceof AuctionError) {
            if (error.type === AuctionErrorTypes.SESSION_EXPIRED) {
                container.innerHTML = `<p class="text-red-500">Session expired. Redirecting...</p>`;
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
