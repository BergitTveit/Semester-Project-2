import { createButton } from '../common/buttons.mjs';
import {
    createDeadlineInput,
    createDescriptionInput,
    createTitleInput,
} from '../common/forminputs.mjs';
import { handleCancelButtonClick } from '../../handlers/formhandlers.mjs';

// import { handleCreateListingSubmit } from '../handlers/formHandlers.mjs';

export function initializeCreateListingForm() {
    const form = document.getElementById('createListingForm');
    if (!form) return;

    const titleInput = createTitleInput();
    const deadlineInput = createDeadlineInput();
    // const mediaInput = createMediaInput();
    const descriptionInput = createDescriptionInput();

    const submitButton = createButton('Create Listing', handleCancelButtonClick);
    submitButton.id = 'submitButton';
    const cancelButton = createButton('Cancel', () => {
        form.reset();
    });
    cancelButton.id = 'cancelButton';

    form.appendChild(titleInput);
    form.appendChild(deadlineInput);
    // form.appendChild(mediaInput);
    form.appendChild(descriptionInput);
    form.appendChild(cancelButton);
    form.appendChild(submitButton);
}
