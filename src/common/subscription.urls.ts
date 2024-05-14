// subscription.urls.ts
export const CREATE_SUBSCRIPTION = `subscriptions/create`;
export const LIST_SUBSCRIPTIONS = `subscriptions/list`;
// export const GET_SUBSCRIPTION_DETAILS = (subscriptionId: string) => `subscriptions/details/${subscriptionId}`;
export const GET_SUBSCRIPTION_DETAILS = `subscriptions/details`;
export const UPDATE_SUBSCRIPTION = (subscriptionId: string) =>
  `subscriptions/update/${subscriptionId}`;
export const CANCEL_SUBSCRIPTION = (subscriptionId: string) =>
  `subscriptions/cancel/${subscriptionId}`;
export const LIST_BUSINESS_SUBSCRIPTIONS = `subscriptions/business/list`;
export const USER_CONFIRM_DELIVERY = (subscriptionId: string) =>
  `subscriptions/user/confirm-delivery/${subscriptionId}`;
export const EMPLOYEE_CONFIRM_DELIVERY = (subscriptionId: string) =>
  `subscriptions/employee/confirm-delivery/${subscriptionId}`;
export const CREATE_SUBSCRIPTION_FOR_CUSTOMER_BY_BUSINESS = `subscriptions/create/customer/business`;
// "/create/customer/business",

export const ASSIGN_DELIVERY_TO_EMPLOYEE = `subscriptions/assign-delivery`;
export const GET_UPCOMING_DELIVERIES = `subscriptions/upcoming-deliveries`;
export const GET_UPCOMING_DELIVERIES_FOR_EMPLOYEE = `subscriptions/employee/upcoming-deliveries`;
export const GET_AVAILABLE_EMPLOYEES = `subscriptions/available-employees`;
export const GET_TODAYS_DELIVERIES = `subscriptions/todays-deliveries`;


