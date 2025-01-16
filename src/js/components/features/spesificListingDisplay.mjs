import { initializeBidForm } from '../forms/addBidForm.mjs';

export function displaySpecificListing(response) {
    if (!response?.data) return;
    const listing = response.data;

    const container = document.getElementById('listingContainer');
    if (!container) return;

    container.innerHTML = '';

    const spesificListingElement = document.createElement('div');
    spesificListingElement.classList.add(
        'listing',
        'border',
        'p-4',
        'rounded',
        'shadow',
        'mb-4',
        'bg-white',
        'w-full'
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
        spesificListingElement.appendChild(mediaContainer);
    }

    const titleElement = document.createElement('h1');
    titleElement.textContent = listing.title;
    titleElement.classList.add('text-2xl', 'font-bold', 'mb-2');

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = listing.description;
    descriptionElement.classList.add('text-gray-700', 'mb-2');

    const bidCountElement = document.createElement('p');
    bidCountElement.textContent = `Current Bids: ${listing._count?.bids || 0}`;
    bidCountElement.classList.add('text-gray-600', 'mb-2');

    const endDateElement = document.createElement('p');
    endDateElement.textContent = `End Date: ${new Date(listing.endsAt).toLocaleDateString()}`;
    endDateElement.classList.add('text-gray-600', 'mb-2');

    const bidForm = initializeBidForm(listing);

    spesificListingElement.appendChild(bidForm);
    spesificListingElement.appendChild(titleElement);
    spesificListingElement.appendChild(descriptionElement);
    spesificListingElement.appendChild(bidCountElement);
    spesificListingElement.appendChild(endDateElement);

    container.appendChild(spesificListingElement);
}
