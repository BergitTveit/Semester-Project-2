import { createBottomNavBar } from '../../components/common/navbar.mjs';
import { initializeSettingsForm } from '../../components/forms/settingsform.mjs';

async function settingsPage() {
    await initializeSettingsForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', settingsPage);
