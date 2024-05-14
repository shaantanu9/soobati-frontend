// business.urls.ts
export const CREATE_BUSINESS = `business/create`;
export const UPDATE_BUSINESS = (businessId: string) => `business/update/${businessId}`;
export const DELETE_BUSINESS = (businessId: string) => `business/delete/${businessId}`;
export const LIST_BUSINESSES = `business`;
export const GET_BUSINESS_DETAILS = (businessId: string) => `business/${businessId}`;
export const ADD_EMPLOYEE_TO_BUSINESS = (businessId: string) => `business/${businessId}/add-employee`;
export const REMOVE_EMPLOYEE_FROM_BUSINESS = (businessId: string) => `business/${businessId}/remove-employee`;
export const UPDATE_EMPLOYEE_IN_BUSINESS = (businessId: string) => `business/${businessId}/update-employee`;
