const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3032/api';

const fetchFromApi = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const fetchOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        }
    };

    try {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log('Fetching URL:', url);
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchFromApi;
