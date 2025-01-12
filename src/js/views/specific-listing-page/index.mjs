import { createBottomNavBar } from '../../components/navbar.mjs';
import { loadSpecificListing } from './loadSpesificListing.mjs';

async function specificListingPage() {
    await loadSpecificListing();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', specificListingPage);
