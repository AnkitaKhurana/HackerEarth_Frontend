import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

const middleware = [thunk];
const initialState = {
	products: localStorage.getItem('products')?JSON.parse(localStorage.getItem('products')):{},
	cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):{},
	cartCost: localStorage.getItem('cartCost')?parseInt(localStorage.getItem('cartCost')):0,
	cartEmpty: localStorage.getItem('cartEmpty')||true,
	lastItemAdded: localStorage.getItem('lastItemAdded')||"",
	discount: localStorage.getItem('discount')?parseInt(localStorage.getItem('discount')):0,
	typeDiscount: localStorage.getItem('typeDiscount')?parseInt(localStorage.getItem('typeDiscount')):0,
	cartTotal: localStorage.getItem('cartTotal')?parseInt(localStorage.getItem('cartTotal')):0,
	orderTotal: localStorage.getItem('orderTotal')?parseInt(localStorage.getItem('orderTotal')):0,
};
const store = createStore(
	rootReducer, 
	initialState, 
	applyMiddleware(...middleware)
	);

store.subscribe(() => {
	localStorage.setItem('products', JSON.stringify(store.getState().reducer.products)); 
	localStorage.setItem('cartItems', JSON.stringify(store.getState().reducer.cartItems)); 
	localStorage.setItem('cartCost', store.getState().reducer.cartCost); 
	localStorage.setItem('cartEmpty', store.getState().reducer.cartEmpty); 
	localStorage.setItem('lastItemAdded', store.getState().reducer.lastItemAdded); 
	localStorage.setItem('discount', store.getState().reducer.discount); 
	localStorage.setItem('cartTotal', store.getState().reducer.cartTotal); 
	localStorage.setItem('typeDiscount', store.getState().reducer.typeDiscount); 
	localStorage.setItem('orderTotal', store.getState().reducer.orderTotal); 

})


export default store;