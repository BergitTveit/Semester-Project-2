import {
    createTextareaInput,
    createDateInput,
    createListingMediaInput,
    createTitleInput,
} from '../common/forminputs.mjs';
import { createButton } from '../common/buttons.mjs';
import { handleCreateListingSubmit } from '../../utils/handlers/listing-handlers/createHandler.mjs';
import { handleCancelButtonClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
export function initializeCreateListingForm() {
    const form = document.getElementById('createListingForm');
    if (!form) return;

    form.classList.add(
        'flex',
        'flex-col',
        'items-center',
        'mx-auto',

        'gap-4',
        'px-4',
        'w-full',
        'max-w-lg'
    );

    const titleInput = createTitleInput();
    const dateInput = createDateInput();
    const descriptionInput = createTextareaInput(null, 'Describe your listing'); // Using createTextareaInput for textarea
    const mediaInput = createListingMediaInput();

    [titleInput, dateInput, descriptionInput, mediaInput].forEach(input => {
        input.classList.add('w-full');
    });
    descriptionInput.querySelector('textarea').classList.add('resize-none');

    const addListingButton = createButton('Create Auction', null, 'submit');
    addListingButton.id = 'createListingButton';
    addListingButton.disabled = true;

    const cancelButton = createButton('Cancel', handleCancelButtonClick, 'button', 'secondary');
    cancelButton.id = 'cancelButton';

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'justify-between', 'items-center', 'w-full', 'mt-4');
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(addListingButton);

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

    form.appendChild(titleInput);
    form.appendChild(dateInput);
    form.appendChild(descriptionInput);
    form.appendChild(mediaInput);
    form.appendChild(buttonContainer);

    checkFormValidity();
}
