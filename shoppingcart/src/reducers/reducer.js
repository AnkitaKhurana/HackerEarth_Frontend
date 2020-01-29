import { fetchProducts, addToCart, reduceFromCart, deleteFromCart, showToast } from '../actions/types';

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
export default function (state = initialState, action) {
  let current = state.cartItems, total = state.cartCost, discountTemp = state.discount, typeDiscountTemp = state.typeDiscount, cartTotalTemp = state.cartTotal, orderTotalTemp = state.orderTotal;

  switch (action.type) {
    case fetchProducts:
      let obj = {};
      action.result.map(item => {
        obj[item.id] = item;
      });

      return {
        ...state,
        products: obj
      };
    case addToCart:
      if (current[action.result.product.id])
        current[action.result.product.id]++;
      else {
        current[action.result.product.id] = 1;
        discountTemp += action.result.product.discount;
        if (action.result.product.type === 'fiction')
          typeDiscountTemp += 15;
      }
      cartTotalTemp += action.result.product.price;
      total++;
      orderTotalTemp = cartTotalTemp - (typeDiscountTemp + discountTemp) * (cartTotalTemp) / 100;
      return {
        ...state,
        cartItems: current,
        cartCost: total,
        lastItemAdded: action.result.product.name,
        typeDiscount: typeDiscountTemp,
        discount: discountTemp,
        cartTotal: cartTotalTemp,
        orderTotal: orderTotalTemp
      };
    case showToast:
      return {
        ...state,
        lastItemAdded:""
      };
    case deleteFromCart:
      total -= current[action.result.product.id];
      cartTotalTemp -= action.result.product.price * current[action.result.product.id];
      discountTemp -= action.result.product.discount;
      if (action.result.product.type === 'fiction')
        typeDiscountTemp -= 15;
      delete current[action.result.product.id];
      orderTotalTemp = cartTotalTemp - (typeDiscountTemp + discountTemp) * (cartTotalTemp) / 100;
      return {
        ...state,
        cartItems: current,
        cartCost: total,
        typeDiscount: typeDiscountTemp,
        discount: discountTemp,
        cartTotal: cartTotalTemp,
        orderTotal: orderTotalTemp
      };

    case reduceFromCart:
      cartTotalTemp -= action.result.product.price;
      if (current[action.result.product.id] > 1) {
        current[action.result.product.id]--;
      }

      else {
        discountTemp -= action.result.product.discount;
        if (action.result.product.type === 'fiction')
          typeDiscountTemp -= 15;
        delete current[action.result.product.id];
      }

      total--;
      orderTotalTemp = cartTotalTemp - (typeDiscountTemp + discountTemp) * (cartTotalTemp) / 100;

      return {
        ...state,
        cartItems: current,
        cartCost: total,
        typeDiscount: typeDiscountTemp,
        discount: discountTemp,
        cartTotal: cartTotalTemp,
        orderTotal: orderTotalTemp
      };

    default: return state;
  }
}