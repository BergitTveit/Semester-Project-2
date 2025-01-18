import { initializeCreateListingForm } from '/src/js/components/forms/createListingForm.mjs';
import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { loadAndDisplayAuctionListings } from '/src/js/utils/display-loaders/listingLoader.mjs';

async function auctionPage() {
    await initializeCreateListingForm();
    await loadAndDisplayAuctionListings();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', auctionPage);
