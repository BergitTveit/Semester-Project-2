import { createHeader } from '/src/js/components/common/header.mjs';

import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { loadAndDisplayProfile } from '/src/js/utils/display-loaders/profileLoader.mjs';

async function profilePage() {
    createHeader();
    await loadAndDisplayProfile();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', profilePage);
