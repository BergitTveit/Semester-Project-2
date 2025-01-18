export default function router() {
    const path = location.pathname;
    const currentPath = window.location.pathname;

    if (path === currentPath) {
        return;
    }

    switch (path) {
        case '/':
        case '/index.html':
            window.location.href = '/index.html';
            break;

        case '/login/':
        case '/login':
        case '/login/index.html':
            window.location.href = '/login/index.html';
            break;

        case '/register/':
        case '/register':
        case '/register/index.html':
            window.location.href = '/register/index.html';
            break;

        case '/profile/':
        case '/profile':
        case '/profile/index.html':
            window.location.href = '/profile/index.html';
            break;

        case '/listings/':
        case '/listings':
        case '/listings/index.html':
            window.location.href = '/listings/index.html';
            break;

        case '/specific-listing/':
        case '/specific-listing': {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            if (id) {
                window.location.href = `/specific-listing/index.html?id=${id}`;
            }
            break;
        }

        default:
            window.location.href = '/index.html';
            break;
    }
}
