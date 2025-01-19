export function validateFormInput(value, validationFn, errorMessage, input) {
    try {
        const error = validationFn ? validationFn(value) : null;

        if (error) {
            errorMessage.textContent = error;
            errorMessage.style.display = 'block';
            input.classList.add('border-red-500');
        } else {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
            input.classList.remove('border-red-500');
        }

        return !error;
    } catch (error) {
        errorMessage.textContent = error.message || 'Invalid input';
        errorMessage.style.display = 'block';
        input.classList.add('border-red-500');
        return false;
    }
}

export const usernameValidation = value =>
    value.length >= 5 ? null : 'Username must be at least 5 characters long';

export const emailValidation = value => {
    const emailRegex = /^[^\s@]+@stud\.noroff\.no$/;
    return emailRegex.test(value) ? null : 'Email must be in the format email@stud.noroff.no';
};

export const passwordValidation = value =>
    value.length >= 8 ? null : 'Password must be at least 8 characters long';

export const urlValidation = value => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(value) ? null : 'Please enter a valid URL';
};

export const titleValidation = value => (value.trim() ? null : 'Title is required');

export const dateValidation = value => {
    const parsedDate = new Date(value);
    if (isNaN(parsedDate.getTime())) {
        return 'Invalid date format';
    }
    const currentDate = new Date();
    currentDate.setSeconds(0, 0);
    if (parsedDate < currentDate) {
        return 'End date must be in the future';
    }
    return null;
};

export const bidAmountValidation = (value, bids = []) => {
    if (value < 0) return 'Bid amount must be greater than 0';

    if (!value || value === 0) return null;

    const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.amount)) : 0;

    if (bids.length > 0 && value <= highestBid) {
        return `Bid must be higher than the current highest bid (${highestBid})`;
    }

    return null;
};
export function validateOwnListing(listing) {
    try {
        if (!listing?.seller?.name) {
            return false;
        }

        const profileStr = localStorage.getItem('profile');
        if (!profileStr) {
            return false;
        }

        const profile = JSON.parse(profileStr);

        if (listing.seller.name === profile.name) {
            const container = document.createElement('div');
            container.innerHTML = `
                <p class="text-yellow-500">This is your own listing. You cannot bid on your listings.</p>
            `;
            return container;
        }
        return false;
    } catch (error) {
        console.error('Error checking listing ownership:', error);
        return false;
    }
}
