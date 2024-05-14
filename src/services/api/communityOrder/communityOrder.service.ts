// communityOrder.service.ts
import {
  CREATE_COMMUNITY_ORDER,
  DELETE_COMMUNITY_ORDER,
  GET_COMMUNITY_ORDER_DETAILS,
  LIST_COMMUNITY_ORDERS,
  LIST_COMMUNITY_ORDERS_BY_PRODUCT,
  UPDATE_COMMUNITY_ORDER,
  ADD_PARTICIPANT_TO_COMMUNITY_ORDER,
} from '../../../common/communityOrder.urls';
import {BuildCommunityOrderQueryPayload} from '../../../utils/interface';

import {HttpService} from '../http.service';

export class CommunityOrderService extends HttpService {
  constructor() {
    super();
  }

  async createCommunityOrder(payload: any) {
    return await this.post(CREATE_COMMUNITY_ORDER, payload);
  }

  async listCommunityOrders(payload: BuildCommunityOrderQueryPayload) {
    return await this.get(LIST_COMMUNITY_ORDERS, payload);
  }

  async getCommunityOrderDetails(orderId: string) {
    return await this.get(GET_COMMUNITY_ORDER_DETAILS(orderId));
  }

  async updateCommunityOrder(orderId: string, payload: any) {
    return await this.patch(UPDATE_COMMUNITY_ORDER(orderId), payload);
  }

  async deleteCommunityOrder(orderId: string) {
    return await this.delete(DELETE_COMMUNITY_ORDER(orderId));
  }

  async listCommunityOrdersByProduct(productId: string) {
    return await this.get(LIST_COMMUNITY_ORDERS_BY_PRODUCT(productId));
  }

  async addParticipantToCommunityOrder(orderId: string, payload: any) {
    return await this.patch(ADD_PARTICIPANT_TO_COMMUNITY_ORDER(orderId), payload);
  }
}

export const _communityOrderService = new CommunityOrderService();
