import { createBottomNavBar } from '../../components/common/navbar.mjs';
import { initializeSearchForm } from '../../components/forms/searchForm.mjs';
import { loadAndDisplayAuctionListings } from '../../utils/display-loaders/listingLoader.mjs';

async function homepage() {
    initializeSearchForm();
    await loadAndDisplayAuctionListings();

    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', homepage);
