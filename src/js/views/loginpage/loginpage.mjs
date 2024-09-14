//Import it correctly

import { createBottomNavBar } from '../../components/navbar.mjs';

async function loginPage() {
    // await initi
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', loginPage);
