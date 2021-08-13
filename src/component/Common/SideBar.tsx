import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { Dashboard, PeopleAlt } from "@material-ui/icons";
import { NavLink, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    link: {
      color: "inherit",
      textDecoration: "none",
    },
    activeLink: {
      display: "block",
      backgroundColor: "rgba(34,56,23,0.3)",
    },
  })
);

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export default function SideBar() {
  const classes = useStyles();
  const { url } = useRouteMatch();
  console.log(url);

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink
          to={`${url}/dashboard`}
          className={classes.link}
          activeClassName={classes.activeLink}
        >
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="DashBoard" />
          </ListItem>
        </NavLink>
        <NavLink
          to={`${url}/student`}
          className={classes.link}
          activeClassName={classes.activeLink}
        >
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Student" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}
