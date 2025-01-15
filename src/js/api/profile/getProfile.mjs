import { apiRequest } from '../client/apiRequest.mjs';
import { API_BASE, API_PROFILE } from '../client/endpoints.mjs';

export async function getProfile(userName) {
    const url = `${API_BASE}${API_PROFILE}${userName}`;
    console.log(url); // Add this to debug

    return apiRequest(url, 'GET', null, true);
}
