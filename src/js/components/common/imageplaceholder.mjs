export function createImagePlaceholder() {
    const placeholderContainer = document.createElement('div');
    placeholderContainer.classList.add(
        'w-full',
        'h-full',
        'bg-gray-100',
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'text-gray-400'
    );

    const cameraIcon = document.createElement('div');
    cameraIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" 
            class="w-12 h-12 mb-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <path stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>`;

    const placeholderText = document.createElement('span');
    placeholderText.textContent = 'No image available';
    placeholderText.classList.add('text-sm');

    placeholderContainer.appendChild(cameraIcon);
    placeholderContainer.appendChild(placeholderText);

    return placeholderContainer;
}
