import { Grid, Typography, Button, Box } from '@material-ui/core';
import React from 'react';
const MaaKeHath = ({ classes, handleClickOpen }) => (
  <Box my={5}>
    <Grid className={classes.contentContr}>
      <Typography className={classes.contentTitle}>
        Single most intimate expression of our mothers’ love is cooking and
        pampering their kids with home cooked delicious meals . No matter, what
        we eat, where we eat, we can never replicate that special flavour of
        ‘Maa ke haath ka khana’, made for us with that magical ingredient called
        love along with the familiar sentiment of, “beta thoda aur kha le!”
        <br />
        We are proud of our unique DFH service, which would deliver your moms
        home cooked meal to you,anyplace and anytime you crave
      </Typography>
    </Grid>
    <Button
      variant="outlined"
      className={classes.cardBtn}
      onClick={handleClickOpen}
    >
      Get your Maa’s Love Home-Delivered
    </Button>
  </Box>
);

export default MaaKeHath;
