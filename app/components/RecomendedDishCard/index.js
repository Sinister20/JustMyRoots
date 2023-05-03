import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Button } from '@material-ui/core';
import Rectangle160 from '../../images/Rectangle160.jpg';

const styles = theme => ({
  card: {
    width: '100%',
    boxShadow: '0px 4px 20px 0px #DAE1E4',
    borderRadius: 5,
    minHeight: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 20,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  cardTitle: {
    '& .MuiCardHeader-content': {
      textAlign: 'center',
    },
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: 300,
  },
  cardBtn: {
    height: 30,
    border: '1px solid #B69C72',
    fontSize: 16,
    fontWeight: 500,
    color: '#B69C72',
    textTransform: 'capitalize',
  },
  dishHeading: {
    fontSize: 19,
    fontWeight: 700,
    textAlign: 'left',
    width: '100%',
    lineHeight: 1,
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  dishDesc: {
    marginLeft: 0,
    fontSize: 12,
    textAlign: 'left',
    width: '100%',
    marginBottom: 13,
    lineHeight: 1,
    fontWeight: 300,
  },
});

const RecomendedDishCard = ({ classes, data = {}, addItemToCart }) => (
  <Card className={classes.card}>
    <CardContent style={{ padding: 13 }}>
      <img
        src={
          (data.productImages && data.productImages[0]) ||
          data.productImages ||
          Rectangle160
        }
        width="100%"
        height="200px"
      />
    </CardContent>
    <CardActions className={classes.actions} disableActionSpacing>
      <Typography
        variant="caption"
        component="p"
        className={classes.dishHeading}
      >
        {data.itemName}
      </Typography>
      <Typography variant="caption" component="p" className={classes.dishDesc}>
        {data.brand}
      </Typography>
      {/* <Button
        variant="outlined"
        onClick={() => addItemToCart({ itemId: data._id, quantity: 1 })}
        className={classes.cardBtn}
      >
        Add to cart
      </Button> */}
    </CardActions>
  </Card>
);

RecomendedDishCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecomendedDishCard);
