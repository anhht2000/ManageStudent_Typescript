import { Box, Card, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import imgLoading from "../../asset/images/loading-32.gif";

interface Props {}

const useStyle = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    minHeight: "100vh",
  },
  image: {
    width: "100px",
  },
}));
export const Loading = (props: Props) => {
  const classes = useStyle();
  return (
    <Box className={classes.root} id="box_container">
      <Card className={classes.card} id="card_container">
        <CardContent id="card_content">
          <img src={`${imgLoading}`} alt="NO MATCH" className={classes.image} />
        </CardContent>
      </Card>
    </Box>
  );
};
