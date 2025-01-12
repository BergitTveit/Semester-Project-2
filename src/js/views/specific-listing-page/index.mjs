import { createBottomNavBar } from '../../components/common/navbar.mjs';
import { loadSpecificListing } from '../../utils/display-loaders/spesificListingLoader.mjs';

async function specificListingPage() {
    await loadSpecificListing();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', specificListingPage);
