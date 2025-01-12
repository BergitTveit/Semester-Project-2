import { initializeCreateListingForm } from '../../components/forms/createListingForm.mjs';
import { createBottomNavBar } from '../../components/common/navbar.mjs';
// import { loadAndDisplayAuctionListings } from '../../utils/display-loaders/listingLoader.mjs';

async function auctionPage() {
    await initializeCreateListingForm();
    // await loadAndDisplayAuctionListings();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', auctionPage);
