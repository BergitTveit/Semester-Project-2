import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { initializeSettingsForm } from '/src/js/components/forms/settingsform.mjs';

async function settingsPage() {
    await initializeSettingsForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', settingsPage);
