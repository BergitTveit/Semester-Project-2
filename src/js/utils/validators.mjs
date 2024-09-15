export const usernameValidation = value =>
    value.length >= 5 ? null : 'Username must be at least 5 characters long';

export const emailValidation = value => {
    const emailRegex = /^[^\s@]+@stud\.noroff\.no$/;
    return emailRegex.test(value) ? null : 'Email must be in the format email@stud.noroff.no';
};

export const passwordValidation = value =>
    value.length >= 8 ? null : 'Password must be at least 8 characters long';
