import React, { useContext } from 'react';
// import styled from 'styled-components';
import {
  Grid,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import memory from '../../../../images/memory.jpg';
import CommonHeading from '../CommonHeading';
import { HistoryContext } from 'containers/App/HistoryContext';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '50px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto 50px',
      padding: '0 20px',
    },
  },
  maaKeHathKaKhanaContnr: {
    width: '100%',
    marginBottom: 45,
  },
  contentContr: {
    color: '#7D7B7B',
    textAlign: 'center',
  },
  caption: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#737373',
  },
  contentTitle: {
    marginBottom: 0,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      marginTop: 30,
    },
  },
  memoryImg: {
    height: 370,
    borderRadius: 12,
    width: '100%',
    marginBottom: 22,
    [theme.breakpoints.down('sm')]: {
      height: 194,
      marginTop: 20,
    },
  },
  cardBtn: {
    fontSize: 20,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#AC1715',
    display: 'block',
    margin: '30px auto 0',
    minWidth: '353',
    minHeight: 45,
    border: '2px solid #848383',
    borderRadius: 45,
    lineHeight: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      minHeight: 30,
      padding: '5px 10px',
    },
  },
}));

const MemoryLane = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { history } = useContext(HistoryContext);
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.appWrapper}>
      <CommonHeading heading="memory lane" viewmore />
      <div>
        <Grid item>
          <img src={memory} width="100%" className={classes.memoryImg} />
          <Grid className={classes.contentContr}>
            <Typography className={classes.contentTitle} variant="caption">
              This signifies those familiar lanes,dotted with these popular
              eateries,that have been there since times immemorial.Those familiar
              sights,sounds and taste,which invariably transports us to our
              childhood memories,time after time.
            </Typography>
            <Button variant="outlined" className={classes.cardBtn} onClick={() => history.push('/memory-lane')}>
              Explore Memory Lane
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MemoryLane;
