// product.urls.ts
export const CREATE_PRODUCT = `products`;
export const GET_ALL_PRODUCTS = `products`;
export const GET_PRODUCT_BY_ID = (id: string) => `products/${id}`;
export const UPDATE_PRODUCT = (id: string) => `products/${id}`;
export const DELETE_PRODUCT = (id: string) => `products/${id}`;
export const LIST_PRODUCTS_BY_CATEGORY = (category: string) =>
  `products/category/${category}`;
export const GET_IMAGEKIT_AUTH = `products/get-imagekit-auth`;
