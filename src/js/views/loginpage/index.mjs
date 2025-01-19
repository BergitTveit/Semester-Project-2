//Import it correctly
import { createHeader } from '/src/js/components/common/header.mjs';

import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { initializeLoginForm } from '/src/js/components/forms/loginform.mjs';

async function loginPage() {
    createHeader();
    await initializeLoginForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', loginPage);
