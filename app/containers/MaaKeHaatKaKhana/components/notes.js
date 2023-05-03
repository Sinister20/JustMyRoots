import React, { useContext } from 'react';
import { makeStyles, Box, Button } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';
import CommonHeading from '../../HomePage/Components/CommonHeading';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 894,
    margin: '40px auto 0',
    width: '100%',
    overflow: 'hidden',
    padding: '0 40px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
    },
  },
  notesCard: {
    padding: 40,
    boxShadow: '0px 2px 15px #cfcfcf',
    borderRadius: 12,
    marginTop: 20,
    '& li': {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 400,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 20px 20px 0',
      marginBottom: 20,
    },
  },
}));

const Notes = () => {
  const classes = useStyles();
  const { history } = useContext(HistoryContext);
  return (
    <div className={classes.appWrapper}>
      <CommonHeading heading="IMPORTANT - PLEASE NOTE" viewmore />
      <div className={classes.notesCard}>
        <ul>
          <li>
            Please provide semi gravy or dry dishes. We only accept 1-liter food
            containers.
          </li>
          <li>We provide containers when requested.</li>
          <li>Food should be kept cold or at room temperature.</li>
          <li>
            Once the food is packed, before sealing we click a photograph, And
            sent to the recipient, as a reference point.
          </li>
        </ul>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => history.push('/maa-ke-haat-ka-khana/order')}
            color="primary"
            variant="contained"
          >
            Start Order
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Notes;
