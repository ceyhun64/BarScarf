import { createSlice } from '@reduxjs/toolkit';
import { getProductsThunk, getProductByIdThunk, getProductsByCategoryThunk, getProductsBySubcategoryThunk, getProductsByNameThunk, getProductsByColorThunk, createProductThunk, updateProductThunk, deleteProductThunk } from '../thunks/productThunk';

const initialState = {
    products: [],
    product: {},
    error: null,
    loading: false,
    alert: { message: "", type: "" }
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert = { message: "", type: "" };
        },
        sortByNameAsc: (state) => {
            state.products.sort((a, b) => a.name.localeCompare(b.name));
        },
        sortByNameDesc: (state) => {
            state.products.sort((a, b) => b.name.localeCompare(a.name));
        },
        sortByPriceAsc: (state) => {
            state.products.sort((a, b) => a.price - b.price);
        },
        sortByPriceDesc: (state) => {
            state.products.sort((a, b) => b.price - a.price);
        },
    },
    extraReducers: (builder) => {
        builder

            // getProductsThunk
            .addCase(getProductsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })

            // getProductByIdThunk
            .addCase(getProductByIdThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product;
            })
            .addCase(getProductByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })

            // getProductsByCategoryThunk
            .addCase(getProductsByCategoryThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsByCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(getProductsByCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })

            //getProductsBySubcategoryThunk
            .addCase(getProductsBySubcategoryThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsBySubcategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(getProductsBySubcategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })



            .addCase(getProductsByNameThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsByNameThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(getProductsByNameThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })

            .addCase(getProductsByColorThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsByColorThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products; // Veriyi action.payload'dan al
            })
            .addCase(getProductsByColorThunk.rejected, (state, action) => {
                state.loading = false;
                // Hata durumunda gelen mesajı action.payload'dan al
                state.error = action.payload ? action.payload.error || action.payload : 'Bir hata oluştu';
            })

            //admin
            .addCase(createProductThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.alert = { message: "Ürün başarıyla oluşturuldu!", type: "success" };
            })
            .addCase(createProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(updateProductThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.alert = { message: "Ürün başarıyla oluşturuldu!", type: "success" };

            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;

            })
            .addCase(deleteProductThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    }
})
export const {
    clearAlert,
    sortByNameAsc,
    sortByNameDesc,
    sortByPriceAsc,
    sortByPriceDesc,

} = productSlice.actions;
export default productSlice.reducer;