import React, { useContext } from 'react';
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
import { HistoryContext } from 'containers/App/HistoryContext';
import { Button } from '@material-ui/core';

const styles = theme => ({
    card: {
        width: '100%',
        boxShadow: '0px 4px 20px 0px #DAE1E4',
        borderRadius: 5,
        marginTop: 14
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
        padding: 13
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
        }
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    subHeaderText: {
        fontSize: 12,
        fontWeight: 300
    },
    cardBtn: {
        marginTop: 12,
        height: 30,
        border: '1px solid #b69c71',
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'capitalize'
    }
});

const CardHero = ({ classes, imgSrc }) => {

    const { history } = useContext(HistoryContext);



    return (
        <Card className={classes.card}>
            <CardContent style={{ padding: 13 }}>
                <img src={imgSrc || Rectangle160} width="100%" height="140px" />

            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                <Typography variant="caption" component="div" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#B69C72' }} >Location</span>
                    <span style={{ fontWeight: 300, fontSize: 14 }}>Cuisine</span>
                </Typography>
                <Button onClick={() => {
                    history.push('/brand');
                }} variant="outlined" color="primary" className={classes.cardBtn}>Order Now</Button>
            </CardActions>
        </Card>
    );
}

CardHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardHero);