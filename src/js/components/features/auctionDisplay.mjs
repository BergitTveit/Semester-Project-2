import { handleShowMoreListings } from '../../utils/handlers/listing-handlers/showMoreHandler.mjs';
import { createButton } from '../common/buttons.mjs';
import { displayAuctionElement } from './listingElement.mjs';

export function displayAuctionListings(response) {
    const listings = response.data;
    const container = document.getElementById('auctionListingsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (!listings?.length) {
        const noListingsMessage = document.createElement('p');
        noListingsMessage.textContent = 'No listings available';
        noListingsMessage.classList.add('text-gray-600', 'italic', 'p-4', 'text-center');
        container.appendChild(noListingsMessage);
        return;
    }

    const sortedListings = [...listings].sort((a, b) => new Date(b.created) - new Date(a.created));

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
