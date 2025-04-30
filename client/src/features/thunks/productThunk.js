import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProductById, getProductsByCategory, getProductsBySubcategory, getProductsByName, getProductsByColor, createProduct, updateProduct, deleteProduct } from "../services/productService";

export const getProductsThunk = createAsyncThunk(
    "products/getProducts",
    async (_, thunkAPI) => { // Parametre gereksiz olduğu için boş bırakılıyor
        try {
            const response = await getProducts();
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getProductByIdThunk = createAsyncThunk(
    "products/getProductById",
    async (id, thunkAPI) => {
        try {
            const response = await getProductById(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getProductsByCategoryThunk = createAsyncThunk(
    "products/getProductsByCategory",
    async (category, thunkAPI) => {
        try {
            const response = await getProductsByCategory(category);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getProductsBySubcategoryThunk = createAsyncThunk(
    "products/getProductsBySubcategory",
    async (subcategoryId, thunkAPI) => {
        try {
            const response = await getProductsBySubcategory(subcategoryId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const getProductsByNameThunk = createAsyncThunk(
    "products/getProductsByName",
    async (name, thunkAPI) => {
        try {
            const response = await getProductsByName(name);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getProductsByColorThunk = createAsyncThunk(
    "products/getProductsByColor",
    async (color, thunkAPI) => {
        try {
            const response = await getProductsByColor(color);
            console.log("getproductsbycolor thunk:", response.data.products);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


export const createProductThunk = createAsyncThunk(
    "products/createProduct",
    async (productData, thunkAPI) => {
        try {
            console.log("productData thunk:", productData);
            const response = await createProduct(productData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


export const updateProductThunk = createAsyncThunk(
    "products/updateProduct",
    async ({ productId, productData }, thunkAPI) => {
        try {
            const response = await updateProduct(productId, productData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const deleteProductThunk = createAsyncThunk(
    "products/deleteProduct",
    async (productId, thunkAPI) => {
        try {
            const response = await deleteProduct(productId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)