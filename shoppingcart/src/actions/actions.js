import { fetchProducts, addToCart, reduceFromCart, deleteFromCart, showToast } from './types';

export const fetchProductsAction = () => (dispatch) => {
    fetch('https://api.myjson.com/bins/qhnfp')
        .then(res => res.json())
        .then(data => dispatch({
            type: fetchProducts,
            result: data
        }));
};

export const addToCartAction = (data) => (dispatch) => {
    dispatch({
        type: addToCart,
        result: data
    });
};

export const reduceFromCartAction = (data) => (dispatch) => {
    dispatch({
        type: reduceFromCart,
        result: data
    });
};

export const deleteFromCartAction = (data) => (dispatch) => {
    dispatch({
        type: deleteFromCart,
        result: data
    });
};

export const showToastFunction = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: showToast
        });
    }, 3000);

}
