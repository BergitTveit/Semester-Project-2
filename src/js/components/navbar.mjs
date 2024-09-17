import { createNavButton } from './buttons.mjs';

// export function createBottomNavBar() {
//     const navBar = document.createElement('nav');
//     navBar.className =
//         'fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 flex justify-around items-center h-16'; // Tailwind classes for styling

//     const homeButton = createNavButton('Home', 'fas fa-home');
//     const categoryButton = createNavButton('Categories', 'fas fa-list');
//     const addButton = createNavButton('Add Listing', 'fas fa-plus-circle');
//     const bidsButton = createNavButton('Bids', 'fas fa-gavel');
//     const profileButton = createNavButton('Profile', 'fas fa-user');

//     navBar.appendChild(homeButton);
//     navBar.appendChild(categoryButton);
//     navBar.appendChild(addButton);
//     navBar.appendChild(bidsButton);
//     navBar.appendChild(profileButton);

//     const bottomNavBarContainer = document.getElementById('bottomNavBar');
//     bottomNavBarContainer.innerHTML = '';
//     bottomNavBarContainer.appendChild(navBar);
// }
export function createBottomNavBar() {
    const navBar = document.createElement('nav');
    navBar.className =
        'fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 flex justify-around items-center h-16';

    const homeButton = createNavButton('Home', 'fas fa-home', '/index.html');
    const categoryButton = createNavButton(
        'Categories',
        'fas fa-list',
        '/pages/category_listings/index.html'
    );
    const addButton = createNavButton(
        'Add Listing',
        'fas fa-plus-circle',
        '/pages/add_new_listing/index.html'
    );
    const bidsButton = createNavButton('Bids', 'fas fa-gavel', '/pages/bids/index.html');
    const profileButton = createNavButton('Profile', 'fas fa-user', '/pages/login/index.html');

    navBar.appendChild(homeButton);
    navBar.appendChild(categoryButton);
    navBar.appendChild(addButton);
    navBar.appendChild(bidsButton);
    navBar.appendChild(profileButton);

    const bottomNavBarContainer = document.getElementById('bottomNavBar');
    bottomNavBarContainer.innerHTML = '';
    bottomNavBarContainer.appendChild(navBar);
}
