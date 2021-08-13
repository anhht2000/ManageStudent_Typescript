import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { students } from "typeData";
import { Box, Button } from "@material-ui/core";
import { getColorMark, getNameCity } from "utils";
import "../style.css";
import { useAppSelector } from "app/hooks";
import { getListCity } from "features/city/citySlice";
import { useHistory } from "react-router-dom";

export interface StudentDataInTableProps {
  studentList: students[];
  handleClickOpen: (student: students) => void;
  handleEdit: (student: students) => void;
}

const useStyles = makeStyles({
  table: {},
  action: {
    display: "flex",
  },
  columId: {
    maxWidth: "270px",
    height: "20px",
    lineHeight: "20px",
    overflow: "hidden",
  },
});

export default function StudentDataInTable({
  studentList,
  handleClickOpen,
  handleEdit,
}: StudentDataInTableProps) {
  const classes = useStyles();
  const ListCity = useAppSelector(getListCity);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>#ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align='right'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell component='th' align='left'>
                <Box className={classes.columId} id='columId'>
                  {student.id}
                </Box>
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student?.gender.toUpperCase()}</TableCell>
              <TableCell>
                <Box color={getColorMark(student.mark)} fontWeight='bold'>
                  {student.mark}
                </Box>
              </TableCell>
              <TableCell>{getNameCity(student.city, ListCity)}</TableCell>
              <TableCell align='right' className={classes.action}>
                <Button
                  color='secondary'
                  size='small'
                  variant='outlined'
                  onClick={() => handleClickOpen(student)}
                >
                  Remove
                </Button>
                <Button
                  color='primary'
                  size='small'
                  variant='outlined'
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
