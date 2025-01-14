import { displayBidElement } from '../../../components/features/bidElement.mjs';

export function handleShowAllBids(event, bidsList, sortedBids, showingAll) {
    const button = event.target;
    bidsList.innerHTML = '';

    if (!showingAll) {
        sortedBids.forEach(bid => {
            bidsList.appendChild(displayBidElement(bid));
        });
        button.textContent = 'Show Less';
    } else {
        sortedBids.slice(0, 3).forEach(bid => {
            bidsList.appendChild(displayBidElement(bid));
        });
        button.textContent = 'Show All Bids';
    }

    return !showingAll;
}
