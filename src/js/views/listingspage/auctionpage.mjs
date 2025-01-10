import { loadAndDisplayAuctionListings } from '../../api/auction/auction.mjs';
import { initializeCreateListingForm } from '../../components/forms/createListingForm.mjs';
import { createBottomNavBar } from '../../components/navbar.mjs';

async function auctionPage() {
    await initializeCreateListingForm();
    await loadAndDisplayAuctionListings();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', auctionPage);
