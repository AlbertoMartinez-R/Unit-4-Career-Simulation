import fetchFromApi from "./fetchFromApi";

// Fetch all users
export const fetchAllUsers = async () => {
    return fetchFromApi('/users', {
        method: 'GET'
    });
};

// Fetch user details by ID
export const fetchUserById = async (userId) => {
    return fetchFromApi(`/users/${userId}`, {
        method: 'GET'
    });
};

// Fetch all products
export const fetchAllProducts = async () => {
    return fetchFromApi('/products', {
        method: 'GET'
    });
};

// Fetch product details by ID
export const fetchProductById = async (productId) => {
    return fetchFromApi(`/products/${productId}`, {
        method: 'GET'
    });
};

// Fetch all orders for a user
export const fetchAllOrders = async () => {
    return fetchFromApi('/orders', {
        method: 'GET'
    });
};

// Fetch order details by ID
export const fetchOrderById = async (orderId) => {
    return fetchFromApi(`/orders/${orderId}`, {
        method: 'GET'
    });
};

// Login user
export const loginUser = async (username, password) => {
    const data = await fetchFromApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });

    localStorage.setItem('token', data.token);

    return data;
};

// Register user
export const registerUser = async (username, password) => {
    return fetchFromApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
};