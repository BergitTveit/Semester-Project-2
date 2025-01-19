export function displayBidElement(bid) {
    if (!bid?.bidder) return null;

    const bidElement = document.createElement('div');
    bidElement.classList.add(
        'bid-item',
        'rounded',
        'p-3',
        'flex',
        'justify-between',
        'items-center'
    );

    const bidInfo = document.createElement('div');

    if (bid.bidder.avatar?.url) {
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

        avatarImg.src = bid.bidder.avatar.url;
        avatarImg.alt = bid.bidder.avatar.alt || `${bid.bidder.name}'s profile picture`;
        avatarContainer.appendChild(avatarImg);
        bidElement.appendChild(avatarContainer);
    }

    const bidderName = document.createElement('p');
    bidderName.textContent = bid.bidder.name ?? 'Unknown Bidder';
    bidderName.classList.add('font-semibold');

    const bidAmount = document.createElement('p');
    bidAmount.textContent = `$ ${bid.amount ?? 0}`;
    bidAmount.classList.add('text-green-600');

    bidInfo.appendChild(bidderName);
    bidInfo.appendChild(bidAmount);
    bidElement.appendChild(bidInfo);

    return bidElement;
}
