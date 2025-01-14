import { displayAuctionElement } from '../../../components/features/listingElement.mjs';

export function handleShowMoreListings(
    listingsContainer,
    sortedListings,
    currentIndex,
    showMoreButton
) {
    const nextIndex = currentIndex + 12;
    const nextListings = sortedListings.slice(currentIndex, nextIndex);

    nextListings.forEach(listing => {
        listingsContainer.appendChild(displayAuctionElement(listing));
    });

    if (nextIndex >= sortedListings.length) {
        showMoreButton.style.display = 'none';
    }

    return nextIndex;
}
