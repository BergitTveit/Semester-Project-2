import { API_AUCTION_LISTINGS, API_BASE } from '../../utils/constants.mjs';
import { headers } from '../../utils/headers.mjs';

export async function fetchListingsAccordingToSearch(searchText) {
    const postsEndpoint = `${API_BASE}${API_AUCTION_LISTINGS}/search?q=${encodeURIComponent(searchText)}`;

    try {
        const response = await fetch(postsEndpoint, {
            headers: headers(false, false),
        });

        if (response.ok) {
            const listingsData = await response.json();

            return listingsData.data;
        } else {
            console.error('Failed to fetch posts:', response.statusText);
            throw new Error('Failed to fetch posts');
        }
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        throw error;
    }
}
