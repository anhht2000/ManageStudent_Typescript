import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/hooks";
import React from "react";
import { useHistory } from "react-router-dom";
import { authSelector, login } from "../authSlice";

interface LoginPageProps {}

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    box: {
      width: theme.spacing(50),
      textAlign: "center",
      padding: "30px",
    },
  };
});

const LoginPage = (props: LoginPageProps) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const { logging } = useAppSelector(authSelector);
  const history = useHistory();
  const isSignIn = Boolean(localStorage.getItem("access_token"));
  //login
  const handleLoginClick = () => {
    dispatch(login({ username: "tuananh", password: "ok" }));
  };

  if (isSignIn) {
    history.push(`/admin`);
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Paper elevation={3} className={classes.box}>
        <Typography variant='h5' component='h1'>
          Student Login
        </Typography>
        <Box mt={2}>
          <Button variant='contained' color='primary' fullWidth onClick={handleLoginClick}>
            {logging && <CircularProgress color='secondary' size={20} />}
            &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
