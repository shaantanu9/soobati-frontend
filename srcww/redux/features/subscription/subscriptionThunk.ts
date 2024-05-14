import {createAsyncThunk} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {_subscriptionService} from '../../../services/api/subscription';
import {buildSubscriptionQueryPayload} from '../../../utils/interface';

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async (_, {rejectWithValue}) => {
    try {
      const response = await _subscriptionService.listSubscriptions();
      return response.data; // Assuming response.data contains the array of subscriptions
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUserSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async (query: buildSubscriptionQueryPayload, {rejectWithValue}) => {
    try {
      const response = await _subscriptionService.getSubscriptionDetails({
        startDate: dayjs.utc().startOf('month').toISOString(),
        endDate: dayjs.utc().endOf('month').toISOString(),
        type: 'user',
        ...query,
      });

      return response.data; // Assuming response.data contains the array of subscriptions
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createSubscription = createAsyncThunk(
  'subscriptions/createSubscription',
  async (subscriptionData: any, {rejectWithValue}) => {
    try {
      const response = await _subscriptionService.createSubscription(
        subscriptionData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// /create/customer/business

export const updateSubscription = createAsyncThunk(
  'subscriptions/updateSubscription',
  async (
    {subscriptionId, updateData}: {subscriptionId: string; updateData: any},
    {rejectWithValue},
  ) => {
    try {
      const response = await _subscriptionService.updateSubscription(
        subscriptionId,
        updateData,
      );
      return {subscriptionId, updateData, data: response.data};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const cancelSubscription = createAsyncThunk(
  'subscriptions/cancelSubscription',
  async (subscriptionId: string, {rejectWithValue}) => {
    try {
      await _subscriptionService.cancelSubscription(subscriptionId, {
        status: 'cancelled',
      });
      return subscriptionId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const userConfirmDelivery = createAsyncThunk(
  'subscriptions/userConfirmDelivery',
  async (
    {
      subscriptionId,
      payload,
    }: {
      subscriptionId: string;
      payload: {status: string; feedback: string; quantity: string};
    },
    {rejectWithValue},
  ) => {
    try {
      const confirm = await _subscriptionService.userConfirmDelivery(
        subscriptionId,
        payload,
      );

      return confirm;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);


