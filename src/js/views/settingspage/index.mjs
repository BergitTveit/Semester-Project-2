import { createHeader } from '/src/js/components/common/header.mjs';

import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { initializeSettingsForm } from '/src/js/components/forms/settingsform.mjs';

async function settingsPage() {
    createHeader();
    await initializeSettingsForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', settingsPage);
