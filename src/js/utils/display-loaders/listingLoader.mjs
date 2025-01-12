import { getAuctionListings } from '../../api/auction/getlistings.mjs';
import { displayAuctionListings } from '../../components/features/auctionDisplay.mjs';

export async function loadAndDisplayAuctionListings() {
    const container = document.getElementById('auctionListingsContainer');
    if (!container) return;
    container.innerHTML = `<p class="text-blue-500">Create LOADER for loading auction list-....</p>`;

    try {
        const listings = await getAuctionListings();
        displayAuctionListings(listings);
    } catch (error) {
        console.error('Error loading auction listings:', error);
        container.innerHTML = `
            <p class="text-red-500">Failed to load auction listings. Please try again later or contact support.</p>
        `;
    }
}
// add consistent error handling for UI
