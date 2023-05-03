import React from 'react';
import { Rating } from '@material-ui/lab';
import {
  Grid,
  Typography,
  Box,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
const labels = {
  1: 'Not at all likely',
  // 2: 'Useless+',
  9: 'Extremely likely',
  10: 'Extremely likely',
};
const FeedBackStep1 = ({ handleSubmit,handleContinue,history }) => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [feedback, setFeedback] = React.useState('');
  const handleFeedBackSubmit = () => {
    const data = {
      rating: value,
      comment: feedback,
    }
    handleSubmit(data);
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            OVERALL SATISFACTION
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            How likely are you to recommend JustMyRoots to a friend or family
            member?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="span" gutterBottom>
            Please rate from 1-10
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            mb={3}
            borderColor="transparent"
          >
            <Rating
              name="customized-empty"
              defaultValue={0}
              value={value}
              precision={1}
              size="large"
              max={10}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            <Typography />
            {value !== null && (
              <Box sx={{ ml: 2 }}>
                {' '}
                <Typography component="small">
                  {labels[hover !== -1 ? hover : value]}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
        {value <= 8 && (
          <>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="filled-multiline-static"
                  label="Please share your suggestions on where we can improve"
                  multiline
                  rows="4"
                  variant="outlined"
                  required
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
      <Box my={5} display="flex" alignItems="center" justifyContent="space-between"  >
        <Button variant="contained" >
          Cancel
        </Button>
        <Button onClick={handleFeedBackSubmit} variant="contained" style={{
          backgroundColor: 'green',
          color: 'white'
        }}
          
        >
          Continue
        </Button>
      </Box>
    </>
  );
};

export default FeedBackStep1;
