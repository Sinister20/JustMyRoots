/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { getTestimonialList, deleteTestimonial } from '../actions';
import { selectTestimonialMasterStoreByKey } from '../selectors';
import ConfirmDialog from '../../../components/ConfirmDialog';

const useStyles = makeStyles(theme => ({
  editBtn: {
    color: '#fff',
    marginTop: 30,
    marginBottom: 30,
  },
  listCard: {
    marginTop: 10,
    background: '#fff',
    boxShadow: '5px 5px 25px 0 #ececec',
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    display: 'grid',
    gridTemplateColumns: '110px 250px 200px 400px 100px 250px 100px 100px',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      flexDirection: 'column',
      borderLeft: '1px solid #ccc',
      textAlign: 'center',
      padding: '0 10px',
    },
    '& img': {
      marginBottom: 10,
    },
  },
  elipses: {
    height: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'hidden',
  },
}));

const EditTestimonial = ({
  editMode,
  setEditMode,
  setSelectedProduct,
  selectedLocation,
  getTestimonialList,
  testimonialList,
  deleteTestimonial,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteProductData, setDeleteProductData] = React.useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (editMode) {
      getTestimonialList();
      setSelectedProduct(null);
    }
  }, [editMode, reload]);
  const handleConfirm = flag => {
    setOpen(flag);
  };

  const deleteItem = () => {
    if (deleteProductData) {
      //console.log(deleteProductData);
      new Promise((resolve, reject) => {
        const id = deleteProductData._id;
        deleteTestimonial({ id, resolve, reject });
      }).then(() => {
        handleConfirm(false);
        setDeleteProductData(null);
        setReload(!reload);
      });
    }
  };
  // useEffect(() => {}, [selectedLocation, testimonialList]);

  return (
    <div>
      <Button
        onClick={() => {
          setEditMode(!editMode);
        }}
        color="primary"
        variant="contained"
        className={classes.editBtn}
      >
        {!editMode ? 'Edit Testimonial' : 'Add Testimonial'}
      </Button>

      {editMode && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {testimonialList &&
              testimonialList.map(el => (
                <TableRow>
                  <TableCell>{el.name && el.name}</TableCell>
                  <TableCell>
                    {el.cityId && el.cityId.name && el.cityId.name}
                  </TableCell>
                  <TableCell>{el.feedback && el.feedback}</TableCell>
                  <TableCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedProduct(el);
                      setEditMode(false);
                    }}
                  >
                    Edit
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setDeleteProductData(el);
                      handleConfirm(true);
                    }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      {deleteProductData && (
        <ConfirmDialog
          open={open}
          setOpen={setOpen}
          confirmTitle="Are you sure to delete this item ?"
          deleteProductData={{
            tableTitle: ['Name', 'Feedback'],
            tableValues: [deleteProductData.name, deleteProductData.feedback],
          }}
          deleteRow={deleteItem}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  testimonialList: selectTestimonialMasterStoreByKey('testimonialList'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTestimonialList,
      deleteTestimonial,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(EditTestimonial);
