// src/features/deliveryTaskThunk.ts
import {createAsyncThunk} from '@reduxjs/toolkit';
import {_deliveryTaskService} from '../../../services/api/deliveryTask';

// Create a delivery task
export const createDeliveryTask = createAsyncThunk(
  'deliveryTask/create',
  async (payload: any, {rejectWithValue}) => {
    try {
      const response = await _deliveryTaskService.createDeliveryTask(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Update a delivery task
export const updateDeliveryTask = createAsyncThunk(
  'deliveryTask/update',
  async (
    {taskId, payload}: {taskId: string; payload: any},
    {rejectWithValue},
  ) => {
    try {
      const response = await _deliveryTaskService.updateDeliveryTask(
        taskId,
        payload,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete a delivery task
export const deleteDeliveryTask = createAsyncThunk(
  'deliveryTask/delete',
  async (taskId: string, {rejectWithValue}) => {
    try {
      const response = await _deliveryTaskService.deleteDeliveryTask(taskId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Fetch all delivery tasks
export const listDeliveryTasks = createAsyncThunk(
  'deliveryTask/list',
  async (_, {rejectWithValue}) => {
    try {
      const response = await _deliveryTaskService.listDeliveryTasks();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Fetch delivery task details
export const getDeliveryTaskDetails = createAsyncThunk(
  'deliveryTask/details',
  async (taskId: string, {rejectWithValue}) => {
    try {
      const response = await _deliveryTaskService.getDeliveryTaskDetails(
        taskId,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Complete a delivery task
export const completeDeliveryTask = createAsyncThunk(
  'deliveryTask/complete',
  async (taskId: string, {rejectWithValue}) => {
    try {
      const response = await _deliveryTaskService.completeDeliveryTask(taskId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
