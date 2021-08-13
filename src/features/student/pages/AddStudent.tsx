import { Box, Typography } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { students } from "typeData";
import StudentForm from "./StudentForm";
import studentApi from "api/studentApi";
import { toast } from "react-toastify";

interface Props {}

export default function AddStudent({}: Props): ReactElement {
  const { studentId }: any = useParams();
  const [error, setError] = useState<string>("");
  const history = useHistory();
  const [student, setStudent] = useState<students>();
  const isEdit = Boolean(studentId);
  let initialValues: students = {
    name: "",
    age: 0,
    mark: 0,
    gender: "male",
    city: "",
    ...student,
  } as students;

  //handle submit
  const handleStudentFormSubmit = async (student: students) => {
    console.log("submit", student);
    try {
      if (isEdit) {
        setError("");
        await studentApi.updateStudent(student);
        history.push(`/admin/student`);
      } else {
        setError("");
        await studentApi.addStudent(student);
        history.push(`/admin/student`);
      }
      toast.success("Success!");
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data: students = await studentApi.getbyId(studentId.slice(1));
          setStudent(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [studentId]);
  return (
    <Box>
      <Link to='/admin/student' style={{ textDecoration: "none" }}>
        <Typography variant='caption' style={{ display: "flex", alignItems: "center" }}>
          <ChevronLeftIcon /> Back to list student
        </Typography>
      </Link>
      <Typography variant='h5'>{isEdit ? "Update Student" : "Add Student"}</Typography>
      {/* form  */}
      {/* Co nghia la neu la add thi hien thi gia tri khoi tao luon khong thi la edit se cho no lay gia tri khoi tao xong moi hien thi form  */}
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onbubmit={handleStudentFormSubmit}
            error={error}
          />
        </Box>
      )}
    </Box>
  );
}
