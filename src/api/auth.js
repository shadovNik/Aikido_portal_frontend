const API_URL = 'http://localhost:8000/api';

export async function loginRequest(username, password) {
    const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Ошибка авторизации');
    }
    return response.json(); // { access: ... }
}

export async function refreshTokenRequest() {
    const response = await fetch(`${API_URL}/token/refresh/`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Ошибка обновления токена');
    }
    return response.json(); // { access: ... }
}

export async function logoutRequest() {
    await fetch(`${API_URL}/logout/`, {
        method: 'POST',
        credentials: 'include'
    });
}
