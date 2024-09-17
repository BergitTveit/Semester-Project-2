//Import it correctly

import { createBottomNavBar } from '../../components/navbar.mjs';
import { initializeLoginForm } from '../../forms/loginform.mjs';

async function loginPage() {
    await initializeLoginForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', loginPage);
