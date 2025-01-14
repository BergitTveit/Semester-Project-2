export function displayBidElement(bid) {
    const bidElement = document.createElement('div');
    bidElement.classList.add(
        'bid-item',
        'border',
        'rounded',
        'p-3',
        'bg-gray-50',
        'flex',
        'justify-between',
        'items-center'
    );

    const bidInfo = document.createElement('div');

    if (bid.bidder.avatar?.url) {
        const avatarImg = document.createElement('img');
        avatarImg.src = bid.bidder.avatar.url;
        avatarImg.alt = bid.bidder.avatar.alt || `${bid.bidder.name}'s profile picture`;
        avatarImg.classList.add('w-24', 'h-24', 'rounded-full', 'mr-4');
        bidElement.appendChild(avatarImg);
    }

    const bidderName = document.createElement('p');
    bidderName.textContent = `${bid.bidder.name}`;
    bidderName.classList.add('font-semibold');

    const bidAmount = document.createElement('p');
    bidAmount.textContent = `$ ${bid.amount}`;
    bidAmount.classList.add('text-green-600');

    bidInfo.appendChild(bidderName);
    bidInfo.appendChild(bidAmount);
    bidElement.appendChild(bidInfo);

    return bidElement;
}
