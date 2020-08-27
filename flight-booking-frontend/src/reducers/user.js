import { FETCH_USER_DETAILS, USER_DETAILS_ERROR } from "../actions/types";

const DEFAULT_STATE = {
  userDetails: [],
  errorMessage: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case USER_DETAILS_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
