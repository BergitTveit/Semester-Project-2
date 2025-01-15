import { AuctionErrorMessages } from './errorMessages.mjs';

export class AuctionError extends Error {
    constructor(type, status = 500, details = null) {
        // Get message from our predefined messages, or use a default message
        const message = AuctionErrorMessages[type] || 'An unknown error occurred';

        // Call parent Error constructor with our message
        super(message);

        // Maintain proper stack trace for debugging
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuctionError);
        }

        // Custom properties
        this.name = 'AuctionError';
        this.type = type;
        this.status = status;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }

    // Helper method to get a formatted error object
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
