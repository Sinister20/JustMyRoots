import React from 'react';
import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import Rectangle39 from '../../../../images/Rectangle39.svg';
import Rectangle36 from '../../../../images/Rectangle36.svg';
import Rectangle37 from '../../../../images/Rectangle37.svg';
import image1 from '../../../../images/image1.svg';

const useStyles = makeStyles(theme => ({
  heroOffer: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 21,
    borderTop: '1px solid #000000',
    borderBottom: '1px solid #000000',
    [theme.breakpoints.down('sm')]: {
      borderTop: 'none',
      borderBottom: 'none',
      height: 65,
    },
  },
  hrVer: {
    height: 20,
    background: '#000000',
    margin: 20,
  },
}));

const AppWrapper = styled.div`
  margin: 0 auto;
`;

const index = () => {
  const classes = useStyles();

  return (
    <AppWrapper>
      <Grid className={classes.heroOffer}>
        {/* <Typography variant="h6" component="p" style={{ lineHeight: 0 }}> */}
        <Typography variant="subtitle2" component="div">
          We Accept :
        </Typography>
        {/* </Typography> */}
        &nbsp; &nbsp;
        <Typography variant="body1" style={{ fontWeight: 100 }}>
          <img src={Rectangle39} />
          <img src={Rectangle36} />
          <img src={Rectangle37} />
          <img src={image1} />
        </Typography>
        {/* <Divider orientation="vertical" className={classes.hrVer} />
                <Typography variant="h6" color="primary" component="div">
                    Check Out
                </Typography> */}
      </Grid>
    </AppWrapper>
  );
};

export default index;
