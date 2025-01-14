import { createButton } from '../common/buttons.mjs';
import { displayBidElement } from './bidElement.mjs';
import { handleShowAllBids } from '../../utils/handlers/listing-handlers/showBidsHandler.mjs';
import { isLoggedIn } from '../../utils/storage/checkLoginStatus.mjs';

export function displayListingBids(response) {
    const bids = response.data;
    const containerElement = document.getElementById('bidContainer');
    if (!containerElement) return;

    if (!isLoggedIn()) {
        const loginMessage = document.createElement('div');
        loginMessage.classList.add('text-center', 'p-4', 'bg-gray-50', 'rounded', 'border');
        loginMessage.textContent = 'Please log in to view bids on this listing';
        containerElement.appendChild(loginMessage);
        return;
    }

    const bidsSection = document.createElement('div');
    bidsSection.classList.add('border', 'p-4', 'rounded', 'shadow', 'mb-4', 'bg-white', 'w-full');

    const bidsTitle = document.createElement('h2');
    bidsTitle.textContent = 'Bid History';
    bidsTitle.classList.add('text-2xl', 'font-bold', 'mb-4');
    bidsSection.appendChild(bidsTitle);

    if (!bids?.length) {
        const noBidsMessage = document.createElement('p');
        noBidsMessage.textContent = 'No bids yet on this listing';
        noBidsMessage.classList.add('text-gray-600', 'italic', 'p-4');
        bidsSection.appendChild(noBidsMessage);
        containerElement.appendChild(bidsSection);
        return;
    }

    const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);
    const bidsList = document.createElement('div');
    bidsList.classList.add('space-y-3');

    sortedBids.slice(0, 3).forEach(bid => {
        bidsList.appendChild(displayBidElement(bid));
    });

    bidsSection.appendChild(bidsList);

    if (sortedBids.length > 3) {
        let showingAll = false;
        const showMoreButton = createButton('Show All Bids', event => {
            showingAll = handleShowAllBids(event, bidsList, sortedBids, showingAll);
        });
        showMoreButton.classList.add('mt-4', 'w-full');
        bidsSection.appendChild(showMoreButton);
    }

    containerElement.appendChild(bidsSection);
}
