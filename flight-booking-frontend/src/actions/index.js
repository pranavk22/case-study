import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  GET_SECRET,
  SEARCH_FLIGHT,
  FLIGHT_ERROR,
} from "./types";

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    console.log(data);
    const res = await axios.post("http://localhost:9300/google", {
      access_token: data,
    });
    console.log(res);
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    const authHeader = "Bearer " + res.data.token;
    axios.defaults.headers.common["Authorization"] = authHeader;
  };
};

export const oauthFacebook = (data) => {
  return async (dispatch) => {
    console.log(data);
    const res = await axios.post("http://localhost:9300/facebook", {
      access_token: data,
    });
    console.log(res);
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    const authHeader = "Bearer " + res.data.token;
    axios.defaults.headers.common["Authorization"] = authHeader;
  };
};

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const user = {
        email: data.email,
        password: data.password1,
      };
      const res = await axios.post("http://localhost:9300/signup", user);
      console.log(res);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      const authHeader = "Bearer " + res.data.token;
      axios.defaults.headers.common["Authorization"] = authHeader;
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use",
      });
      console.log(error);
    }
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:9300/signin", data);
      console.log(res);
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      const authHeader = "Bearer " + res.data.token;
      axios.defaults.headers.common["Authorization"] = authHeader;
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email or password isn't correct",
      });
      console.log(error);
    }
  };
};

export const validateSignUp = (data) => {
  return (dispatch) => {
    if (data.email && data.password1 && data.password2) {
      if (data.password1 !== data.password2) {
        dispatch({
          type: AUTH_ERROR,
          payload: "Passwords don't match",
        });
        return false;
      } else return true;
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: "All fields are required",
      });
      return false;
    }
  };
};

export const validateSignIn = (data) => {
  return (dispatch) => {
    if (data.email && data.password) {
      return true;
    } else {
      dispatch({
        type: AUTH_ERROR,
        payload: "All fields are required",
      });
      return false;
    }
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:9300/secret");
      console.log(res);
      dispatch({
        type: GET_SECRET,
        payload: res.data.secret,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: "",
    });
  };
};

export const searchFlight = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:9000/flights/search",
        data
      );
      console.log(res.data);

      dispatch({
        type: SEARCH_FLIGHT,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      dispatch({
        type: FLIGHT_ERROR,
        payload: "Could not get any flights",
      });
      console.log(error);
    }
  };
};
