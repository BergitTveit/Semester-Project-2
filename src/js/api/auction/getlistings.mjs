import { API_BASE, API_AUCTION_LISTINGS } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function getAuctionListings() {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}`;

    try {
        const response = await fetch(url, {
            headers: headers(false, false),
        });
        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'Failed to fetch auction listings',
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
// add error class for api
export async function getSpecificListing(listingId) {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}/${listingId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers(false, false),
        });
        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'Failed to fetch listing details',
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
