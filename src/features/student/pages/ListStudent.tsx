import { Box, Button, Fab, Grid, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Pagination } from "@material-ui/lab";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Loading } from "component/Common/Loading";
import { getListCity } from "features/city/citySlice";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Params, students } from "typeData";
import RemoveDialog from "../components/RemoveDialog";
import SearchBox from "../components/SearchBox";
import SelectBox from "../components/SelectBox";
import SelectSort from "../components/SelectSort";
import StudentDataInTable from "../components/StudentDataInTable";
import StudentTable from "../components/StudentTable";
import {
  actionFetchListStudent,
  actionSetFilter,
  actionSetFilterDebounce,
  getFilter,
  getListStudent,
  getLoading,
  getPagination,
} from "../StudentSlice";

const useStyle = makeStyles((theme) => ({
  root: {},
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
  gridFilter: {
    alignItems: "center",
  },
}));

export default function ListStudent(): ReactElement {
  const classes = useStyle();
  const dispatch = useAppDispatch();

  const history = useHistory();
  const loadding = useAppSelector(getLoading);
  const filter = useAppSelector(getFilter);
  const ListStudent = useAppSelector(getListStudent);
  const pagination = useAppSelector(getPagination);
  const ListCity = useAppSelector(getListCity);
  const [page, setPage] = React.useState(1);
  //state remove dialog
  const [selectedStudent, setSelectedStudent]: [students, any] = useState({
    name: "",
    age: 0,
    mark: 0,
    gender: "male",
    city: "hn",
  });
  // const student: students = { name: "", age: 0, mark: 0, gender: "male", city: "hn" };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (student: students): void => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(actionSetFilter({ ...filter, _page: value }));
  };
  const onSearchChange = (e: any) => {
    dispatch(actionSetFilterDebounce(e.target.value));
  };
  const onCityChange = (e: any) => {
    const newFilter: Params = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    dispatch(actionSetFilter(newFilter));
  };
  const onSortChange = (e: any) => {
    const [_sort, _order] = e.target.value.split(".");
    const newFilter: Params = {
      ...filter,
      _sort: _sort || undefined,
      _order: _order || undefined,
    };

    dispatch(actionSetFilter(newFilter));
  };
  const onClickClear = () => {
    const newFilter: Params = {
      _page: 1,
      _limit: 10,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    dispatch(actionSetFilter(newFilter));
  };

  const handleEdit = (student: students): void => {
    history.push(`${url}/edit:${student.id}`);
  };

  useEffect(() => {
    dispatch(actionFetchListStudent(filter));
  }, [dispatch, filter]);

  const { url } = useRouteMatch();
  return (
    <>
      <Box>
        {loadding && <Loading />}
        <Box id='title-list' display='flex' justifyContent='space-between' overflow='hidden'>
          <Typography variant='h5'>Student List</Typography>
          <Link to={`${url}/add`} style={{ textDecoration: "none" }}>
            <Fab color='primary' aria-label='add' variant='extended' size='small'>
              <AddIcon /> Add Student
            </Fab>
          </Link>
        </Box>
        {/* filter  */}
        <Box>
          <Grid container spacing={2} className={classes.gridFilter}>
            <Grid item xs={12} md={6}>
              <SearchBox filter={filter} onSearchChange={onSearchChange} />
            </Grid>
            {/* select  */}
            <Grid item xs={12} md={3}>
              <SelectBox onCityChange={onCityChange} filter={filter} listCity={ListCity} />
            </Grid>
            <Grid item xs={12} md={2}>
              <SelectSort filter={filter} onSortChange={onSortChange} />
            </Grid>
            <Grid item xs={4} md={1}>
              <Button variant='outlined' color='primary' size='small' onClick={onClickClear}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* table  */}
        <Box mt={2}>
          <StudentTable title=''>
            <StudentDataInTable
              studentList={ListStudent}
              handleClickOpen={handleClickOpen}
              handleEdit={handleEdit}
            />
          </StudentTable>
        </Box>
        <Pagination
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          color='primary'
          size='large'
          variant='outlined'
          className={classes.pagination}
          shape='rounded'
          page={page}
          onChange={handleChange}
        />
      </Box>
      <RemoveDialog
        filter={filter}
        open={open}
        currentStudent={selectedStudent}
        handleClose={handleClose}
      />
    </>
  );
}
