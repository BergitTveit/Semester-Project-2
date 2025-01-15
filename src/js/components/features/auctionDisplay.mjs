import { handleShowMoreListings } from '../../utils/handlers/listing-handlers/showMoreHandler.mjs';
import { createButton } from '../common/buttons.mjs';
import { displayAuctionElement } from './listingElement.mjs';

export function displayAuctionListings(response) {
    const listingsData = Array.isArray(response) ? response : response.data;
    const container = document.getElementById('auctionListingsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!listingsData || listingsData.length === 0) {
        return;
    }
    const sortedListings = [...listingsData].sort(
        (a, b) => new Date(b.endsAt) - new Date(a.endsAt)
    );
    const listingsContainer = document.createElement('div');
    listingsContainer.classList.add('space-y-4');

    let currentIndex = 0;
    sortedListings.slice(currentIndex, 12).forEach(listing => {
        listingsContainer.appendChild(displayAuctionElement(listing));
    });
    currentIndex = 12;

    container.appendChild(listingsContainer);

    if (sortedListings.length > 12) {
        const showMoreButton = createButton('Show More Listings', () => {
            currentIndex = handleShowMoreListings(
                listingsContainer,
                sortedListings,
                currentIndex,
                showMoreButton
            );
        });
        showMoreButton.classList.add('mt-4', 'w-full');
        container.appendChild(showMoreButton);
    }
}
