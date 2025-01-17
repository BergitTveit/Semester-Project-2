import { loadAndDisplaySearchResults } from '../../display-loaders/searchResultLoader.mjs';
import { AuctionError } from '../../errors/AuctionError.mjs';
import { clearError, displayError } from '../../errors/displayError.mjs';
import { AuctionErrorTypes } from '../../errors/errorTypes.mjs';

export async function handleSearch(event) {
    event.preventDefault();

    const searchForm = event.target;
    const searchInput = searchForm.querySelector('input');
    const errorContainer = document.getElementById('searchErrorContainer');

    if (!searchInput || !errorContainer) {
        throw new AuctionError(AuctionErrorTypes.MISSING_REQUIRED_FIELDS, 400);
    }

    clearError(errorContainer);

    try {
        const searchText = searchInput.value.trim();

        if (!searchText && event.type === 'submit') {
            throw new AuctionError(AuctionErrorTypes.SEARCH_EMPTY, 400);
        }

        if (!searchText) return;

        await loadAndDisplaySearchResults(searchText);
    } catch (error) {
        if (error instanceof AuctionError) {
            displayError(error, errorContainer);
        } else {
            displayError(new Error('Failed to perform search. Please try again.'), errorContainer);
        }
    }
}
