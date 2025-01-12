import { createBottomNavBar } from '../../components/common/navbar.mjs';
import { loadAndDisplayAuctionListings } from '../../utils/display-loaders/listingLoader.mjs';

async function homepage() {
    await loadAndDisplayAuctionListings();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', homepage);
