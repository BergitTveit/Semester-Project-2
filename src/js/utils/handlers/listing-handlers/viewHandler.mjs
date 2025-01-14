export async function handleViewListingButtonClick(listingId) {
    if (!listingId) {
        console.error('No listing ID provided for bid');
        return;
    }

    try {
        window.location.href = `/pages/specific-listing/index.html?id=${listingId}`;
    } catch (error) {
        console.error('Error fetching specific listing:', error);
    }
}
