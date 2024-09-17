import { API_BASE, API_AUCTION_LISTINGS } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function getAuctionListings() {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}`;
    try {
        const resolvedHeaders = headers(false, false);

        const response = await fetch(url, {
            headers: resolvedHeaders,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch auction listings');
        }

        const data = await response.json();
        console.log('Auction Listings:', data);

        return data;
    } catch (error) {
        console.error('Error fetching auction listings:', error);
        throw error;
    }
}
