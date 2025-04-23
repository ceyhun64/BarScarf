import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesThunk, getCategoryByIdThunk, createCategoryThunk, updateCategoryThunk, deleteCategoryThunk, getAllSubCategoriesThunk, getSubCategoryThunk, createSubCategoryThunk, deleteSubCategoryThunk, updateSubCategoryThunk, getPopCategoriesThunk, updatePopCategoryThunk } from "../thunks/categoryThunk";

const initialState = {
    categories: [],
    category: {},
    subCategories: [],
    popCategories: [],
    isLoading: false,
    error: null,
    alert: { message: "", type: "" },
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert = { message: "", type: "" };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoriesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload.categories;
            })
            .addCase(getCategoriesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getCategoryByIdThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoryByIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.category = action.payload.categories;
            })
            .addCase(getCategoryByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            //admin
            .addCase(createCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories.push(action.payload.categories);
                state.alert = { message: "Kategori başarılı şekilde oluşturuldu", type: "success" };
            })
            .addCase(createCategoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = state.categories.map((category) =>
                    category.id === action.payload.categories.id ? action.payload.categories : category
                );
            })
            .addCase(updateCategoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;

                // Gelen veriden silinen kategori ID'sini alıyoruz
                const deletedCategoryId = action.payload?.category?.id;

                if (!deletedCategoryId) {
                    console.error("Silme işleminde ID bulunamadı!", action.payload);
                    return;
                }

                state.categories = state.categories.filter(category => category.id !== deletedCategoryId);
                state.alert = { message: "Kategori başarılı şekilde silindi", type: "danger" };

            })
            .addCase(deleteCategoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            .addCase(getAllSubCategoriesThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSubCategoriesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subCategories = action.payload.subCategories;
            })
            .addCase(getAllSubCategoriesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            .addCase(getSubCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSubCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subCategories = action.payload.subCategories;
            })
            .addCase(getSubCategoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            //popüler kategoriler
            .addCase(getPopCategoriesThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPopCategoriesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.popCategories = action.payload.popCategories;
            })
            .addCase(getPopCategoriesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


            .addCase(updatePopCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePopCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.popCategories = state.popCategories.map((category) =>
                    category.id === action.payload.popCategories.id ? action.payload.popCategories : category
                );
            })
            .addCase(updatePopCategoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })



            .addCase(createSubCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSubCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subCategories.push(action.payload.subCategories);
                state.alert = { message: "Alt kategori başarılı şekilde oluşturuldu", type: "success" };
            })
            .addCase(createSubCategoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateSubCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSubCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subCategories = state.subCategories.map((category) =>
                    category.id === action.payload.categories.id ? action.payload.categories : category
                );
            })
            .addCase(updateSubCategoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteSubCategoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSubCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                // Gelen veriden silinen kategori ID'sini alıyoruz
                const deletedCategoryId = action.payload?.category?.id;
                if (!deletedCategoryId) {
                    console.error("Silme işleminde ID bulunamadı!", action.payload);
                    return;
                }
                state.subCategories = state.subCategories.filter(category => category.id !== deletedCategoryId);
                state.alert = { message: "Alt kategori başarılı şekilde silindi", type: "danger" };
            })
            .addCase(deleteSubCategoryThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

    },
});

export const { clearAlert } = categorySlice.actions;
export default categorySlice.reducer;   