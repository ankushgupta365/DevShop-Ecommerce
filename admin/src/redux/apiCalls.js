import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, productFailure, productStart, productSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", {
            ...user
        })
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const getProducts = async (dispatch) => {
    dispatch(productStart());
    try {
        const res = await publicRequest.get("/products")
        dispatch(productSuccess(res.data));
    } catch (error) {
        dispatch(productFailure())
    }
}



export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        //for now commented out deleting from db bcz then again i need to insert the objects
        // const res = await userRequest.get("/products")
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure())
    }
}

export const updateProducts = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    console.log(product)
    try {
        const res = await userRequest.put(`/products/${id}`, product )
        dispatch(updateProductSuccess({ id, product }));
    } catch (error) {
        dispatch(updateProductFailure())
    }
}

export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post("/products",  product )
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure())
    }
}