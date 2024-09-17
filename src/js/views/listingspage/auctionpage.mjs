import { loadAndDisplayAuctionListings } from '../../api/auction/auctions.mjs';
import { createBottomNavBar } from '../../components/navbar.mjs';

async function auctionPage() {
    await loadAndDisplayAuctionListings();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', auctionPage);
