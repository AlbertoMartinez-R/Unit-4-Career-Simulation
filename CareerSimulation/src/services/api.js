const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/';
console.log('API Base URL:', API_BASE_URL);

export const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/protected-route`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
};

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const register = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};