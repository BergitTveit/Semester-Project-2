//Import it correctly

import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { initializeLoginForm } from '/src/js/components/forms/loginform.mjs';

async function loginPage() {
    await initializeLoginForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', loginPage);
