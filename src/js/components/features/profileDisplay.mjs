import { handleSettingsButtonClick } from '../../utils/handlers/navigation-handlers/routerHandlers.mjs';
import { createButton } from '../common/buttons.mjs';

export function displayProfile(response) {
    if (!response?.data) return;
    const userProfile = response.data;
    const container = document.getElementById('profileContainer');
    if (!container) return;
    container.innerHTML = '';

    const profileElement = document.createElement('div');
    profileElement.classList.add('relative', 'pt-12', 'w-full', 'mx-auto');

    if (userProfile.avatar?.url) {
        const avatarContainer = document.createElement('div');
        avatarContainer.classList.add(
            'absolute',
            'left-1/2',
            '-translate-x-1/2',
            '-top-12',
            'z-10'
        );

        const avatarImg = document.createElement('img');
        avatarImg.classList.add(
            'w-24',
            'h-24',
            'rounded-full',
            'opacity-0',
            'border-4',
            'border-white',
            'shadow-lg'
        );

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
            avatarImg.classList.add('opacity-100', 'transition-opacity', 'duration-300');
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
                'text-gray-400',
                'border-4',
                'border-white',
                'shadow-lg'
            );
            errorContainer.textContent = 'Avatar unavailable';
            avatarContainer.appendChild(errorContainer);
        };

        avatarImg.src = userProfile.avatar.url;
        avatarImg.alt = userProfile.avatar.alt || `${userProfile.name}'s profile picture`;
        avatarContainer.appendChild(avatarImg);
        profileElement.appendChild(avatarContainer);
    }

    const contentContainer = document.createElement('div');
    contentContainer.classList.add(
        'bg-white',
        'rounded-lg',
        'shadow-lg',
        'p-6',
        'mt-12',
        'w-full',
        'min-w-[400px]'
    );

    const infoContainer = document.createElement('div');
    infoContainer.classList.add(
        'flex',
        'justify-between',
        'items-center',
        'pb-4',
        'border-b-2',
        'border-gray-200',
        'w-full'
    );

    const nameElement = document.createElement('h1');
    nameElement.textContent = userProfile.name;
    nameElement.classList.add('text-xl', 'font-bold', 'text-gray-800');

    const creditsContainer = document.createElement('div');
    creditsContainer.classList.add('text-right');

    const creditsLabel = document.createElement('div');
    creditsLabel.textContent = 'Available Credits';
    creditsLabel.classList.add('text-sm', 'text-gray-500');

    const creditsElement = document.createElement('div');
    creditsElement.textContent = userProfile.credits;
    creditsElement.classList.add('text-xl', 'font-bold', 'text-secondary');

    creditsContainer.appendChild(creditsLabel);
    creditsContainer.appendChild(creditsElement);

    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(creditsContainer);
    contentContainer.appendChild(infoContainer);

    if (userProfile.bio) {
        const bioElement = document.createElement('p');
        bioElement.textContent = userProfile.bio;
        bioElement.classList.add('text-gray-700', 'mt-4', 'text-sm', 'leading-relaxed');
        contentContainer.appendChild(bioElement);
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('mt-6', 'flex', 'justify-end');

    const settingsButton = createButton('Settings', handleSettingsButtonClick, 'button');
    buttonContainer.appendChild(settingsButton);
    contentContainer.appendChild(buttonContainer);

    profileElement.appendChild(contentContainer);
    container.appendChild(profileElement);
}
