/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */
 import { Link } from 'react-router-dom';
import { Grid, Box, makeStyles, Button } from '@material-ui/core';
import React from 'react';
import page404 from '../../images/page404.png'

import messages from './messages';
const useStyles = makeStyles(theme => ({
 
  addCartBtn: {
    textDecoration: 'none',
    marginTop: 18,
    display: 'block',
  }
  
}));

export default function NotFound() {
  const classes = useStyles();
  return (
    <article>
       <Grid container>
      <Grid item style={{ width: '100%', minHeight: 500, justifyContent: 'center', alignItems: 'center', background: '#fff', textAlign:'center' }}>
        {/* <img src={page404} height="400px" /> */}
        <Box  style={{textAlign:'center', fontSize: '28px', paddingTop: '90px', minHeight: 190}}>
        Please click below to go to the new Home Page and Enjoy the Upgraded website.
        </Box>
        <Link className={classes.addCartBtn} to="/">
          <Button
            variant="outlined"
            color="primary"        
          >
            GO BACK TO HOME PAGE
          </Button>
        </Link>
      </Grid>
      </Grid>
    </article>
  );
}
