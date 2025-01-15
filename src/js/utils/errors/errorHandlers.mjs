import { AuctionErrorTypes } from './errorTypes.mjs';
import { AuctionError } from './AuctionError.mjs';

export function handleApiError(error) {
    if (error instanceof TypeError) {
        return new AuctionError(AuctionErrorTypes.CONNECTION_ERROR, 0);
    }

    switch (error.status) {
        case 400:
            if (error.message?.toLowerCase().includes('bid')) {
                return new AuctionError(AuctionErrorTypes.BID_TOO_LOW, 400, error.errors);
            }
            if (error.message?.toLowerCase().includes('credit')) {
                return new AuctionError(AuctionErrorTypes.INSUFFICIENT_CREDITS, 400, error.errors);
            }
            if (error.message?.toLowerCase().includes('required')) {
                return new AuctionError(
                    AuctionErrorTypes.MISSING_REQUIRED_FIELDS,
                    400,
                    error.errors
                );
            }
            return new AuctionError(AuctionErrorTypes.INVALID_INPUT_FORMAT, 400, error.errors);

        case 401:
            if (error.message?.toLowerCase().includes('expired')) {
                return new AuctionError(AuctionErrorTypes.SESSION_EXPIRED, 401);
            }
            return new AuctionError(AuctionErrorTypes.LOGIN_FAILED, 401);

        case 403:
            if (error.message?.toLowerCase().includes('own listing')) {
                return new AuctionError(AuctionErrorTypes.CANNOT_BID_OWN_ITEM, 403, error.errors);
            }
            return new AuctionError(AuctionErrorTypes.REQUEST_FAILED, 403, error.errors);

        case 404:
            if (error.message?.toLowerCase().includes('listing')) {
                return new AuctionError(AuctionErrorTypes.LISTING_NOT_FOUND, 404);
            }
            if (error.message?.toLowerCase().includes('profile')) {
                return new AuctionError(AuctionErrorTypes.PROFILE_NOT_FOUND, 404);
            }

            return new AuctionError(AuctionErrorTypes.INVALID_ENDPOINT, 404, { url: error.url });

        case 413:
            return new AuctionError(AuctionErrorTypes.MEDIA_TOO_LARGE, 413);
        case 415:
            return new AuctionError(AuctionErrorTypes.INVALID_MEDIA_TYPE, 415);

        case 500:
            return new AuctionError(AuctionErrorTypes.SERVER_ERROR, 500);

        default:
            return new AuctionError(AuctionErrorTypes.API_ERROR, error.status || 500, error.errors);
    }
}
