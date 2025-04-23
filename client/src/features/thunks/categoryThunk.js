import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getCategoryById, createCategory, deleteCategory, updateCategory, getAllSubCategories, getSubCateory, createSubCategory, updateSubCategory, deleteSubCategory, getPopCategories, updatePopCategory } from "../services/categoryService";

export const getCategoriesThunk = createAsyncThunk(
    "categories/getCategory",
    async (_, thunkAPI) => { // Parametre gereksiz olduğu için boş bırakılıyor
        try {
            const response = await getCategories();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllSubCategoriesThunk = createAsyncThunk(
    "categories/getAllSubCategories",
    async (_, thunkAPI) => {
        try {
            const response = await getAllSubCategories();
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getCategoryByIdThunk = createAsyncThunk(
    "categories/getCategoryById",
    async (id, thunkAPI) => {
        try {
            const response = await getCategoryById(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getPopCategoriesThunk = createAsyncThunk(
    "categories/getPopCategories",
    async (_, thunkAPI) => {
        try {
            const response = await getPopCategories();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updatePopCategoryThunk = createAsyncThunk(
    "categories/updatePopCategory",
    async ({ id, isPopular }, thunkAPI) => {
        try {
            const response = await updatePopCategory(id, isPopular);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
//admin
export const createCategoryThunk = createAsyncThunk(
    "categories/createCategory",
    async (categoryData, thunkAPI) => {
        try {
            const response = await createCategory(categoryData);
            console.log("thunk category", categoryData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateCategoryThunk = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, name }, thunkAPI) => {
        try {
            const response = await updateCategory(id, name);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategoryThunk = createAsyncThunk(
    "categories/deleteCategory",
    async (id, thunkAPI) => {
        try {
            const response = await deleteCategory(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getSubCategoryThunk = createAsyncThunk(
    "categories/getSubCategory",
    async (id, thunkAPI) => {
        try {
            const response = await getSubCateory(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createSubCategoryThunk = createAsyncThunk(
    "categories/createSubCategory",
    async (categoryData, thunkAPI) => {
        try {
            const response = await createSubCategory(categoryData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateSubCategoryThunk = createAsyncThunk(
    "categories/updateSubCategory",
    async ({ id, name }, thunkAPI) => {
        try {
            const response = await updateSubCategory(id, name);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const deleteSubCategoryThunk = createAsyncThunk(
    "categories/deleteSubCategory",
    async (id, thunkAPI) => {
        try {
            const response = await deleteSubCategory(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
