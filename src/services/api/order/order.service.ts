// order.service.ts
import {
  CANCEL_ORDER,
  CREATE_ORDER,
  DELETE_ORDER,
  GET_ORDER_DETAILS,
  LIST_CUSTOMER_ORDERS,
  LIST_DELIVERY_ORDERS,
  LIST_SELLER_ORDERS,
  UPDATE_ORDER_STATUS,
} from '../../../common/order.urls';

import {HttpService} from '../http.service';

export class OrderService extends HttpService {
  constructor() {
    super();
  }

  async createOrder(payload: any) {
    return await this.post(CREATE_ORDER, payload);
  }

  async listCustomerOrders() {
    return await this.get(LIST_CUSTOMER_ORDERS);
  }

  async cancelOrder(orderId: string, payload: any) {
    return await this.patch(CANCEL_ORDER(orderId), payload);
  }

  async listSellerOrders() {
    return await this.get(LIST_SELLER_ORDERS);
  }

  async listDeliveryOrders() {
    return await this.get(LIST_DELIVERY_ORDERS);
  }

  async getOrderDetails(orderId: string) {
    return await this.get(GET_ORDER_DETAILS(orderId));
  }

  async updateOrderStatus(orderId: string, payload: any) {
    return await this.patch(UPDATE_ORDER_STATUS(orderId), payload);
  }

  async deleteOrder(orderId: string) {
    return await this.delete(DELETE_ORDER(orderId));
  }
}

export const _orderService = new OrderService();
