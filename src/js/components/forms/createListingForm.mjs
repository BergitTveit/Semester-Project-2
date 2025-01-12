import {
    createDateInput,
    createDescriptionInput,
    createListingMediaInput,
    createTitleInput,
} from '../common/forminputs.mjs';
import { handleCreateListingSubmit } from '../../handlers/formhandlers.mjs';
import { dateValidation, titleValidation } from '../../utils/validators.mjs';
import { createButton } from '../common/buttons.mjs';

export function initializeCreateListingForm() {
    const form = document.getElementById('createListingForm');
    if (!form) return;

    const submitButton = createButton('Create Auction', handleCreateClick);
    submitButton.id = 'createListingButton';
    submitButton.disabled = true;

    let titleInput, dateInput, mediaInput, descriptionInput;

    function checkFormValidity() {
        if (!titleInput || !dateInput) return;

        const titleError = titleInput.querySelector('.text-red-500')?.textContent;
        const dateError = dateInput.querySelector('.text-red-500')?.textContent;

        const isFormValid =
            !(titleError || dateError) &&
            titleInput.querySelector('input').value &&
            dateInput.querySelector('input').value;

        submitButton.disabled = !isFormValid;
        submitButton.classList.toggle('opacity-50', !isFormValid);
        submitButton.classList.toggle('cursor-not-allowed', !isFormValid);
    }

    function handleCreateClick() {
        if (!submitButton.disabled) {
            const formData = {
                title: titleInput.querySelector('input').value,
                endsAt: dateInput.querySelector('input').value,
                media: mediaInput.querySelector('input').value || null,
                description: descriptionInput.querySelector('textarea').value || null,
            };

            const titleError = titleValidation(formData.title);
            const dateError = dateValidation(formData.endsAt);

            if (titleError || dateError) {
                return;
            }

            handleCreateListingSubmit(formData);
        }
    }

    titleInput = createTitleInput(() => setTimeout(checkFormValidity, 0));
    dateInput = createDateInput(() => setTimeout(checkFormValidity, 0));
    mediaInput = createListingMediaInput();
    descriptionInput = createDescriptionInput();

    form.appendChild(titleInput);
    form.appendChild(dateInput);
    form.appendChild(mediaInput);
    form.appendChild(descriptionInput);
    form.appendChild(submitButton);

    checkFormValidity();
}
