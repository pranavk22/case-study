import { SEARCH_FLIGHT, FLIGHT_ERROR, BOOK_FLIGHT, CLEAR_FLIGHT } from "../actions/types";

const DEFAULT_STATE = {
  flights: [],
  flightId: "",
  errorMessage: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_FLIGHT:
      return {
        ...state,
        flights: action.payload,
      };
    case BOOK_FLIGHT:
      return {
        ...state,
        flights: [],
        flightId: action.payload,
      };
    case CLEAR_FLIGHT:
      return {
        ...state,
        flights: [],
        flightId: '',
      }
    case FLIGHT_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
