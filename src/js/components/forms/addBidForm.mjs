import { handleBidSubmit } from '../../utils/handlers/listing-handlers/addBidHandler.mjs';
import { isLoggedIn } from '../../utils/storage/checkLoginStatus.mjs';
import { bidAmountValidation, validateOwnListing } from '../../utils/validation/validators.mjs';
import { createButton } from '../common/buttons.mjs';
import { createBidAmountInput } from '../common/forminputs.mjs';
import { getProfile } from '../../api/profile/getProfile.mjs';

export function initializeBidForm(listing) {
    if (!listing) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <p class="text-red-500">Listing not found</p>
        `;
        return errorDiv;
    }

    if (!listing.seller) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <p class="text-red-500">Seller information is unavailable</p>
        `;
        return errorDiv;
    }

    const ownListingCheck = validateOwnListing(listing);
    if (ownListingCheck) {
        return ownListingCheck;
    }

    if (!isLoggedIn()) {
        const loginPrompt = document.createElement('div');
        loginPrompt.classList.add('mt-4', 'p-4', 'border', 'rounded', 'bg-gray-50', 'text-center');
        loginPrompt.innerHTML = `
            <p class="mb-2">Please log in to place a bid</p>
            <a href="/src/pages/login/index.html" class="text-blue-500 hover:text-blue-700">Login here</a>
        `;
        return loginPrompt;
    }

    const form = document.createElement('form');
    form.classList.add('mt-4', 'p-4', 'rounded', 'border', 'border-gray-200');

    const bidInput = createBidAmountInput(checkFormValidity);
    const submitButton = createButton('Place Bid', null, 'submit');
    submitButton.disabled = true;

    const profile = JSON.parse(localStorage.getItem('profile'));

    getProfile(profile.name)
        .then(profileData => {
            const creditInfo = document.createElement('div');
            creditInfo.classList.add('mb-4', 'text-sm', 'text-gray-600');
            creditInfo.textContent = `Your available credits: ${profileData.data.credits}`;
            form.insertBefore(creditInfo, bidInput);
        })
        .catch(error => {
            console.error('Error fetching profile credits:', error);
        });

    function showError(message) {
        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        if (message) {
            const errorElement = document.createElement('p');
            errorElement.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
            errorElement.textContent = message;
            bidInput.appendChild(errorElement);
        }
    }

    function checkFormValidity() {
        const input = bidInput.querySelector('input');
        if (!input) return;

        const validationMessage = bidAmountValidation(parseFloat(input.value), listing.bids);
        showError(validationMessage);

        submitButton.disabled = !!validationMessage;
        submitButton.classList.toggle('opacity-50', !!validationMessage);
        submitButton.classList.toggle('cursor-not-allowed', !!validationMessage);
    }

    const input = bidInput.querySelector('input');
    if (input) {
        input.addEventListener('input', checkFormValidity);
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!submitButton.disabled) {
            handleBidSubmit(event, listing.id);
        }
    });

    form.appendChild(bidInput);
    form.appendChild(submitButton);

    return form;
}
