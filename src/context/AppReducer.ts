import {State} from './AppContext';
import {SET_FIELD} from './AppTypes';

interface Action {
  type: string;
  payload: any;
}

const initialState: State = {
  userData: {},
  search: '',
};

export default function appReducer(
  state: State = initialState,
  action: Action,
): State {
  switch (action.type) {
    case SET_FIELD:
      return {...state, [action.payload.field]: action.payload.value};
    default:
      return state;
  }
}
