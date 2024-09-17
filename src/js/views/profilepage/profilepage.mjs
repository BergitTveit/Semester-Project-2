import { loadAndDisplayProfile } from '../../api/profile/profile.mjs';
import { createBottomNavBar } from '../../components/navbar.mjs';

async function profilePage() {
    await createBottomNavBar();
    await loadAndDisplayProfile();
}

document.addEventListener('DOMContentLoaded', profilePage);
