import { createBottomNavBar } from '../../components/common/navbar.mjs';
import { initializeRegisterForm } from '../../components/forms/registerform.mjs';

async function registerPage() {
    await initializeRegisterForm();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', registerPage);
