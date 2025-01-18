import { createBottomNavBar } from '/src/js/components/common/navbar.mjs';
import { initializeRegisterForm } from '/src/js/components/forms/registerform.mjs';

async function registerPage() {
    await initializeRegisterForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', registerPage);
