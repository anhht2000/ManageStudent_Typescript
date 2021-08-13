import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Params, students } from "typeData";
import { useAppDispatch } from "app/hooks";
import { actionFetchListStudent } from "../StudentSlice";
import studentApi from "api/studentApi";
import { toast } from "react-toastify";

interface RemoveDialogProps {
  open: boolean;
  filter: Params;
  currentStudent: students;
  handleClose: () => void;
}

export default function RemoveDialog({
  open,
  filter,
  currentStudent,
  handleClose,
}: RemoveDialogProps) {
  const dispatch = useAppDispatch();
  const handleAgree = async () => {
    try {
      await studentApi.removeStudent(currentStudent.id || "");
      toast.success("Remove successfuly!");
      handleClose();
      dispatch(actionFetchListStudent(filter));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Please Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure remove '{currentStudent.name}' from list student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} color='secondary' autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
