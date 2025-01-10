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

export const listingTitleValidation = value =>
    value.length >= 5 ? null : 'Title must be at least 5 characters long';

export const listingDeadlineValidation = value => {
    const today = new Date().toISOString().split('T')[0];
    if (!value) {
        return 'Deadline is required';
    }
    return value >= today ? null : 'Deadline must be in the future';
};

export const listingDescriptionValidation = value => {
    const maxLength = 500;
    return value.length <= maxLength ? null : `Description cannot exceed ${maxLength} characters`;
};
