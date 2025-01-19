import { createButton } from '../common/buttons.mjs';
import { handleViewListingButtonClick } from '../../utils/handlers/listing-handlers/viewHandler.mjs';
import { createImagePlaceholder } from '../common/imageplaceholder.mjs';

export function displayAuctionElement(listing) {
    if (!listing) return null;

    const listingElement = document.createElement('div');
    listingElement.classList.add('auction-listing', 'p-4', 'rounded', 'shadow', 'mb-4', 'bg-white');

    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('mb-4', 'aspect-video', 'overflow-hidden', 'rounded');

    if (listing.media && listing.media.length > 0) {
        const image = document.createElement('img');
        image.classList.add('w-full', 'h-full', 'object-cover', 'opacity-0'); // Added opacity-0

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
            mediaContainer.appendChild(createImagePlaceholder());
        };

        image.src = listing.media[0].url;
        image.alt = listing.media[0].alt || listing.title || 'Auction listing image';
        mediaContainer.appendChild(image);
    } else {
        mediaContainer.appendChild(createImagePlaceholder());
    }
    listingElement.appendChild(mediaContainer);

    const titleElement = document.createElement('h2');
    titleElement.textContent = listing.title;
    titleElement.classList.add('text-xl', 'font-bold', 'mb-2');

    const descriptionElement = document.createElement('p');

    descriptionElement.textContent = listing.description
        ? `${listing.description.slice(0, 50)}${listing.description.length > 100 ? '...' : ''}`
        : 'No description available';

    descriptionElement.classList.add('text-gray-700', 'mb-2');

    const startingPriceElement = document.createElement('p');
    startingPriceElement.textContent = `Bidders interested: ${listing._count?.bids}`;
    startingPriceElement.classList.add('text-gray-600', 'mb-2');

    const endDateElement = document.createElement('p');
    endDateElement.textContent = `End Date: ${new Date(listing.endsAt).toLocaleDateString()}`;
    endDateElement.classList.add('text-gray-600', 'mb-2');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'justify-end');

    const viewListingButton = createButton(
        'Place bid',
        () => handleViewListingButtonClick(listing.id),
        'button'
    );
    viewListingButton.classList.add('uppercase', 'font-bold', 'tracking-widest');
    buttonContainer.appendChild(viewListingButton);
    listingElement.append(
        titleElement,
        descriptionElement,
        startingPriceElement,
        endDateElement,
        buttonContainer
    );

    return listingElement;
}
