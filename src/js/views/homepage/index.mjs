import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { initializeSearchForm } from '/src/js/components/forms/searchForm.mjs';
import { loadAndDisplayAuctionListings } from '/src/js/utils/display-loaders/listingLoader.mjs';

async function homepage() {
    initializeSearchForm();
    await loadAndDisplayAuctionListings();

    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', homepage);
