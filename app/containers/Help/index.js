import React from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import {
  Container,
  Grid,
  Divider,
  Header,
  Segment,
  Icon,
  Image,
  List,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
const helpDesk = require('../../images/help_desk_icon.svg');
const Help = () => (
  <>
    <Helmet titleTemplate="loyaltyPoints" defaultTitle="LoyalPoints">
      <meta name="My Loyalty Page" content="Loyalty Points" />
    </Helmet>
    <Container fixed>
      <Grid container spacing={3} style={{ marginTop: 10, marginBottom: 10 }}>
        <Grid item xs={12}>
          <div>
            <div
              style={{
                display: 'flex',
                // justifyContent: "center",
                alignItems: 'center',
              }}
            >
              
              <div>
                <img width="30" height="30" src={helpDesk} />
              </div>
              <h3 style={{ fontSize: 30, margin: 0, marginLeft: 5 }}>HELP</h3>
            </div>
            <Divider />
          </div>
          <div>
            <h2><a href="/faq"  style={{
                color: '#434343',
                textDecoration: 'none',
              }}>(FAQ)</a></h2>
          </div>
          <div>
            <h2><a href="/contact-us" style={{
                color: '#434343',
                textDecoration: 'none',
              }}>Connect Call Center</a></h2>
          </div>
        </Grid>
      </Grid>
    </Container>
  </>
);
export default Help;
