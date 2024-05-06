import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  cancelSubscription,
  createSubscription,
  fetchSubscriptions,
  updateSubscription,
} from './subscriptionThunk';
interface SubscriptionItem {
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  businessId: string;
  businessName: string;
  frequency: string;
  startDate: Date;
  nextDeliveryDate: Date;
  deliveries: {
    date: Date;
    employeeId: string;
    employeeName: string;
    status: string;
  }[];
  active: boolean;
}

interface SubscriptionState {
  subscriptions: SubscriptionItem[];
  selectedSubscription: SubscriptionItem | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  selectedSubscription: null,
  status: 'idle',
  error: null,
};

export const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    selectSubscription: (state, action: PayloadAction<string>) => {
      state.selectedSubscription =
        state.subscriptions.find(s => s.productId === action.payload) || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSubscriptions.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.subscriptions.push(action.payload);
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        const index = state.subscriptions.findIndex(
          sub => sub.productId === action.payload.subscriptionId,
        );
        if (index !== -1) {
          state.subscriptions[index] = {
            ...state.subscriptions[index],
            ...action.payload.updateData,
          };
        }
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.subscriptions = state.subscriptions.filter(
          sub => sub.productId !== action.payload,
        );
      });
  },
});

export const {selectSubscription} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
