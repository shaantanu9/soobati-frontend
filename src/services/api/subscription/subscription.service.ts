// subscription.service.ts
import {
  ASSIGN_DELIVERY_TO_EMPLOYEE,
  CANCEL_SUBSCRIPTION,
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_FOR_CUSTOMER_BY_BUSINESS,
  EMPLOYEE_CONFIRM_DELIVERY,
  GET_AVAILABLE_EMPLOYEES,
  GET_SUBSCRIPTION_DETAILS,
  GET_TODAYS_DELIVERIES,
  GET_UPCOMING_DELIVERIES,
  GET_UPCOMING_DELIVERIES_FOR_EMPLOYEE,
  LIST_BUSINESS_SUBSCRIPTIONS,
  LIST_SUBSCRIPTIONS,
  UPDATE_SUBSCRIPTION,
  USER_CONFIRM_DELIVERY,
} from '../../../common/subscription.urls';
import {buildSubscriptionQueryPayload} from '../../../utils/interface';

import {HttpService} from '../http.service';

export class SubscriptionService extends HttpService {
  constructor() {
    super();
  }

  async createSubscription(payload: any) {
    return await this.post(CREATE_SUBSCRIPTION, payload);
  }

  async listSubscriptions() {
    return await this.get(LIST_SUBSCRIPTIONS);
  }

  // async getSubscriptionDetails(subscriptionId: string) {
  //   return await this.get(GET_SUBSCRIPTION_DETAILS(subscriptionId));
  // }
  async getSubscriptionDetails(query: buildSubscriptionQueryPayload) {
    const res = await this.get(GET_SUBSCRIPTION_DETAILS, query);

    return res;
  }

  async updateSubscription(subscriptionId: string, payload: any) {
    return await this.patch(UPDATE_SUBSCRIPTION(subscriptionId), payload);
  }

  async cancelSubscription(subscriptionId: string, payload: any) {
    return await this.patch(CANCEL_SUBSCRIPTION(subscriptionId), payload);
  }

  async listBusinessSubscriptions() {
    return await this.get(LIST_BUSINESS_SUBSCRIPTIONS);
  }
  async userConfirmDelivery(subscriptionId: string, payload: any) {
    return await this.patch(USER_CONFIRM_DELIVERY(subscriptionId), payload);
  }
  async employeeConfirmDelivery(subscriptionId: string, payload: any) {
    return await this.patch(EMPLOYEE_CONFIRM_DELIVERY(subscriptionId), payload);
  }
  async createSubscriptionForCustomerByBusiness(payload: any) {
    return await this.post(
      CREATE_SUBSCRIPTION_FOR_CUSTOMER_BY_BUSINESS,
      payload,
    );
  }

  async assignDeliveryToEmployee(payload: {
    subscriptionIds: string[];
    employeeId: string;
  }) {
    return await this.patch(ASSIGN_DELIVERY_TO_EMPLOYEE, payload);
  }

  async getUpcomingDeliveries(payload: {
    businessId: string;
    status?: string;
    date?: string;
    subscriptionId?: string;
    nextDeliveryDate?: string;
  }) {
    return await this.get(GET_UPCOMING_DELIVERIES, payload);
  }

  async getUpcomingDeliveriesForEmployee() {
    return await this.get(GET_UPCOMING_DELIVERIES_FOR_EMPLOYEE);
  }

  async getAvailableEmployees() {
    return await this.get(GET_AVAILABLE_EMPLOYEES);
  }

  async getTodaysDeliveries(payload: {
    // 663471388ed18c483fd21bc1
    businessId: string;
    status?: string;
    date?: string;
  }) {
    return await this.get(GET_TODAYS_DELIVERIES, payload);
  }
}

export const _subscriptionService = new SubscriptionService();
