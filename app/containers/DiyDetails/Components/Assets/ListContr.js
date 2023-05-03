import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import Rectangle1160 from 'images/Rectangle1160.jpg';
import Desserts from 'images/Desserts.svg';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';







const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: 140,
        boxShadow: 'none',
        background: 'transparent'
    },
    details: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'self-start',
        paddingLeft: 35
    },
    cover: {
        width: 190,
    },
    controls: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    descItem: {
        fontWeight: 300,
        fontSize: 12,
    },
    incrDecrGrp: {
        marginTop: 5,
        '& button': {
            color: '#000',
            padding: '0px 10px',
        }
    }
}))




const ListCard = () => {

    const classes = useStyles();
    const [quantity, setQuantity] = useState(0)


    return (
        <Card className={classes.root} >
            <CardMedia
                className={classes.cover}
                image={Rectangle1160}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <img src={Desserts} height="16px" height="16px" />
                    <Typography color="primary" >
                        Name of dish
                    </Typography>
                    <Typography className={classes.descItem} style={{ color: '#333536' }}>
                        <b> Name of Ingredient </b>
                    </Typography>
                    <Typography className={classes.descItem} style={{ color: '#333536' }}>
                        <span> Quantity: </span> <b> 1kg</b>
                    </Typography>
                </CardContent>
            </div>
        </Card >
    );
}

export default ListCard;
