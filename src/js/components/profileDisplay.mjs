export function displayProfile(profileData) {
    const container = document.getElementById('profile-container');
    container.innerHTML = '';
    const profile = profileData.data;

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

    if (profile.avatar && profile.avatar.url) {
        const profilePicture = document.createElement('img');
        profilePicture.src = profile.avatar.url;
        profilePicture.alt = profile.avatar.alt || `${profile.name}'s profile picture`;
        profilePicture.classList.add('w-24', 'h-24', 'rounded-full', 'mr-4');
        profileElement.appendChild(profilePicture);
    }

    const nameElement = document.createElement('h1');
    nameElement.textContent = profile.name;
    nameElement.classList.add('text-2xl', 'font-bold', 'mb-2');
    profileElement.appendChild(nameElement);

    if (profile.bio) {
        const bioElement = document.createElement('p');
        bioElement.textContent = profile.bio;
        bioElement.classList.add('text-gray-700', 'mb-2');
        profileElement.appendChild(bioElement);
    }

    if (profile.email) {
        const emailElement = document.createElement('p');
        emailElement.textContent = `Email: ${profile.email}`;
        emailElement.classList.add('text-gray-600', 'mb-2');
        profileElement.appendChild(emailElement);
    }

    container.appendChild(profileElement);
}
