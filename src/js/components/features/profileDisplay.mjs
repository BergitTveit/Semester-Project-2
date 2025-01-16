import { handleSettingsButtonClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
import { createButton } from '../common/buttons.mjs';

export function displayProfile(response) {
    if (!response?.data) return;
    const userProfile = response.data;

    const container = document.getElementById('profile-container');
    if (!container) return;

    container.innerHTML = '';

    const profileElement = document.createElement('div');
    profileElement.classList.add(
        'profile',
        'border',
        'p-4',
        'rounded',
        'shadow',
        'bg-white',
        'flex',
        'items-center'
    );

    if (userProfile.avatar?.url) {
        const avatarContainer = document.createElement('div');
        avatarContainer.classList.add('w-24', 'h-24', 'mr-4');

        const avatarImg = document.createElement('img');
        avatarImg.classList.add('w-24', 'h-24', 'rounded-full', 'mr-4', 'opacity-0');

        const loadingPlaceholder = document.createElement('div');
        loadingPlaceholder.classList.add(
            'w-24',
            'h-24',
            'rounded-full',
            'bg-gray-200',
            'animate-pulse'
        );

        avatarContainer.appendChild(loadingPlaceholder);

        avatarImg.onload = () => {
            loadingPlaceholder.remove();
            avatarImg.classList.remove('opacity-0');
            avatarImg.classList.add('opacity-100');
        };

        avatarImg.onerror = () => {
            loadingPlaceholder.remove();
            avatarImg.classList.add('hidden');
            const errorContainer = document.createElement('div');
            errorContainer.classList.add(
                'w-24',
                'h-24',
                'rounded-full',
                'bg-gray-100',
                'flex',
                'items-center',
                'justify-center',
                'text-gray-400'
            );
            errorContainer.textContent = 'Avatar unavailable';
            avatarContainer.appendChild(errorContainer);
        };

        avatarImg.src = userProfile.avatar.url;
        avatarImg.alt = userProfile.avatar.alt || `${userProfile.name}'s profile picture`;
        avatarContainer.appendChild(avatarImg);
        profileElement.appendChild(avatarContainer);
    }

    const nameElement = document.createElement('h1');
    nameElement.textContent = userProfile.name;
    nameElement.classList.add('text-2xl', 'font-bold', 'mb-2');
    profileElement.appendChild(nameElement);

    const creditsElement = document.createElement('h1');
    creditsElement.textContent = userProfile.credits;
    creditsElement.classList.add('text-2xl', 'font-bold', 'mb-2');
    profileElement.appendChild(creditsElement);

    if (userProfile.bio) {
        const bioElement = document.createElement('p');
        bioElement.textContent = userProfile.bio;
        bioElement.classList.add('text-gray-700', 'mb-2');
        profileElement.appendChild(bioElement);
    }

    profileElement.appendChild(createButton('Settings', handleSettingsButtonClick, 'button'));
    container.appendChild(profileElement);
}
