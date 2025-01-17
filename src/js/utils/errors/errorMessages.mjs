import { AuctionErrorTypes } from './errorTypes.mjs';

export const AuctionErrorMessages = {
    [AuctionErrorTypes.LOGIN_FAILED]: 'Unable to log in. Please try again.',
    [AuctionErrorTypes.REGISTRATION_FAILED]: 'Registration failed. Please check your information.',
    [AuctionErrorTypes.SESSION_EXPIRED]: 'Your session has expired. Please log in again.',
    [AuctionErrorTypes.INVALID_CREDENTIALS]: 'Invalid email or password.',

    [AuctionErrorTypes.BID_TOO_LOW]: 'Your bid must be higher than the current highest bid.',
    [AuctionErrorTypes.AUCTION_ENDED]: 'This auction has already ended.',
    [AuctionErrorTypes.INSUFFICIENT_CREDITS]: 'You do not have enough credits for this bid.',
    [AuctionErrorTypes.CANNOT_BID_OWN_ITEM]: 'You cannot bid on your own listing.',

    [AuctionErrorTypes.INVALID_LISTING]: 'Please check all listing details are correct.',
    [AuctionErrorTypes.LISTING_NOT_FOUND]: 'The listing you are looking for does not exist.',
    [AuctionErrorTypes.LISTING_CREATE_FAILED]: 'Failed to create listing. Please try again.',
    [AuctionErrorTypes.LISTING_UPDATE_FAILED]: 'Failed to update listing. Please try again.',

    [AuctionErrorTypes.PROFILE_NOT_FOUND]: 'User profile not found.',
    [AuctionErrorTypes.PROFILE_UPDATE_FAILED]: 'Failed to update profile. Please try again.',
    [AuctionErrorTypes.INVALID_PROFILE_DATA]: 'Invalid profile information provided.',

    [AuctionErrorTypes.MEDIA_UPLOAD_FAILED]: 'Failed to upload image. Please try again.',
    [AuctionErrorTypes.INVALID_MEDIA_TYPE]: 'Invalid file type. Please use JPG, PNG or GIF.',
    [AuctionErrorTypes.MEDIA_TOO_LARGE]: 'Image file is too large. Maximum size is 1MB.',

    [AuctionErrorTypes.CONNECTION_ERROR]: 'Network error - please check your connection.',
    [AuctionErrorTypes.API_ERROR]: 'An unexpected error occurred.',
    [AuctionErrorTypes.REQUEST_FAILED]: 'Request failed. Please try again.',
    [AuctionErrorTypes.SERVER_ERROR]: 'Server error. Please try again later.',

    [AuctionErrorTypes.MISSING_REQUIRED_FIELDS]: 'Please fill in all required fields.',
    [AuctionErrorTypes.INVALID_INPUT_FORMAT]: 'Invalid input format.',
    [AuctionErrorTypes.INVALID_DATE_FORMAT]: 'Invalid date format. Use YYYY-MM-DD.',
    [AuctionErrorTypes.SEARCH_EMPTY]: 'Please enter what you want to search for',
    [AuctionErrorTypes.INVALID_ENDPOINT]:
        'Unable to reach the requested service. Please try again later.',
};
