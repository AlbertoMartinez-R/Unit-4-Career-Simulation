import {
    getProducts,
    getProductById,
    removeProductById,
    updateProductDetails,
    updateProductStatus
} from '../models/product';

export const getAllProductsController = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get products!' });
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get product by ID!' });
    }
};

export const removeProductByIdController = async (req, res) => {
    try {
        const product = await removeProductById(req.params.id);
        res.status(200).json({ message: 'Product removed successfully!', product });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove product by ID!' });
    }
};

export const updateProductDetailsController = async (req, res) => {
    try {
        const updatedProduct = await updateProductDetails(req.params.id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product details!' });
    }
};

export const updateProductStatusController = async (req, res) => {
    try {
        const updatedStatus = await updateProductStatus(req.params.id, req.body.status);
        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product status!' });
    }
};