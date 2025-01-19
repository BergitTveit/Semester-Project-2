import { createHeader } from '/src/js/components/common/header.mjs';

import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { loadSpecificListing } from '/src/js/utils/display-loaders/spesificListingLoader.mjs';

async function specificListingPage() {
    createHeader();
    await loadSpecificListing();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', specificListingPage);
