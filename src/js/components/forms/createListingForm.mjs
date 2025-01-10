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

// formhandlers.mjs (addition)
// export async function handleCreateListingSubmit(formData) {
//     try {
//         const response = await createListing(
//             formData.title,
//             formData.description,
//             formData.media,
//             new Date(formData.endsAt).toISOString()
//         );

//         showSuccessMessage('Auction listing created successfully!');

//         setTimeout(() => {
//             if (typeof window !== 'undefined' && window.location) {
//                 window.location.href = `/auction/${response.data.id}`;
//             }
//         }, 2000);
//     } catch (error) {
//         showErrorMessage(error.message || 'Failed to create auction listing');
//     }
// }

/////////////////////////////////////////////////////////////
// import { createListing } from '../../api/auction/createListing.mjs';
// import { dateValidation, titleValidation } from '../../utils/validators.mjs';
// import {
//     createDateInput,
//     createDescriptionInput,
//     createListingMediaInput,
//     createTitleInput,
// } from '../common/forminputs.mjs';

// export async function initializeCreateListingForm() {
//     const form = document.getElementById('createListingForm');
//     if (!form) return;

//     let formData = {
//         title: '',
//         endsAt: '',
//         media: '',
//         description: '',
//     };

//     function updateFormData(field, value) {
//         formData[field] = value;
//     }

//     const titleInput = createTitleInput(() =>
//         updateFormData('title', titleInput.querySelector('input').value)
//     );
//     titleInput.querySelector('input').name = 'title';

//     const dateInput = createDateInput(() =>
//         updateFormData('endsAt', dateInput.querySelector('input').value)
//     );
//     dateInput.querySelector('input').name = 'endsAt';

//     const mediaInput = createListingMediaInput(() =>
//         updateFormData('media', mediaInput.querySelector('input').value)
//     );
//     mediaInput.querySelector('input').name = 'media';

//     const descriptionInput = createDescriptionInput(() =>
//         updateFormData('description', descriptionInput.querySelector('textarea').value)
//     );
//     descriptionInput.querySelector('textarea').name = 'description';

//     const submitButton = document.createElement('button');
//     submitButton.type = 'submit';
//     submitButton.textContent = 'Create Auction';
//     submitButton.classList.add('btn', 'btn-primary', 'w-full');

//     form.append(titleInput, dateInput, mediaInput, descriptionInput, submitButton);

//     form.addEventListener('submit', async event => {
//         event.preventDefault();

//         const titleError = titleValidation(formData.title);
//         const dateError = dateValidation(formData.endsAt);

//         if (titleError || dateError) {
//             return;
//         }

//         try {
//             const response = await createListing(
//                 formData.title,
//                 formData.description || null,
//                 formData.media || null,
//                 new Date(formData.endsAt).toISOString()
//             );

//             form.reset();
//             formData = { title: '', endsAt: '', media: '', description: '' };

//             const successMessage = document.createElement('div');
//             successMessage.classList.add('text-green-500', 'text-sm', 'mt-4', 'text-center');
//             successMessage.textContent = 'Auction listing created successfully!';
//             form.appendChild(successMessage);

//             setTimeout(() => {
//                 successMessage.remove();
//                 if (typeof window !== 'undefined' && window.location) {
//                     window.location.href = `/auction/${response.data.id}`;
//                 }
//             }, 2000);
//         } catch (error) {
//             const errorDiv = document.createElement('div');
//             errorDiv.classList.add('text-red-500', 'text-sm', 'mt-4', 'text-center');
//             errorDiv.textContent = error.message || 'Failed to create auction listing';
//             form.appendChild(errorDiv);

//             setTimeout(() => {
//                 errorDiv.remove();
//             }, 3000);
//         }
//     });

//     formContainer.appendChild(form);
// }
