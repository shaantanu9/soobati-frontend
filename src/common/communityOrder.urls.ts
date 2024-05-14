// communityOrder.urls.ts
export const CREATE_COMMUNITY_ORDER = `community-order/create`;
export const LIST_COMMUNITY_ORDERS = `community-order`;
export const GET_COMMUNITY_ORDER_DETAILS = (id: string) =>
  `community-order/details/${id}`;
export const UPDATE_COMMUNITY_ORDER = (orderId: string) =>
  `community-order/update/${orderId}`;
export const DELETE_COMMUNITY_ORDER = (orderId: string) =>
  `community-order/delete/${orderId}`;
export const LIST_COMMUNITY_ORDERS_BY_PRODUCT = (productId: string) =>
  `community-order/product/${productId}`;
export const ADD_PARTICIPANT_TO_COMMUNITY_ORDER = (orderId: string) =>
  `community-order/add-participant/${orderId}`;
