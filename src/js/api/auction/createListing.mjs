import { API_AUCTION_LISTINGS, API_BASE } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function createListing(title, description, media, endsAt) {
    try {
        const url = `${API_BASE}${API_AUCTION_LISTINGS}`;
        const body = {
            title,
            endsAt,
            ...(description && { description }),
            ...(media && { media: [{ url: media, alt: title }] }),
        };

        const requestOptions = {
            headers: headers(true, true),
            method: 'POST',
            body: JSON.stringify(body),
        };

        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: responseData.message || 'Failed to create auction listing',
                errors: responseData.errors || [],
            };
        }
        return responseData;
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
