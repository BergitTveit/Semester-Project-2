import { handleSettingsButtonClick } from '../handlers/formhandlers.mjs';
import { createButton } from './common/buttons.mjs';

export function displayProfile(userProfile) {
    const container = document.getElementById('profile-container');
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
        const avatarImg = document.createElement('img');
        avatarImg.src = userProfile.avatar.url;
        avatarImg.alt = userProfile.avatar.alt || `${userProfile.name}'s profile picture`;
        avatarImg.classList.add('w-24', 'h-24', 'rounded-full', 'mr-4');
        profileElement.appendChild(avatarImg);
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

    profileElement.appendChild(createButton('Settings', handleSettingsButtonClick));
    container.appendChild(profileElement);
}
