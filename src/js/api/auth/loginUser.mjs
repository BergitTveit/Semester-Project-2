import { save } from '../../utils/storage/save.mjs';
import { API_AUTH, API_BASE, API_LOGIN } from '../client/endpoints.mjs';
import { apiRequest } from '../client/apiRequest.mjs';

export async function loginUser(email, password) {
    const url = `${API_BASE}${API_AUTH}${API_LOGIN}`;
    const responseData = await apiRequest(url, 'POST', { email, password }, true);

    const { accessToken, ...userProfile } = responseData.data;
    save('token', accessToken);
    save('profile', userProfile);

    return userProfile;
}
