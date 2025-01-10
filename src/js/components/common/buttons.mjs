export function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('btn', 'px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded');

    button.addEventListener('click', event => {
        if (!button.disabled) {
            onClick(event);
        }
    });

    return button;
}

export function createNavButton(text, iconClass, targetUrl) {
    const button = document.createElement('button');
    button.className =
        'flex flex-col items-center justify-center text-blue-600 hover:text-blue-500 focus:outline-none';
    button.setAttribute('aria-label', `Go to ${text} page`);

    const icon = document.createElement('span');
    icon.className = `${iconClass} text-2xl`;
    button.appendChild(icon);

    button.addEventListener('click', event => {
        event.preventDefault();
        if (typeof targetUrl === 'function') {
            const result = targetUrl();
            if (result && typeof result === 'string') {
                window.location.href = result;
            }
        } else if (typeof targetUrl === 'string') {
            window.location.href = targetUrl;
        }
    });

    return button;
}
