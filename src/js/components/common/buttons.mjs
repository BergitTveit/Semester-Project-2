export function createButton(text, onClick = null, type = 'button', style = 'primary') {
    const button = document.createElement('button');
    button.textContent = text;
    button.type = type;

    const styles = {
        primary: [
            'bg-gradient-to-r',
            'from-linearRorangeStart',
            'to-linearRorangeEnd',
            'text-white',
            'hover:bg-gradient-to-l',
            'shadow-md',
            'hover:shadow-lg',
            'transition-all',
        ],
        secondary: [
            'border',
            'border-secondary',
            'text-secondary',
            'bg-transparent',
            'hover:bg-secondary/20',
            'transition-colors',
            'shadow-md',
            'hover:shadow-lg',
            'transition-all',
        ],

        disabled: ['bg-gray', 'text-white', 'opacity-50', 'cursor-not-allowed'],
    };

    button.classList.add('btn', 'px-4', 'py-2', 'rounded', ...(styles[style] || styles.primary));

    if (onClick) {
        button.addEventListener('click', event => {
            if (!button.disabled) {
                onClick(event);
            }
        });
    }

    button.setDisabled = function (isDisabled) {
        button.disabled = isDisabled;
        button.classList.toggle(...styles.disabled, isDisabled);
    };

    return button;
}
export function createNavButton(text, iconClass, targetUrl) {
    const button = document.createElement('button');
    button.className =
        'flex flex-col items-center justify-center text-white hover:text-hoverColour focus:outline-none';
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
