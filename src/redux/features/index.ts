import {combineReducers} from 'redux';
import businessReducer from './business/businessSlice';
import canReducer from './canSlice';
import cartReducer from './cart/cartSlice';
import deliveryTaskReducer from './deliveryTask/deliveryTaskSlice';
import orderReducer from './order/orderSlice';
import productReducer from './product/productSlice';
import subscriptionReducer from './subscription/subscriptionSlice';
import userReducer from './userSlice';
const rootReducer = combineReducers({
  user: userReducer,
  can: canReducer,
  cart: cartReducer,
  product: productReducer,
  order: orderReducer,
  subscription: subscriptionReducer,
  deliveryTask: deliveryTaskReducer,
  business: businessReducer,
});

export default rootReducer;
