import {
  CARD_FETCH_START,
  CARD_FETCH_SUCCESS,
  CARD_FETCH_ERROR,
} from '../actions/types';

const DEFAULT_CARDS_STATE = {
  loading: false,
  error: null,
};

export default function(state = DEFAULT_CARDS_STATE, action) {
  if (action.type === CARD_FETCH_START) {
    return {
      loading: true,
      error: null,
    };
  }
  if (action.type === CARD_FETCH_SUCCESS) {
    return {
      loading: false,
      error: null,
    };
  }
  if (action.type === CARD_FETCH_ERROR) {
    return {
      loading: false,
      error: action.error,
    };
  }
  return state;
}