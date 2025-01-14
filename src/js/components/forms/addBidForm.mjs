import { handleBidSubmit } from '../../utils/handlers/listing-handlers/addBidHandler.mjs';
import { bidAmountValidation } from '../../utils/validation/validators.mjs';
import { createButton } from '../common/buttons.mjs';
import { createBidAmountInput } from '../common/forminputs.mjs';

export function initializeBidForm(listing) {
    const form = document.createElement('form');
    if (!form) return;

    form.classList.add('mt-4', 'p-4', 'border', 'rounded', 'bg-gray-50');

    const bidInput = createBidAmountInput(checkFormValidity);
    const submitButton = createButton('Place Bid', null, 'submit');
    submitButton.disabled = true;

    function checkFormValidity() {
        const amountValid = !bidAmountValidation(bidInput.querySelector('input').value);
        submitButton.disabled = !amountValid;
        submitButton.classList.toggle('opacity-50', !amountValid);
        submitButton.classList.toggle('cursor-not-allowed', !amountValid);
    }

    const input = bidInput.querySelector('input');
    input.addEventListener('input', checkFormValidity);

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!submitButton.disabled) {
            handleBidSubmit(event, listing.id);
        }
    });

    form.appendChild(bidInput);
    form.appendChild(submitButton);

    checkFormValidity();
    return form;
}
