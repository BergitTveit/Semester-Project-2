import { apiRequest } from '../client/apiRequest.mjs';
import { API_AUTH, API_BASE, API_REGISTER } from '../client/endpoints.mjs';

export async function registerNewUser(name, email, password) {
    const url = `${API_BASE}${API_AUTH}${API_REGISTER}`;
    return apiRequest(url, 'POST', { name, email, password }, true);
}
