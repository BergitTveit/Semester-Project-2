//Import it correctly

import { createBottomNavBar } from '../../components/common/navbar.mjs';
import { initializeLoginForm } from '../../components/forms/loginform.mjs';

async function loginPage() {
    await initializeLoginForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', loginPage);
