/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = ({
  open,
  setOpen,
  deleteProductData,
  deleteRow,
  confirmTitle,
}) => {
  const handleConfirm = flag => {
    setOpen(flag);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleConfirm(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{confirmTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {deleteProductData.tableTitle.map(title => (
                    <TableCell>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {deleteProductData.tableValues.map(value => (
                    <TableCell>{value}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleConfirm(false);
          }}
          color="primary"
        >
          Disagree
        </Button>
        <Button onClick={() => deleteRow(true)} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
