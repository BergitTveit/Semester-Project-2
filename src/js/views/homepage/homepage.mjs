import { createBottomNavBar } from '../../components/navbar.mjs';

async function homepage() {
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', homepage);
