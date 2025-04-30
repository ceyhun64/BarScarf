import { createSlice } from "@reduxjs/toolkit";
import {
    addToCartThunk,
    deleteProductCartThunk,
    getCartThunk,
    getProductCartThunk,
    clearCartThunk,
    updateProductCartThunk,
} from "../thunks/cartThunk";

const initialState = {
    cart: [],
    cartLoading: false,
    cartError: null,
    productCart: [],
    productCartLoading: false,
    productCartError: null,
    alert: {
        message: "",
        type: "",
    },
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert.message = "";
            state.alert.type = "";
        },
    },
    extraReducers(builder) {
        builder
            // get cart
            .addCase(getCartThunk.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(getCartThunk.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cart = action.payload;
            })
            .addCase(getCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.error.message;
            })

            // get product cart
            .addCase(getProductCartThunk.pending, (state) => {
                state.productCartLoading = true;
            })
            .addCase(getProductCartThunk.fulfilled, (state, action) => {
                state.productCartLoading = false;
                state.productCart = action.payload;
            })
            .addCase(getProductCartThunk.rejected, (state, action) => {
                state.productCartLoading = false;
                state.productCartError = action.error.message;
            })

            // add to cart
            .addCase(addToCartThunk.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(addToCartThunk.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.alert = {
                    message: "Ürün sepete eklendi",
                    type: "success"
                }
                const existingProduct = state.cart.find(
                    (item) =>
                        item.productId === action.payload.productId
                );

                if (existingProduct) {
                    // Eğer ürün zaten varsa, quantity'yi artır
                    existingProduct.quantity += action.payload.quantity;
                } else {
                    // Yoksa, yeni ürünü sepete ekle
                    state.cart.push(action.payload);
                }
            })
            .addCase(addToCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.error.message;
            })

            // delete product cart
            .addCase(deleteProductCartThunk.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(deleteProductCartThunk.fulfilled, (state, action) => {
                state.cartLoading = false;

                state.alert = {
                    message: "Ürün sepetten silindi",
                    type: "danger"
                }
                // Silinen ürünün sepetteki kopyasını kaldır
                const { productId } = action.payload;
                state.cart = state.cart.filter(
                    (item) =>
                        item.productId !== productId
                );
            })
            .addCase(deleteProductCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.error.message;
            })

            // update product cart
            .addCase(updateProductCartThunk.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(updateProductCartThunk.fulfilled, (state, action) => {
                state.cartLoading = false;

                // Güncellenen ürünün quantity'sini güncelle
                const { productId, newQuantity } = action.payload;
                const product = state.cart.find(
                    (item) =>
                        item.productId === productId
                );
                state.alert = {
                    message: "Sepetteki ürün güncellendi",
                    type: "success"
                }

                if (product) {
                    product.quantity = newQuantity;
                }
            })
            .addCase(updateProductCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.error.message;
            })

            // clear cart
            .addCase(clearCartThunk.pending, (state) => {
                state.cartLoading = true;
            })
            .addCase(clearCartThunk.fulfilled, (state) => {
                state.cartLoading = false;
                state.alert = {
                    message: "Sepet temizlendi",
                    type: "danger"
                }
                state.cart = []; // Sepeti temizle
            })
            .addCase(clearCartThunk.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.error?.message || 'Sepet temizlenirken bir hata oluştu';
            });

    },
});

export const { clearAlert } = cartSlice.actions;
export default cartSlice.reducer;
