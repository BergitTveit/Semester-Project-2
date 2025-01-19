import { createButton } from '../common/buttons.mjs';
import {
    createEmailInput,
    createNameInput,
    createMediaInput,
    createTextareaInput,
} from '../common/forminputs.mjs';

import { load } from '../../utils/storage/load.mjs';
import { handleUpdateButtonClick } from '../../utils/handlers/profile-handlers/updateHandler.mjs';
import { handleLogoutButtonClick } from '../../utils/handlers/auth-handlers/logoutHandler.mjs';
import { handleCancelButtonClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';

export function initializeSettingsForm() {
    const form = document.getElementById('settingsForm');
    if (!form) return;

    form.classList.add(
        'flex',
        'flex-col',
        'items-center',
        'mx-auto',
        'mt-16',
        'gap-4',
        'px-4',
        'w-full',
        'max-w-lg'
    );
    const nameInput = createNameInput();
    nameInput.querySelector('input').id = 'nameInput';

    const emailInput = createEmailInput();
    emailInput.querySelector('input').id = 'emailInput';

    const bioInput = createTextareaInput(null, 'About yourself...');
    bioInput.querySelector('textarea').id = 'bioInput';

    const avatarInput = createMediaInput();
    avatarInput.querySelector('input').id = 'avatarInput';

    const updateButton = createButton('Save Changes', null, 'submit');
    updateButton.id = 'updateButton';
    updateButton.disabled = true;

    const logoutButton = createButton('Logout', handleLogoutButtonClick, 'button', 'secondary');
    logoutButton.id = 'logoutButton';
    logoutButton.classList.add('mt-8', 'mx-auto');

    const cancelButton = createButton('Cancel', handleCancelButtonClick, 'button', 'secondary');
    cancelButton.id = 'cancelButton';

    [nameInput, emailInput, bioInput, avatarInput].forEach(input => {
        input.classList.add('w-full');
    });
    bioInput.querySelector('textarea').classList.add('resize-none');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'justify-between', 'items-center', 'w-full', 'mt-4');

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(updateButton);

    const profile = load('profile');
    if (profile) {
        nameInput.querySelector('input').value = profile.name || '';
        emailInput.querySelector('input').value = profile.email || '';
        bioInput.querySelector('textarea').value = profile.bio || '';
        avatarInput.querySelector('input').value = profile.avatar?.url || '';
    }

    function checkFormValidity() {
        const nameValid = nameInput.querySelector('input').value.trim() !== '';
        const emailValid = emailInput.querySelector('input').value.trim() !== '';
        const avatarValid = avatarInput.querySelector('input').value.trim() !== '';

        const isFormValid = nameValid && emailValid && avatarValid;

        updateButton.disabled = !isFormValid;
        updateButton.classList.toggle('opacity-50', !isFormValid);
        updateButton.classList.toggle('cursor-not-allowed', !isFormValid);
    }

    nameInput.querySelector('input').addEventListener('input', checkFormValidity);
    emailInput.querySelector('input').addEventListener('input', checkFormValidity);
    avatarInput.querySelector('input').addEventListener('input', checkFormValidity);

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!updateButton.disabled) {
            handleUpdateButtonClick(event);
        }
    });

    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(bioInput);
    form.appendChild(avatarInput);
    form.appendChild(buttonContainer);
    form.appendChild(logoutButton);

    checkFormValidity();
}
