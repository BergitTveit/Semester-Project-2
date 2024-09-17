import { createButton } from '../components/buttons.mjs';
import {
    createEmailInput,
    createNameInput,
    createPasswordInput,
    createAvatarInput,
} from '../components/forminputs.mjs';
import { handleCancelButtonClick, handleUpdateButtonClick } from '../handlers/formhandlers.mjs';
import { clear } from '../storage/clear.mjs';

export function initializeSettingsForm() {
    const form = document.getElementById('settingsForm');

    const updateButton = createButton('Save Changes', handleUpdateButtonClick);
    updateButton.id = 'updateButton';

    const logoutButton = createButton('Logout', handleLogoutButtonClick);
    logoutButton.id = 'logoutButton';

    const nameInput = createNameInput();
    const emailInput = createEmailInput();
    const passwordInput = createPasswordInput();
    const avatarInput = createAvatarInput();

    form.appendChild(avatarInput);
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(createButton('Cancel', handleCancelButtonClick));
    form.appendChild(updateButton);
    form.appendChild(logoutButton);

    function handleLogoutButtonClick() {
        clear('token');
        clear('profile');
        window.location.href = '/index.html';
    }
}
