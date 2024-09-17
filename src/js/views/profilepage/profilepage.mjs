import { createBottomNavBar } from '../../components/navbar.mjs';

async function profilePage() {
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', profilePage);
