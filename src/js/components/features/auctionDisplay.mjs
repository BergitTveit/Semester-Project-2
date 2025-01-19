import { handleShowMoreListings } from '../../utils/handlers/listing-handlers/showMoreHandler.mjs';
import { createButton } from '../common/buttons.mjs';
import { displayAuctionElement } from './listingElement.mjs';

export function displayAuctionListings(response) {
    if (!response?.data) return;
    const listingsData = response.data;

    const container = document.getElementById('auctionListingsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (listingsData.length === 0) {
        container.innerHTML = `
            <div class="text-center p-4">
                <p class="text-gray-500">No auction listings available at the moment.</p>
            </div>
        `;
        return;
    }

    const sortedListings = [...listingsData].sort(
        (a, b) => new Date(b.endsAt) - new Date(a.endsAt)
    );
    const listingsContainer = document.createElement('div');
    listingsContainer.classList.add(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4',
        '2xl:grid-cols-6',
        'gap-4',
        'p-4'
    );

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
