// order.urls.ts
export const CREATE_ORDER = `orders/customer/create`;
export const LIST_CUSTOMER_ORDERS = `orders/customer/orders`;
export const CANCEL_ORDER = (orderId: string) =>
  `orders/customer/cancel/${orderId}`;
export const LIST_SELLER_ORDERS = `orders/seller/orders`;
export const LIST_DELIVERY_ORDERS = `orders/delivery/orders`;
export const GET_ORDER_DETAILS = (orderId: string) => `orders/${orderId}`;
export const UPDATE_ORDER_STATUS = (orderId: string) =>
  `orders/update/${orderId}`;
export const DELETE_ORDER = (orderId: string) => `orders/delete/${orderId}`;
