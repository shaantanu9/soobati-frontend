import {SET_FIELD} from './AppTypes';

export const setField = (field: string, value: any) => {
  return {
    type: SET_FIELD,
    payload: {field, value},
  };
};
