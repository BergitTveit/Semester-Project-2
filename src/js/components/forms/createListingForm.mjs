import {
    createDateInput,
    createDescriptionInput,
    createListingMediaInput,
    createTitleInput,
} from '../common/forminputs.mjs';
import { createButton } from '../common/buttons.mjs';
import { handleCreateListingSubmit } from '../../utils/handlers/listing-handlers/createHandler.mjs';

export function initializeCreateListingForm() {
    const form = document.getElementById('createListingForm');
    if (!form) return;

    const addListingButton = createButton('Create Auction', null, 'submit');
    addListingButton.id = 'createListingButton';
    addListingButton.disabled = true;

    const titleInput = createTitleInput();
    const dateInput = createDateInput();
    const mediaInput = createListingMediaInput();
    const descriptionInput = createDescriptionInput();

    function checkFormValidity() {
        const isTitleValid = titleInput.querySelector('input').value.trim() !== '';
        const isDateValid = dateInput.querySelector('input').value.trim() !== '';

        const isFormValid = isTitleValid && isDateValid;

        addListingButton.disabled = !isFormValid;
        addListingButton.classList.toggle('opacity-50', !isFormValid);
        addListingButton.classList.toggle('cursor-not-allowed', !isFormValid);
    }

    titleInput.querySelector('input').addEventListener('input', checkFormValidity);
    dateInput.querySelector('input').addEventListener('input', checkFormValidity);

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!addListingButton.disabled) {
            const formData = {
                title: titleInput.querySelector('input').value.trim(),
                description: descriptionInput.querySelector('textarea')?.value?.trim() || '',
                media: mediaInput.querySelector('input')?.value?.trim() || '',
                endsAt: dateInput.querySelector('input').value.trim(),
            };
            await handleCreateListingSubmit(formData);
        }
    });

    form.append(titleInput, dateInput, mediaInput, descriptionInput, addListingButton);
    checkFormValidity();
}
