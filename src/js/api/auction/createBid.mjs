import { apiRequest } from '../client/apiRequest.mjs';
import { API_AUCTION_LISTINGS, API_BASE } from '../client/endpoints.mjs';

export async function createBid(listingId, amount) {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}/${listingId}/bids`;
    return apiRequest(url, 'POST', { amount: Number(amount) }, true);
}
