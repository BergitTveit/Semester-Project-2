import { API_AUCTION_LISTINGS, API_BASE } from '../client/endpoints.mjs';
import { apiRequest } from '../client/apiRequest.mjs';

export async function getAuctionListings() {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}`;
    return apiRequest(url, 'GET', null, false);
}

export async function getSpecificListing(listingId) {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}/${listingId}?_seller=true&_bids=true`;
    return apiRequest(url, 'GET', null, false);
}
export async function getListingBids(listingId) {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}/${listingId}?_bids=true`; // Add _bids=true to get bids
    const data = await apiRequest(url, 'GET', null, true);
    return {
        data: data.data.bids || [],
    };
}

export async function getListingsAccordingToSearch(searchText) {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}/search?q=${encodeURIComponent(searchText)}`;
    const data = await apiRequest(url, 'GET', null, false);
    return data.data;
}
