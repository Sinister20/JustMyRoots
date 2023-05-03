import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { HistoryContext } from 'containers/App/HistoryContext';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    position: 'relative',
    borderRadius: 12,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    height: 330,
    [theme.breakpoints.down('sm')]: {
      height: 100,
    },
  },
  cardCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    color: '#fff',
    padding: 0,
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(0deg, #868686 0%, rgba(196, 196, 196, 0) 100%)',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 10,
    },
  },
  actionSections: {
    background: theme.palette.backgroundColor.dark,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: 10,
    },
  },
  JMRbtn: {
    height: 28,
    minWidth: 135,
    textTransform: 'capitalize',
  },
  bt1: {
    border: '1px solid #ffffff',
    color: '#ffffff',
  },
  offerHeading: {
    fontSize: 100,
    fontWeight: 900,
    textShadow: 'rgb(0 0 0 / 8%) 0px 3px',
    lineHeight: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
});

function ImgMediaCard(props) {
  const {
    homeoffers,
    classes,
    height,
    noOverlay,
    imgData = {},
    path,
    src,
  } = props;

  const { history } = useContext(HistoryContext);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height={height}
          image={imgData.imageUrl || src}
          title={imgData.imageUrl || 'image not available'}
        />
        {!noOverlay || homeoffers && (
          <CardContent className={classes.cardCaption}>
            <Grid>
              <Typography
                component="div"
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                UP TO
              </Typography>
              <Typography className={classes.offerHeading}>
                {imgData.discount}
              </Typography>
            </Grid>
          </CardContent>
        )}
      </CardActionArea>
      {!homeoffers && (
        <CardActions className={classes.actionSections}>
          {noOverlay && [
            <Typography
              variant="subtitle2"
              component="div"
              style={{ maxWidth: 765, fontSize: 18, fontWeight: 800 }}
            >
              Mangoes
            </Typography>,
            <Typography
              variant="caption"
              gutterBottom
              component="div"
              style={{
                maxWidth: 765,
                textAlign: 'center',
                fontWeight: 300,
                marginLeft: 0,
              }}
            >
              location
            </Typography>,
          ]}
          <Button
            onClick={() => {
              history.push(`/${imgData.webPath || path}`);
            }}
            variant="outlined"
            className={`${classes.JMRbtn} ${classes.bt1}`}
          >
            Order Now
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
