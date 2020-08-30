import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import axios from "axios";

import Header from "./components/Header";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import BookFlight from "./components/BookFlight";
import MyFlights from "./components/MyFlights";
import Flights from "./components/Flights";
import Payments from "./components/Payments";
import SuccessPage from "./components/SuccessPage";
import reducers from "./reducers";

import authGuard from "./components/authGuard";
import adminGuard from "./components/adminGuard";

const jwtToken = localStorage.getItem("JWT_TOKEN");
const authHeader = "Bearer " + jwtToken;
console.log(authHeader);

axios.defaults.headers.common["Authorization"] = authHeader;

function App() {
  return (
    <Provider
      store={createStore(
        reducers,
        {
          auth: {
            isAuthenticated: jwtToken ? true : false,
            token: jwtToken,
          },
        },
        applyMiddleware(reduxThunk)
      )}
    >
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact strict component={Home} />
          <div className="container">
            <Route
              path="/flights"
              exact
              strict
              component={adminGuard(Flights)}
            />

            <Route
              path="/book"
              exact
              strict
              component={authGuard(BookFlight)}
            />
            <Route
              path="/payments"
              exact
              strict
              component={authGuard(Payments)}
            />
            <Route
              path="/successpage"
              exact
              strict
              component={authGuard(SuccessPage)}
            />
            <Route path="/signup" exact strict component={SignUp} />
            <Route path="/signin" exact strict component={SignIn} />
            <Route
              path="/myflights"
              exact
              strict
              component={authGuard(MyFlights)}
            />
          </div>
          {/* </Header> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
