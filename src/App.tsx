import citysApi from "api/citysApi";
import { PrivateRoute } from "component/Common";
import { AdminLayout } from "component/Layout";
import LoginPage from "features/auth/pages/LoginPage";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  useEffect(() => {
    let cities = citysApi
      .getAll()
      .then((data) => {
        // console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="*">{<Redirect to="/login" />}</Route>
      </Switch>
    </>
  );
}

export default App;
