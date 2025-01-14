import { createBid } from '../../../api/auction/createBid.mjs';

export async function handleBidSubmit(event, listingId) {
    event.preventDefault();
    const form = event.target;
    const amountInput = form.querySelector('input[type="number"]');

    try {
        await createBid(listingId, amountInput.value);
        location.reload();
    } catch (error) {
        console.error('Error placing bid:', error);
        const errorDiv = form.querySelector('.text-red-500');
        if (errorDiv) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        }
    }
}
