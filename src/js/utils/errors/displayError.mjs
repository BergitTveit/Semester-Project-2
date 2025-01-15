export function displayError(error, container, showDetails = false) {
    if (!container) return;

    const errorMessage = error.message || 'An unexpected error occurred. Please try again later.';

    const errorHTML = `
        <div class="text-red-500 p-4 rounded">
            <p>${errorMessage}</p>
            ${
                showDetails && error.details
                    ? `
                <p class="text-sm mt-2">
                    ${JSON.stringify(error.details)}
                </p>
            `
                    : ''
            }
        </div>
    `;

    container.innerHTML = errorHTML;
}

export function clearError(container) {
    if (container) {
        container.innerHTML = '';
    }
}
