import { PrivateRoute } from "component/Common";
import { AdminLayout } from "component/Layout";
import LoginPage from "features/auth/pages/LoginPage";
import firebase from "firebase";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  //
  var firebaseConfig = {
    apiKey: "AIzaSyD5zTIY2xw9KA2_BBrWB5vLFE4xQSRF9rk",
    authDomain: "test-393e4.firebaseapp.com",
    projectId: "test-393e4",
    storageBucket: "test-393e4.appspot.com",
    messagingSenderId: "33265717266",
    appId: "1:33265717266:web:f7cd942483592fc3f448cb",
    measurementId: "G-9Y43FFNL6P",
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <PrivateRoute path='/admin' component={AdminLayout} />
        <Route path='*'>
          {/* {<Redirect to='/login' />} */}
          NOT FOUND
        </Route>
      </Switch>
    </>
  );
}

export default App;
