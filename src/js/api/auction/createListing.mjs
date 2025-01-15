import { API_AUCTION_LISTINGS, API_BASE } from '../client/endpoints.mjs';

import { apiRequest } from '../client/apiRequest.mjs';

export async function createListing(title, description, media, endsAt) {
    const url = `${API_BASE}${API_AUCTION_LISTINGS}`;
    const body = {
        title,
        endsAt,
        ...(description && { description }),
        ...(media && { media: [{ url: media, alt: title }] }),
    };

    return apiRequest(url, 'POST', body, true);
}
