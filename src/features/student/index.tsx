import { useAppDispatch } from "app/hooks";
import { actionFetchDataCity } from "features/city/citySlice";
import React, { ReactElement, useEffect } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AddStudent from "./pages/AddStudent";
import ListStudent from "./pages/ListStudent";

export default function Student(): ReactElement {
  const { url } = useRouteMatch();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actionFetchDataCity());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={`${url}/add`}>
        <AddStudent />
      </Route>
      <Route path={`${url}/edit:studentId`}>
        <AddStudent />
      </Route>
      <Route path={`${url}`}>
        <ListStudent />
      </Route>
      <Route path={`*`}>Not Found</Route>
    </Switch>
  );
}
