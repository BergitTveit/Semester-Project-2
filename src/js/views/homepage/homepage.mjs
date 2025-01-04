import { loadAndDisplayAuctionListings } from '../../api/auction/auction.mjs';
import { createBottomNavBar } from '../../components/navbar.mjs';

async function homepage() {
    await loadAndDisplayAuctionListings();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', homepage);
