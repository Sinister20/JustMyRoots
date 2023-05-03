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
const FeedBackStep2 = ({ surveyList = [], handleSubmit }) => {
  const [list, setList] = React.useState([]);
  const handleFeedBackSubmit = () => {
    handleSubmit(list);
  }
  React.useEffect(() => {
    let f = []
    surveyList.forEach(element => {

      f.push({
        question: element.question,
        surveyId: element._id,
        rating: 0
      })
    })
    setList(f)
  }, [surveyList]);
  const handleRatingValue = (value, surveyId) => {

    const data = list.map(element => {
      if (element.surveyId === surveyId) {
        element.rating = value;
      }
      return element;
    })

    setList([...data]);
  }
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h3" gutterBottom>
          CUSTOMER FEEDBACK SURVEY
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {list.map((item, index) => (
          <div key={index} style={{ marginTop: 10, marginBottom: 10 }}>
            <Typography style={{
              textAlign: 'left',
              textTransform: 'capitalize',
            }} variant="h4" gutterBottom>
              {index + 1}. {item.question}.
            </Typography>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="span" gutterBottom>
                Please rate from 1-10
              </Typography>
            </Box>

            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              mb={3}
              key={index}
              component="fieldset"
              borderColor="transparent"
            >
              <Rating
                name={`customized-empty - ${index}`}
                defaultValue={0}
                value={item.rating}
                precision={1}
                size="large"
                max={10}
                onChange={(event, newValue) => {
                 
                  handleRatingValue(newValue, item.surveyId)
                }}
              // onChangeActive={(event, newHover) => {
              //   setHover(newHover);
              // }}
              />
              <Typography />
              {/* {value !== null && (
                <Box sx={{ ml: 2 }}>
                  {' '}
                  <Typography component="small">
                    {labels[hover !== -1 ? hover : value]}
                  </Typography>
                </Box>
              )} */}
            </Box>
          </div>
        ))}
        <Grid
          item
          justifyContent="center"
          xs={12}
          style={{
            textAlign: 'center',
          }}>
          <Button onClick={handleFeedBackSubmit} variant="contained" color="primary">
            Submit
          </Button>

        </Grid>

      </Grid>
    </Grid>
  );
};

export default FeedBackStep2;
