import React from 'react';
import {
  makeStyles,
  useTheme,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import forwardIcon from '../../../../images/forwardIcon.svg';

const useStyles = makeStyles(theme => ({
  headingSpace: {
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(0),
    },
  },
  heading: {
    lineHeight: '41.02px',
    textTransform: 'uppercase',
    color: '#000000',
    marginBottom: 0,
    marginTop: 0,
    fontSize: '35px',
    fontWeight: '700',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '19px',
      marginBottom: 0,
    },
  },
  viewMore: {
    '& span': {
      fontSize: 22,
      fontWeight: 700,
      lineHeight: '26px',
      color: '#878787',
      letterSpacing: 10,
      marginRight: 5,
      textTransform: 'uppercase',
      [theme.breakpoints.down('sm')]: {
        fontSize: 8,
        letterSpacing: '0.5em',
        marginRight: 2,
      },
    },
    '& img': {
      [theme.breakpoints.down('sm')]: {
        width: 8,
        height: 8,
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      height: 25,
    },
  },
}));

const CommonHeading = ({ heading, link, viewmore, handleViewMore }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box textAlign="center" className={classes.headingSpace} my={5}>
      <Typography variant="h2" className={classes.heading}>
        {heading}
      </Typography>
      {!window.location.href.includes('offer') ? 
      !viewmore && (
        <Button onClick={handleViewMore} className={classes.viewMore}>
          <span>view more</span>
          <img src={forwardIcon} alt="icon" />
        </Button>
      )
        : ''
      }
    </Box>
  );
};

export default CommonHeading;
