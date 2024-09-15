import { createBottomNavBar } from '../../components/navbar.mjs';
import { initializeRegisterForm } from '../../forms/registerform.mjs';

async function registerPage() {
    await initializeRegisterForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', registerPage);
