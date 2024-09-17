import { createButton } from '../components/buttons.mjs';
import { clear } from '../storage/clear.mjs';

export function initializeSettingsForm() {
    const form = document.getElementById('settingsForm');
    const logoutButton = createButton('Logout', handleLogoutClick);
    logoutButton.id = 'logoutButton';

    form.appendChild(logoutButton);

    function handleLogoutClick() {
        clear('token');
        clear('profile');

        window.location.href = '/index.html';
    }
}
