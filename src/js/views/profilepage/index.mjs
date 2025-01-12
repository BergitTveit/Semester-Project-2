import { createBottomNavBar } from '../../components/common/navbar.mjs';
import { loadAndDisplayProfile } from '../../utils/display-loaders/profileLoader.mjs';

async function profilePage() {
    await loadAndDisplayProfile();
    await createBottomNavBar();
}

document.addEventListener('DOMContentLoaded', profilePage);
