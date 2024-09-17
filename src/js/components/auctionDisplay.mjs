export function displayAuctionListings(response) {
    const container = document.getElementById('auction-listings-container');
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

        const titleElement = document.createElement('h2');
        titleElement.textContent = listing.title;
        titleElement.classList.add('text-xl', 'font-bold', 'mb-2');

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = listing.description;
        descriptionElement.classList.add('text-gray-700', 'mb-2');

        const startingPriceElement = document.createElement('p');
        startingPriceElement.textContent = `Starting Price: ${listing.startingPrice}`;
        startingPriceElement.classList.add('text-gray-600', 'mb-2');

        const endDateElement = document.createElement('p');
        endDateElement.textContent = `End Date: ${new Date(listing.endDate).toLocaleDateString()}`;
        endDateElement.classList.add('text-gray-600', 'mb-2');

        listingElement.appendChild(titleElement);
        listingElement.appendChild(descriptionElement);
        listingElement.appendChild(startingPriceElement);
        listingElement.appendChild(endDateElement);

        container.appendChild(listingElement);
    });
}
