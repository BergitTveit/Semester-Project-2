import { API_AUCTION_LISTINGS, API_BASE } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function createBid(listingId, amount) {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}/${listingId}/bids`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers(true, true),
            body: JSON.stringify({ amount: Number(amount) }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'Failed to place bid',
                errors: data.errors || [],
            };
        }

        return data;
    } catch (error) {
        if (error instanceof TypeError) {
            throw {
                status: 0,
                message: 'Network error - please check your connection',
                errors: [],
            };
        }
        throw error;
    }
}
