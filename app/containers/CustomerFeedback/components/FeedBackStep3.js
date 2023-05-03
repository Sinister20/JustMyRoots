import React from 'react';


import {
    Grid,
    Typography,



} from '@material-ui/core';

const FeedBackStep3 = ({ surveyList = [], handleSubmit }) => {


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom style={{
                    textAlign: 'center',
                    fontSize: '20px',
                }}>
                    Thank you for participating in the Customer Feedback Survey of JustMyRoots.


                </Typography>
                {/* <Typography variant="h4" gutterBottom style={{
                    textAlign: 'center',
                }}>
                    Your 100 loyalty points will be credited to your account in the next 5 working days.
                </Typography> */}

            </Grid>
        </Grid>
    );
};

export default FeedBackStep3;
