import { createButton } from '../components/buttons.mjs';
import {
    createEmailInput,
    createNameInput,
    createAvatarInput,
    createBioInput,
} from '../components/forminputs.mjs';
import {
    handleCancelButtonClick,
    handleLogoutButtonClick,
    handleUpdateButtonClick,
} from '../handlers/formhandlers.mjs';
import { load } from '../storage/load.mjs';

export function initializeSettingsForm() {
    const form = document.getElementById('settingsForm');
    const updateButton = createButton('Save Changes', handleUpdateButtonClick);
    updateButton.id = 'updateButton';
    const logoutButton = createButton('Logout', handleLogoutButtonClick);
    logoutButton.id = 'logoutButton';
    const cancelButton = createButton('Cancel', handleCancelButtonClick);
    cancelButton.id = 'cancelButton';

    const nameInput = createNameInput();
    const emailInput = createEmailInput();
    const bioInput = createBioInput();
    const avatarInput = createAvatarInput();

    // Load current user data
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
