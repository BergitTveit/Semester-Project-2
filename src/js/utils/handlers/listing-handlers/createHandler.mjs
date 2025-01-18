import { createListing } from '../../../api/auction/createListing.mjs';

export async function handleCreateListingSubmit(formData) {
    try {
        const parsedEndsAt = new Date(formData.endsAt);
        if (isNaN(parsedEndsAt.getTime())) {
            throw new Error('Invalid date format for auction end time');
        }

        const response = await createListing(
            formData.title,
            formData.description,
            formData.media,
            parsedEndsAt.toISOString()
        );

        showSuccessMessage('Auction listing created successfully!');
        if (typeof window !== 'undefined' && window.location) {
            window.location.href = `/src/pages/specific-listing/index.html?id=${response.data.id}`;
        }
    } catch (error) {
        3;
        showErrorMessage(error.message || 'Failed to create auction listing');
    }
}

function showSuccessMessage(message) {
    const form = document.getElementById('createListingForm');
    const successMessage = document.createElement('div');
    successMessage.classList.add('text-green-500', 'text-sm', 'mt-4', 'text-center');
    successMessage.textContent = message;
    form.appendChild(successMessage);

    setTimeout(() => successMessage.remove(), 2000);
}

function showErrorMessage(message) {
    const form = document.getElementById('createListingForm');
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('text-red-500', 'text-sm', 'mt-4', 'text-center');
    errorDiv.textContent = message;
    form.appendChild(errorDiv);

    setTimeout(() => errorDiv.remove(), 3000);
}
