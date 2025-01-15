import { AuctionErrorMessages } from './errorMessages.mjs';

export class AuctionError extends Error {
    constructor(type, status = 500, details = null) {
        const message = AuctionErrorMessages[type] || 'An unknown error occurred';

        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuctionError);
        }

        this.name = 'AuctionError';
        this.type = type;
        this.status = status;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }

    toJSON() {
        return {
            name: this.name,
            type: this.type,
            message: this.message,
            status: this.status,
            details: this.details,
            timestamp: this.timestamp,
        };
    }
}
