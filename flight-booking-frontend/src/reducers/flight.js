import {
  SEARCH_FLIGHT,
  FLIGHT_ERROR,
  BOOK_FLIGHT,
  CLEAR_FLIGHT,
  FLIGHT_BOOK,
  STORE_USER_DETAILS,
  CLEAR_BOOKING,
} from "../actions/types";

const DEFAULT_STATE = {
  flights: [],
  flight: {},
  booking: {},
  userDetails: {},
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
        flight: action.payload,
      };
    case FLIGHT_BOOK:
      return {
        ...state,
        flights: [],
        booking: action.payload,
      };
    case CLEAR_BOOKING:
      return {
        ...state,
        booking: action.payload,
      };
    case STORE_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case CLEAR_FLIGHT:
      return {
        ...state,
        flights: [],
        flightId: {},
        booking: {},
        userDetails: {},
      };
    case FLIGHT_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
