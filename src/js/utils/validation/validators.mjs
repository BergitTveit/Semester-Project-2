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

export const bidAmountValidation = value => {
    if (!value || value <= 0) return 'Bid amount must be greater than 0';
    return null;
};
