import { createHamburgerMenu } from '../common/hamburgerMenu.mjs';

export function createHeader() {
    const header = document.createElement('header');
    header.className = 'bg-linear-rorange text-white p-6 flex justify-between items-center';

    const logoLink = document.createElement('a');
    logoLink.href = '/index.html';
    logoLink.className = 'text-4xl font-bold font-irish-grover';

    const title = document.createElement('span');
    title.textContent = 'BidHive';
    logoLink.appendChild(title);

    const hamburger = document.createElement('button');
    hamburger.className = 'lg:hidden text-white text-3xl';
    hamburger.innerHTML = '&#9776;';

    const { menu, overlay, openMenu } = createHamburgerMenu();
    document.body.appendChild(menu);
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', openMenu);

    header.appendChild(logoLink);
    header.appendChild(hamburger);

    const headerContainer = document.getElementById('headerContainer');
    headerContainer.innerHTML = '';
    headerContainer.appendChild(header);
}
