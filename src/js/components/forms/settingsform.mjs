import { createButton } from '../common/buttons.mjs';
import {
    createEmailInput,
    createNameInput,
    createMediaInput,
    createBioInput,
} from '../common/forminputs.mjs';

import { load } from '../../utils/storage/load.mjs';
import { handleUpdateButtonClick } from '../../utils/handlers/profile-handlers/updateHandler.mjs';
import { handleLogoutButtonClick } from '../../utils/handlers/auth-handlers/logoutHandler.mjs';
import { handleCancelButtonClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';

export function initializeSettingsForm() {
    const form = document.getElementById('settingsForm');
    if (!form) return;

    const updateButton = createButton('Save Changes', null, 'submit');
    updateButton.id = 'updateButton';
    updateButton.disabled = true;

    const logoutButton = createButton('Logout', handleLogoutButtonClick, 'button');
    logoutButton.id = 'logoutButton';

    const cancelButton = createButton('Cancel', handleCancelButtonClick, 'button');
    cancelButton.id = 'cancelButton';

    const nameInput = createNameInput();
    const emailInput = createEmailInput();
    const bioInput = createBioInput();
    const avatarInput = createMediaInput();

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
    form.appendChild(cancelButton);
    form.appendChild(updateButton);
    form.appendChild(logoutButton);

    checkFormValidity();
}
