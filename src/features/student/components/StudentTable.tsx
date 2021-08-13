import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";

interface StudentTableProps {
  title: string;
  children: any;
}

const useStyle = makeStyles((theme) => ({
  roots: {
    padding: theme.spacing(1, 2),
  },
}));
export default function StudentTable({ title, children }: StudentTableProps): ReactElement {
  const classes = useStyle();
  return (
    <Paper variant='outlined' className={classes.roots}>
      <Typography variant='h6'>{title}</Typography>
      <Box mt={1}>{children}</Box>
    </Paper>
  );
}
