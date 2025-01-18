import { isLoggedIn } from '../../utils/storage/checkLoginStatus.mjs';
import { createNavButton } from './buttons.mjs';

export function createBottomNavBar() {
    const navBar = document.createElement('nav');
    navBar.className =
        'fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 flex justify-around items-center h-16';

    const homeButton = createNavButton('Home', 'fas fa-home', '/index.html');

    const addButton = createNavButton(
        'Add Listing',
        'fas fa-plus-circle',
        '/src/pages/listings/index.html'
    );
    const profileButton = createNavButton(
        'Profile',
        'fas fa-user',
        isLoggedIn() ? '/src/pages/profile/index.html' : '/src/pages/login/index.html'
    );
    navBar.appendChild(homeButton);

    navBar.appendChild(addButton);

    navBar.appendChild(profileButton);

    const bottomNavBarContainer = document.getElementById('bottomNavBar');
    bottomNavBarContainer.innerHTML = '';
    bottomNavBarContainer.appendChild(navBar);
}
