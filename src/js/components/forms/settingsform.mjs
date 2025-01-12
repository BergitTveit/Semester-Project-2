import { createButton } from '../common/buttons.mjs';
import {
    createEmailInput,
    createNameInput,
    createMediaInput,
    createBioInput,
} from '../common/forminputs.mjs';
import {
    handleCancelButtonClick,
    handleLogoutButtonClick,
    handleUpdateButtonClick,
} from '../../handlers/formhandlers.mjs';
import { load } from '../../utils/storage/load.mjs';

export function initializeSettingsForm() {
    const form = document.getElementById('settingsForm');
    if (!form) return;

    const updateButton = createButton('Save Changes', handleUpdateButtonClick);
    updateButton.id = 'updateButton';

    const logoutButton = createButton('Logout', handleLogoutButtonClick);
    logoutButton.id = 'logoutButton';

    const cancelButton = createButton('Cancel', handleCancelButtonClick);
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

    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(bioInput);
    form.appendChild(avatarInput);
    form.appendChild(cancelButton);
    form.appendChild(updateButton);
    form.appendChild(logoutButton);
}
