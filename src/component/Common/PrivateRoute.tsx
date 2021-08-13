//tsrpf
import { AdminLayout } from "component/Layout";
import React, { ReactElement } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export function PrivateRoute(props: RouteProps): ReactElement {
  //kiemt tra xem dang nhap chua, neu chua ve login
  const isLogin = Boolean(localStorage.getItem("access_token"));
  if (!isLogin) return <Redirect to="/login" />;
  return (
    <>
      <Route {...props} />
    </>
  );
}
