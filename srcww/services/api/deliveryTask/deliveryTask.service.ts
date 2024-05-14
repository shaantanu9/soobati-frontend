// src/services/api/deliveryTask.service.ts
import { HttpService } from '../http.service';
import {
  CREATE_DELIVERY_TASK,
  UPDATE_DELIVERY_TASK,
  DELETE_DELIVERY_TASK,
  LIST_DELIVERY_TASKS,
  LIST_ASSIGNED_TASKS,
  COMPLETE_DELIVERY_TASK,
  GET_DELIVERY_TASK_DETAILS,
} from '../../../common/deliveryTask.urls';

export class DeliveryTaskService extends HttpService {
  constructor() {
    super();
  }

  async createDeliveryTask(payload: any) {
    return await this.post(CREATE_DELIVERY_TASK, payload);
  }

  async updateDeliveryTask(taskId: string, payload: any) {
    return await this.patch(UPDATE_DELIVERY_TASK(taskId), payload);
  }

  async deleteDeliveryTask(taskId: string) {
    return await this.delete(DELETE_DELIVERY_TASK(taskId));
  }

  async listDeliveryTasks() {
    return await this.get(LIST_DELIVERY_TASKS);
  }

  async listAssignedTasks() {
    return await this.get(LIST_ASSIGNED_TASKS);
  }

  async completeDeliveryTask(taskId: string) {
    return await this.patch(COMPLETE_DELIVERY_TASK(taskId), {});
  }

  async getDeliveryTaskDetails(taskId: string) {
    return await this.get(GET_DELIVERY_TASK_DETAILS(taskId));
  }
}

export const _deliveryTaskService = new DeliveryTaskService();
