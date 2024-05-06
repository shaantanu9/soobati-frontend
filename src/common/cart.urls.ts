// cart.urls.ts
export const ADD_ITEM_TO_CART = `carts`;
export const REMOVE_ITEM_FROM_CART = (itemId: string) => `carts/${itemId}`;
export const UPDATE_ITEM_QUANTITY_IN_CART = (itemId: string) => `carts/${itemId}`;
export const GET_CART = `carts`;
