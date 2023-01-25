import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        isFetching: false,
        products: [],
        error: false,
    },
    reducers: {
        //get products
        productStart: (state) => {
            state.isFetching = true
        },
        productSuccess: (state, action) => {
            state.products = action.payload;
            state.isFetching = false;
        },
        productFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        },


        //delete products
        deleteProductStart: (state) => {
            state.isFetching = true
        },
        deleteProductSuccess: (state, action) => {
            state.products.splice(state.products.findIndex(item => item._id == action.payload),
                1);
            state.isFetching = false;
        },
        deleteProductFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        },

        //update products
        updateProductStart: (state) => {
            state.isFetching = true
        },
        updateProductSuccess: (state, action) => {
            state.products[state.products.findIndex(item=>item._id === action.payload.id)] =action.payload.product;
           state.isFetching = false;
        },
        updateProductFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        },

        //add products
        addProductStart: (state) => {
            state.isFetching = true
        },
        addProductSuccess: (state, action) => {
            state.products.push(action.payload);
            state.isFetching = false;
        },
        addProductFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        }
    }
})

export const { productFailure, productStart, productSuccess,deleteProductStart,deleteProductSuccess,deleteProductFailure,updateProductStart,updateProductSuccess,updateProductFailure,addProductStart,addProductSuccess,addProductFailure } = productSlice.actions;
export default productSlice.reducer;