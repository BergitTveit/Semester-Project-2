import { initializeCreateListingForm } from '/src/js/components/forms/createListingForm.mjs';
import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { loadAndDisplayAuctionListings } from '/src/js/utils/display-loaders/listingLoader.mjs';
import { isLoggedIn } from '/src/js/utils/storage/checkLoginStatus.mjs';
import { createHeader } from '/src/js/components/common/header.mjs';

async function auctionPage() {
    createHeader();
    if (isLoggedIn()) {
        await initializeCreateListingForm();
    } else {
        const formContainer = document.getElementById('createListingForm');
        if (formContainer) {
            formContainer.innerHTML = `
                <div class="mt-4 p-4 border rounded bg-gray-50 text-center">
                    <p class="mb-2">Please log in to create a listing</p>
                    <a href="/src/pages/login/index.html" class="text-blue-500 hover:text-blue-700">Login here</a>
                </div>
            `;
        }
    }

    await loadAndDisplayAuctionListings();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', auctionPage);
