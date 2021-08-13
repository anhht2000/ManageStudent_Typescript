import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { ComponentType, ReactElement } from "react";

interface StatisticsItemProps {
  label: string;
  value: number;
  icon: ReactElement;
}
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: `rgba(0, 0, 209, 0.2)`,
    borderRadius: 4,
    padding: theme.spacing(1, 2),
    // color: "white",
  },
  caption: {
    fontSize: 20,
  },
}));
export const StatisticsItem = ({ label, value, icon }: StatisticsItemProps) => {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      {icon}
      <Box textAlign="right">
        <Typography variant="h6">{label}</Typography>
        <Typography variant="caption" className={classes.caption}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};
