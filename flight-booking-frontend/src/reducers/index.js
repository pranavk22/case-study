import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import secretReducer from "./secret";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  secret: secretReducer,
});
