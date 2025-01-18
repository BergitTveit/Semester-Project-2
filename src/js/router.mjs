export default function router() {
    const path = location.pathname;
    const currentPath = window.location.pathname;

    // Only redirect if we're actually changing pages
    if (path === currentPath) {
        return; // Don't redirect if we're already on the page
    }

    switch (path) {
        case '/':
        case '/index.html':
            window.location.href = '/index.html';
            break;

        case '/src/pages/login/':
        case '/src/pages/login/index.html':
            window.location.href = '/src/pages/login/index.html';
            break;

        case '/src/pages/register/':
        case '/src/pages/register/index.html':
            window.location.href = '/src/pages/register/index.html';
            break;

        case '/src/pages/profile/':
        case '/src/pages/profile/index.html':
            window.location.href = '/src/pages/profile/index.html';
            break;

        case '/src/pages/listings/':
        case '/src/pages/listings/index.html':
            window.location.href = '/src/pages/listings/index.html';
            break;

        case '/src/pages/specific-listing/':
        case '/src/pages/specific-listing/index.html': {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            if (id) {
                window.location.href = `/src/pages/specific-listing/index.html?id=${id}`;
            }
            break;
        }

        default:
            window.location.href = '/index.html';
            break;
    }
}
