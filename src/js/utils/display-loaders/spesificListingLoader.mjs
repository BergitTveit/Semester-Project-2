import { getListingBids, getSpecificListing } from '../../api/auction/getlistings.mjs';
import { displayListingBids } from '../../components/features/bidsDisplay.mjs';
import { displaySpecificListing } from '../../components/features/spesificListingDisplay.mjs';

export async function loadSpecificListing() {
    const container = document.getElementById('listingContainer');
    if (!container) return;

    container.innerHTML = `<p class="text-blue-500">Loading listing...</p>`;

    try {
        const listingId = new URLSearchParams(window.location.search).get('id');
        if (!listingId) throw new Error('Listing ID is not provided');

        const listingData = await getSpecificListing(listingId);
        displaySpecificListing(listingData);

        const bidsData = await getListingBids(listingId);
        displayListingBids(bidsData);
    } catch (error) {
        console.error('Error loading listing:', error);
        container.innerHTML = `<p class="text-red-500">Failed to load listing. Redirecting...</p>`;
    }
}
