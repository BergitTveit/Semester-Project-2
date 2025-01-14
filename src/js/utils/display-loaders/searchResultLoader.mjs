import { getListingsAccordingToSearch } from '../../api/auction/getlistings.mjs';
import { displayAuctionListings } from '../../components/features/auctionDisplay.mjs';

export async function loadAndDisplaySearchResults(searchText) {
    try {
        const searchResults = await getListingsAccordingToSearch(searchText);
        displayAuctionListings({ data: searchResults });
    } catch (error) {
        console.error('Search failed:', error);
    }
}
