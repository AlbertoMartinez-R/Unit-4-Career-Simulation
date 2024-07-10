import fetchFromApi from './fetchFromApi';

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

// Update user role
export const updateUserRole = async (userId, role) => {
    return fetchFromApi(`/users/${userId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role })
    });
};

// Ban user
export const banUser = async (userId) => {
    return fetchFromApi(`/users/${userId}/ban`, {
        method: 'PUT'
    });
};

// Fetch wishlist
export const fetchWishlist = async (userId) => {
    return fetchFromApi(`/users/${userId}/wishlist`, {
        method: 'GET'
    });
};

// Add to wishlist
export const addToWishlist = async (userId, productId) => {
    return fetchFromApi(`/users/${userId}/wishlist`, {
        method: 'POST',
        body: JSON.stringify({ productId })
    });
};

// Remove from wishlist
export const removeFromWishlist = async (userId, productId) => {
    return fetchFromApi(`/users/${userId}/wishlist/${productId}`, {
        method: 'DELETE'
    });
};

// Fetch user profile
export const fetchUserProfile = async (userId) => {
    return fetchFromApi(`/users/${userId}/profile`, {
        method: 'GET'
    });
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
    return fetchFromApi(`/users/${userId}/profile`, {
        method: 'PUT',
        body: JSON.stringify(profileData)
    });
};

// Fetch order history
export const fetchOrderHistory = async (userId) => {
    return fetchFromApi(`/users/${userId}/orders`, {
        method: 'GET'
    });
};

// Process checkout
export const processCheckout = async (userId, token, cartItems) => {
    return fetchFromApi(`/users/${userId}/checkout`, {
        method: 'POST',
        body: JSON.stringify({ token, cartItems })
    });
};

// Fetch reviews by product ID
export const fetchReviewsByProductId = async (productId) => {
    return fetchFromApi(`/products/${productId}/reviews`, {
        method: 'GET'
    });
};

// Submit review
export const submitReview = async (userId, productId, rating, comment) => {
    return fetchFromApi(`/products/${productId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ userId, rating, comment })
    });
};

// Fetch all reviews
export const fetchAllReviews = async () => {
    return fetchFromApi('/reviews', {
        method: 'GET'
    });
};

// Delete review
export const deleteReview = async (reviewId) => {
    return fetchFromApi(`/reviews/${reviewId}`, {
        method: 'DELETE'
    });
};

// Update product details
export const updateProductDetails = async (productId, details) => {
    return fetchFromApi(`/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(details)
    });
};

// Update product status
export const updateProductStatus = async (productId, status) => {
    return fetchFromApi(`/products/${productId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    });
};

// Fetch cart items for a user
export const fetchCart = async (userId) => {
    return fetchFromApi(`/users/${userId}/cart`, {
        method: 'GET'
    });
};

// Add item to cart
export const addItemToCart = async (userId, productId, quantity) => {
    return fetchFromApi(`/users/${userId}/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId, quantity })
    });
};

// Remove item from cart
export const removeItemFromCart = async (userId, productId) => {
    return fetchFromApi(`/users/${userId}/cart/${productId}`, {
        method: 'DELETE'
    });
};

// Update item quantity in cart
export const updateCartItemQuantity = async (userId, productId, quantity) => {
    return fetchFromApi(`/users/${userId}/cart/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity })
    });
};
