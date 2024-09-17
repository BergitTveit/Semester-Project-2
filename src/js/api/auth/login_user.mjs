import { save } from '../../storage/save.mjs';
import { API_AUTH, API_BASE, API_LOGIN } from '../../utils/constants.mjs';

export async function loginUser(email, password) {
    const response = await fetch(API_BASE + API_AUTH + API_LOGIN, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const { accessToken, ...profile } = (await response.json()).data;

        save('token', accessToken);
        save('profile', profile);

        const urlParams = new URLSearchParams(window.location.search);
        const profileName = urlParams.get('name');
        if (profileName) {
            window.location.href = `/page/profile/index.html?name=${profileName}`;
            return;
        }
        window.location.href = '/pages/profile/index.html';

        return profile;
    }

    throw new Error('Could not login the account');
}
