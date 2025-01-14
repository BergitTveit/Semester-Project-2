import { getListingsAccordingToSearch } from '../../../api/auction/getlistings.mjs';
import { displayAuctionListings } from '../../../components/features/auctionDisplay.mjs';

export async function handleSearch(event) {
    event.preventDefault();
    const searchInput = event.target.querySelector('input');
    const searchText = searchInput.value.trim();

    try {
        const searchResults = await getListingsAccordingToSearch(searchText);
        displayAuctionListings({ data: searchResults });
    } catch (error) {
        console.error('Search failed:', error);
    }
}
