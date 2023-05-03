import React from 'react';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  heroOffer: {
    height: 90,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 21,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 'unset',
      paddingTop: 20,
      paddingBottom: 20,
    },
  },
  cardBtn: {
    border: '1px solid #FFFFFF',
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#FFFFFF',
    height: 33,
    marginLeft: 20,
  },
}));

const AppWrapper = styled.div`
  width: 100%;
  padding: 0 35px;
  margin: 0 auto;
  background-color: #b69c72;
  text-align: ${props => props.isMobile && 'center'};
`;

const AppWrapperContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  overflow: hidden;
`;

const SetupAPickup = ({ text1, text2, btnTxt }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppWrapper isMobile={isMobile}>
      <AppWrapperContainer>
        <Grid className={classes.heroOffer}>
          <Typography
            variant="h6"
            component="p"
            style={{
              fontSize: 20,
              color: '#ffffff',
              fontWeight: 700,
              marginRight: 5,
            }}
          >
            {text1}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            style={{ fontSize: 20, color: '#333536', fontWeight: 700 }}
          >
            {text2}
          </Typography>
          <Button variant="outlined" className={classes.cardBtn}>
            {btnTxt}
          </Button>
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default SetupAPickup;
