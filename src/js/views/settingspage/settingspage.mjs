import { initializeSettingsForm } from '../../components/forms/settingsform.mjs';
import { createBottomNavBar } from '../../components/navbar.mjs';

async function settingsPage() {
    await initializeSettingsForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', settingsPage);
