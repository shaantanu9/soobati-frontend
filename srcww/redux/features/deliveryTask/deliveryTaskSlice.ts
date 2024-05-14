import {createSlice} from '@reduxjs/toolkit';
import {
  completeDeliveryTask,
  createDeliveryTask,
  deleteDeliveryTask,
  getDeliveryTaskDetails,
  listDeliveryTasks,
  updateDeliveryTask,
} from './deliveryTaskThunk';

interface DeliveryTaskState {
  tasks: any[];
  taskDetails: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DeliveryTaskState = {
  tasks: [],
  taskDetails: null,
  status: 'idle',
  error: null,
};

// src/features/deliveryTaskSlice.ts

const deliveryTaskSlice = createSlice({
  name: 'deliveryTask',
  initialState,
  reducers: {
    resetTaskDetails: state => {
      state.taskDetails = null;
    },
  },
  extraReducers: builder => {
    builder
      // Handle create delivery task
      .addCase(createDeliveryTask.pending, state => {
        state.status = 'loading';
      })
      .addCase(createDeliveryTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createDeliveryTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Handle update delivery task
      .addCase(updateDeliveryTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          t => t._id === action.meta.arg.taskId,
        );
        if (index !== -1) {
          state.tasks[index] = {...state.tasks[index], ...action.payload};
        }
        state.status = 'succeeded';
      })

      // Handle delete delivery task
      .addCase(deleteDeliveryTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.meta.arg);
        state.status = 'succeeded';
      })

      // Handle list delivery tasks
      .addCase(listDeliveryTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'succeeded';
      })

      // Handle get delivery task details
      .addCase(getDeliveryTaskDetails.fulfilled, (state, action) => {
        state.taskDetails = action.payload;
        state.status = 'succeeded';
      })

      // Handle complete delivery task
      .addCase(completeDeliveryTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t._id === action.meta.arg);
        if (index !== -1) {
          state.tasks[index].completed = true;
        }
        state.status = 'succeeded';
      });
  },
});

export const {resetTaskDetails} = deliveryTaskSlice.actions;
export default deliveryTaskSlice.reducer;
