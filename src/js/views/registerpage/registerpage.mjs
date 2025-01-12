import { initializeRegisterForm } from '../../components/forms/registerform.mjs';
import { createBottomNavBar } from '../../components/navbar.mjs';

async function registerPage() {
    await initializeRegisterForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', registerPage);
