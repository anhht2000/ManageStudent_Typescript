import { Box, makeStyles } from "@material-ui/core";
import Header from "component/Common/Header";
import SideBar from "component/Common/SideBar";
import DashBoard from "features/dashboard";
import Student from "features/student";
import React, { ReactElement } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

export interface AdminLayoutProps {}

const useStyle = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "25% 1fr",
    gridTemplateRows: "auto 1fr",
    gridTemplateAreas: '"header header" "sidebar main"',
    minHeight: "100vh",
  },
  box1: { gridArea: "header" },
  box2: {
    gridArea: "sidebar",
    border: `1px solid ${theme.palette.primary.dark}`,
    overflow: "hidden",
  },
  box3: { gridArea: "main", padding: theme.spacing(1) },
}));
export function AdminLayout(props: AdminLayoutProps): ReactElement {
  const { url } = useRouteMatch();
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Box className={classes.box1}>
        <Header />
      </Box>
      <Box className={classes.box2}>
        <SideBar />
      </Box>
      <Box className={classes.box3}>
        <Switch>
          <Route path={`${url}/dashboard`} component={DashBoard} />
          <Route path={`${url}/student`} component={Student} />
          <Route path={`${url}`}>
            <Redirect to={`${url}/dashboard`} />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
