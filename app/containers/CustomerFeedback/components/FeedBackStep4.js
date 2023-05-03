import React from 'react';


import {
    Grid,
    Typography,
    Box,
    Button
} from '@material-ui/core';

const FeedBackStep4 = ({ history,handleYesClick}) => {


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom style={{
                    textAlign: 'center',
                }}>
                   Will you be interested to complete the survey and win 30 Bonus Loyalty points worth Rs 30.

                </Typography>
                <Box display="flex" justifyContent="space-around" mt={10}>
                    <Button variant='contained'color="secondary" onClick={()=>history.push("/")} >
                        No
                    </Button>
                    <Button onClick={handleYesClick} variant="contained" style={{
                        backgroundColor: 'green',
                        color: 'white',
                    }} size="medium">
                        Yes
                    </Button>
                </Box>

            </Grid>
        </Grid>
    );
};

export default FeedBackStep4;
