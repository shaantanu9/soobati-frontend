// src/common/deliveryTask.urls.ts
export const CREATE_DELIVERY_TASK = `deliveryTask/create`;
export const UPDATE_DELIVERY_TASK = (taskId: string) => `deliveryTask/update/${taskId}`;
export const DELETE_DELIVERY_TASK = (taskId: string) => `deliveryTask/delete/${taskId}`;
export const LIST_DELIVERY_TASKS = `deliveryTask/list`;
export const LIST_ASSIGNED_TASKS = `deliveryTask/assigned`;
export const COMPLETE_DELIVERY_TASK = (taskId: string) => `deliveryTask/complete/${taskId}`;
export const GET_DELIVERY_TASK_DETAILS = (taskId: string) => `deliveryTask/details/${taskId}`;
