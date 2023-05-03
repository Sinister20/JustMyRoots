import React from 'react';
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import styled from 'styled-components';
import image8 from '../../../../images/image8.png';
import image9 from '../../../../images/image9.png';
import image10 from '../../../../images/image10.png';
import image11 from '../../../../images/image11.png';

const useStyles = makeStyles(theme => ({
  heroOffer: {
    minHeight: 150,
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
  btnSocialGroup: {
    marginTop: 15,
    padding: '0 20px',
    borderRadius: 6,
    background: '#ffffff',
    '& button': {
      background: '#ffffff',
      padding: 0,
      borderRight: 'none !important',
      padding: '70x 0',
      '&:hover': {
        background: '#ffffff',
        boxShadow: 'none',
      },
    },
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

const SocialConnect = ({ text1, text2, btnTxt }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppWrapper isMobile={isMobile}>
      <AppWrapperContainer>
        <Grid
          className={classes.heroOffer}
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs="12" sm="5" style={{ marginTop: 40 }}>
            <Typography
              variant="h6"
              component="p"
              style={{
                fontSize: isMobile ? 30 : 60,
                color: '#ffffff',
                textAlign: 'center',
                fontWeight: 900,
                fontFamily: 'Roboto',
              }}
            >
              Hi John!
            </Typography>
          </Grid>
          <Grid
            xs="12"
            sm="7"
            style={{ margin: isMobile ? '10px 0 35px 0' : '35px 0' }}
          >
            <Typography
              variant="h6"
              component="p"
              style={{ fontSize: 16, color: '#ffffff', fontWeight: 400 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              adipiscing arcu, id non lectus eget at.
            </Typography>
            <ButtonGroup variant="contained" className={classes.btnSocialGroup}>
              <Button>
                <img src={image8} />
              </Button>
              <Button>
                <img src={image9} />
              </Button>
              <Button>
                <img src={image10} />
              </Button>
              <Button>
                <img src={image11} />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </AppWrapperContainer>
    </AppWrapper>
  );
};

export default SocialConnect;
