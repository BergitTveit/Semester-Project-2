import { getAuctionListings } from './getAuctionListings.mjs';
import { displayAuctionListings } from '../../components/auctionDisplay.mjs';

export async function loadAndDisplayAuctionListings() {
    try {
        const listings = await getAuctionListings();
        displayAuctionListings(listings);
    } catch (error) {
        console.error('Error loading auction listings:', error);
        const container = document.getElementById('auction-listings-container');
        if (container) {
            container.innerHTML = `<p class="text-red-500">Failed to load auction listings. Please try again later.</p>`;
        }
    }
}
