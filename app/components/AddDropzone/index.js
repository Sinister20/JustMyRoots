import React, { Fragment } from 'react';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dropZone: {
    '& .dzu-dropzone': {
      flexDirection: 'row',
      minHeight: 'auto',
      overflow: 'scroll',
      border: '0px',
      borderRadius: '4px',
      marginBottom: 5,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '& .dzu-previewImage': {
        width: 95,
        objectFit: 'cover',
        height: 100,
        maxHeight: 100,
        maxWidth: 95,
        borderRadius: 8,
      },
    },
    '& .dzu-inputLabel': {
      gridColumnEnd: '5',
      gridColumnStart: '1',
      position: 'relative',
      height: '100px',
      width: '100px',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      fontSize: '12px',
      color: 'black',
      marginBottom: 0,
    },

    '& .dzu-inputLabelWithFiles': {
      backgroundColor: '#fff',
      color: '#3a3a3a',
      margin: '0px 10px 0 0',
      order: '-1',
      minWidth: '100px',
      border: '1px solid gainsboro',
      height: '100px',
      display: 'flex',
      justifySelf: 'flex-end',
      borderRadius: 8,
    },
    '& .dzu-previewContainer': {
      padding: '0px',
      marginRight: '10px',
      minHeight: 100,
      borderBottom: 0,
      width: 95,
    },
    '& .dzu-previewButton': {
      position: 'absolute',
      top: '10px',
      left: '60px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      opacity: 1,
      height: 20,
      width: 20,
      backgroundSize: '10px',
    },
  },
  icon: {
    width: '40px',
    height: '40px',
  },
}));
const AddDropzone = ({
  startFiles = [],
  startFilesLoaded = true,
  files,
  onChange,
  sentence,
  max,
}) => {
  const classes = useStyles();
  const handleChangeStatus = ({ meta, file }, status) => {
    //console.log(status, meta, file);
  };
  return (
    <Fragment>
      <div className={classes.dropZone}>
        <Dropzone
          onChangeStatus={handleChangeStatus}
          accept="image/*"
          multiple={true}
          maxFiles={max}
          inputContent={
            <span>
              <PhotoCameraOutlinedIcon className={classes.icon} />
            </span>
          }
          inputWithFilesContent={
            <PhotoCameraOutlinedIcon className={classes.icon} />
          }
        />
      </div>
      <Typography color="textSecondary" variant="caption">
        {sentence}
      </Typography>
    </Fragment>
  );
};

export default AddDropzone;
