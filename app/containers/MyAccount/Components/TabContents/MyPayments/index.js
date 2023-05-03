import React from 'react';
import {
  makeStyles,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import image21 from '../../../../../images/image21.png';
import image67 from '../../../../../images/image67.png';
import image70 from '../../../../../images/image70.png';
import Rectangle355 from '../../../../../images/Rectangle355.png';
import Rectangle357 from '../../../../../images/Rectangle357.png';

const useStyles = makeStyles(theme => ({
  container: {
    margin: '50px auto',
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  linkedAccounts: {
    padding: '25px 0',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: 40,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  accounts: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 20px rgba(188, 194, 197, 0.25)',
    borderRadius: 8,
    padding: 32,
    [theme.breakpoints.down('sm')]: {
      padding: '25px 15px',
    },
  },
  linkAccCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #000',
    marginRight: '12%',
    padding: '5px 40px',
    borderRadius: 5,
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      marginRight: 'unset',
    },
  },
  addBtn: {
    color: '#B69C72',
    height: 22,
    textTransform: 'capitalize',
    fontSize: 14,
    border: '1px solid #B69C72',
    borderRadius: 4,
  },
  payCards: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    marginTop: 20,
    borderRadius: 5,
    padding: 5,
  },
  cardLogo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  cardDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 5,
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      padding: 'unset',
    },
  },
  simpleCard: {
    border: '1px solid #737373',
    color: '#737373',
  },
  savedAccountsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: 20,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));

const MyPayments = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className={classes.container}>
      <div style={{ marginBottom: 30 }} className={classes.accounts}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile && 'space-between',
          }}
        >
          <Typography
            color="primary"
            style={{
              fontWeight: 700,
              textTransform: 'capitalize',
              fontSize: isMobile ? 28 : 36,
              marginRight: 20,
            }}
          >
            Saved Cards
          </Typography>
          <div>
            <Button variant="outlined" className={classes.addBtn}>
              Add
            </Button>
          </div>
        </div>
        <div className={classes.savedAccountsContainer}>
          <Grid item className={`${classes.payCards} ${classes.simpleCard}`}>
            <Grid item className={classes.cardLogo}>
              <img src={Rectangle357} />
            </Grid>
            <Grid item className={classes.cardDetails}>
              <Grid item>Mr. Abcd E’s HDFC Debit card</Grid>
              <Grid item>3212-xxxxxxxx-2323</Grid>
            </Grid>
          </Grid>

          <Grid item className={`${classes.payCards} ${classes.simpleCard}`}>
            <Grid item className={classes.cardLogo}>
              <img src={Rectangle355} />
            </Grid>
            <Grid item className={classes.cardDetails}>
              <Grid item>Mr. Abcd E’s HDFC Debit card</Grid>
              <Grid item>3212-xxxxxxxx-2323</Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.accounts}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile && 'space-between',
          }}
        >
          <Typography
            color="primary"
            component="div"
            style={{
              fontWeight: 700,
              textTransform: 'capitalize',
              fontSize: isMobile ? 28 : 36,
              marginRight: !isMobile && 20,
            }}
          >
            Linked Accounts
          </Typography>
          <div>
            <Button variant="outlined" className={classes.addBtn}>
              Add
            </Button>
          </div>
        </div>
        <div className={classes.linkedAccounts}>
          <Grid className={classes.linkAccCard}>
            <img src={image21} />
            <Button color="primary">Delete</Button>
          </Grid>
          <Grid className={classes.linkAccCard}>
            <img src={image67} />
            <Button color="primary">Delete</Button>
          </Grid>
          <Grid className={classes.linkAccCard}>
            <img src={image70} />
            <Button color="primary">Delete</Button>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default MyPayments;
