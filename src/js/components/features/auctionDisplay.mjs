import { handleViewListingButtonClick } from '../../utils/handlers/listing-handlers/viewHandler.mjs';
import { createButton } from '../common/buttons.mjs';

export function displayAuctionListings(response) {
    const container = document.getElementById('auctionListingsContainer');
    container.innerHTML = '';

    const listings = response.data;

    listings.forEach(listing => {
        const listingElement = document.createElement('div');
        listingElement.classList.add(
            'auction-listing',
            'border',
            'p-4',
            'rounded',
            'shadow',
            'mb-4',
            'bg-white'
        );

        if (listing.media && listing.media.length > 0) {
            const mediaContainer = document.createElement('div');
            mediaContainer.classList.add('mb-4', 'aspect-video', 'overflow-hidden', 'rounded');

            const image = document.createElement('img');
            image.classList.add('w-full', 'h-full', 'object-cover');

            const loadingPlaceholder = document.createElement('div');
            loadingPlaceholder.classList.add('w-full', 'h-full', 'bg-gray-200', 'animate-pulse');
            mediaContainer.appendChild(loadingPlaceholder);

            image.onload = () => {
                loadingPlaceholder.remove();
                image.classList.remove('opacity-0');
                image.classList.add('opacity-100');
            };

            image.onerror = () => {
                loadingPlaceholder.remove();
                image.classList.add('hidden');
                const errorContainer = document.createElement('div');
                errorContainer.classList.add(
                    'w-full',
                    'h-full',
                    'bg-gray-100',
                    'flex',
                    'items-center',
                    'justify-center',
                    'text-gray-400'
                );
                errorContainer.textContent = 'Image unavailable';
                mediaContainer.appendChild(errorContainer);
            };

            image.src = listing.media[0].url;
            image.alt = listing.media[0].alt || listing.title;
            mediaContainer.appendChild(image);
            listingElement.appendChild(mediaContainer);
        }

        const titleElement = document.createElement('h2');
        titleElement.textContent = listing.title;
        titleElement.classList.add('text-xl', 'font-bold', 'mb-2');

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = listing.description;
        descriptionElement.classList.add('text-gray-700', 'mb-2');

        const startingPriceElement = document.createElement('p');
        startingPriceElement.textContent = `Last Bid: ${listing._count?.bids}`;
        startingPriceElement.classList.add('text-gray-600', 'mb-2');

        const endDateElement = document.createElement('p');
        endDateElement.textContent = `End Date: ${new Date(listing.endsAt).toLocaleDateString()}`;
        endDateElement.classList.add('text-gray-600', 'mb-2');

        const viewListingButton = createButton(
            'View',
            () => handleViewListingButtonClick(listing.id),
            'button'
        );

        listingElement.appendChild(titleElement);
        listingElement.appendChild(descriptionElement);
        listingElement.appendChild(startingPriceElement);
        listingElement.appendChild(endDateElement);
        listingElement.appendChild(viewListingButton);
        container.appendChild(listingElement);
    });
}
