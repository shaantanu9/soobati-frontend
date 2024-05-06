// business.service.ts
import {
  ADD_EMPLOYEE_TO_BUSINESS,
  CREATE_BUSINESS,
  DELETE_BUSINESS,
  GET_BUSINESS_DETAILS,
  LIST_BUSINESSES,
  REMOVE_EMPLOYEE_FROM_BUSINESS,
  UPDATE_BUSINESS,
  UPDATE_EMPLOYEE_IN_BUSINESS,
} from '../../../common/business.urls';

import {HttpService} from '../http.service';

export class BusinessService extends HttpService {
  constructor() {
    super();
  }

  async createBusiness(payload: any) {
    return await this.post(CREATE_BUSINESS, payload);
  }

  async updateBusiness(businessId: string, payload: any) {
    return await this.patch(UPDATE_BUSINESS(businessId), payload);
  }

  async deleteBusiness(businessId: string) {
    return await this.delete(DELETE_BUSINESS(businessId));
  }

  async listBusinesses() {
    return await this.get(LIST_BUSINESSES);
  }

  async getBusinessDetails(businessId: string) {
    return await this.get(GET_BUSINESS_DETAILS(businessId));
  }

  async addEmployeeToBusiness(businessId: string, payload: any) {
    return await this.post(ADD_EMPLOYEE_TO_BUSINESS(businessId), payload);
  }

  async removeEmployeeFromBusiness(businessId: string, employeeId: string) {
    return await this.delete(REMOVE_EMPLOYEE_FROM_BUSINESS(businessId), {
      employeeId,
    });
  }

  async updateEmployeeInBusiness(
    businessId: string,
    employeeId: string,
    payload: any,
  ) {
    return await this.patch(UPDATE_EMPLOYEE_IN_BUSINESS(businessId), payload);
  }
}

export const _businessService = new BusinessService();
