import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import secretReducer from "./secret";
import flightReducer from "./flight";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  secret: secretReducer,
  flight: flightReducer,
});
