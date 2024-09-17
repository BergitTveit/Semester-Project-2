import { createBottomNavBar } from '../../components/navbar.mjs';
import { initializeSettingsForm } from '../../forms/settingsform.mjs';

async function settingsPage() {
    await initializeSettingsForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', settingsPage);
