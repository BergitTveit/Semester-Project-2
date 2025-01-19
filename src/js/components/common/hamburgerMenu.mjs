export function createHamburgerMenu() {
    const menuContainer = document.createElement('div');
    menuContainer.classList.add(
        'fixed',
        'top-0',
        'right-0',
        'h-screen',
        'w-64',
        'bg-white',
        'shadow-lg',
        'transform',
        'translate-x-full',
        'transition-transform',
        'duration-300',
        'ease-in-out',
        'z-50'
    );

    const menuHeader = document.createElement('div');
    menuHeader.classList.add('bg-linear-rorange', 'p-6', 'flex', 'justify-between', 'items-center');

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('text-white', 'text-3xl', 'font-bold', 'hover:text-gray-200');
    menuHeader.appendChild(closeButton);

    const menuItems = document.createElement('div');
    menuItems.classList.add('flex', 'flex-col', 'p-4', 'space-y-4');

    const menuLinks = [
        { text: 'Profile', href: '/src/pages/profile/index.html', icon: 'user' },
        { text: 'Add Listing', href: '/src/pages/listings/index.html', icon: 'plus-circle' },
        { text: 'Settings', href: '/src/pages/settings/index.html', icon: 'settings' },
    ];

    menuLinks.forEach(link => {
        const menuItem = document.createElement('a');
        menuItem.href = link.href;
        menuItem.classList.add(
            'flex',
            'items-center',
            'space-x-2',
            'text-gray-700',
            'hover:text-secondary',
            'p-2',
            'rounded',
            'transition-colors'
        );

        menuItem.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${getIconPath(link.icon)}
            </svg>
            <span>${link.text}</span>
        `;

        menuItems.appendChild(menuItem);
    });

    const overlay = document.createElement('div');
    overlay.classList.add(
        'fixed',
        'inset-0',
        'bg-black',
        'bg-opacity-50',
        'hidden',
        'transition-opacity',
        'duration-300',
        'ease-in-out',
        'z-40'
    );

    closeButton.addEventListener('click', () => {
        menuContainer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    });

    overlay.addEventListener('click', () => {
        menuContainer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    });

    menuContainer.appendChild(menuHeader);
    menuContainer.appendChild(menuItems);

    return {
        menu: menuContainer,
        overlay: overlay,
        openMenu: () => {
            menuContainer.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
        },
    };
}

function getIconPath(icon) {
    const icons = {
        user: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>`,
        'plus-circle': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
        settings: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>`,
    };
    return icons[icon] || '';
}
