import React from 'react';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import Rectangle1160 from '../../../../../../images/Rectangle1160.jpg';
import { ImageCardWithTitleBtn, ListCard } from '../../../../../../components';






const useStyles = makeStyles((theme) => ({
    section: {
        width: '100%',
        padding: '20px 45px',
        borderLeft: '1px solid #B69C72',
        borderRight: '1px solid #B69C72',
    },
    sec3Grid: {
        paddingTop: 20,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridColumnGap: 20,
        gridRowGap: 20
    },
    sec1Grid: {
        paddingTop: 20,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridColumnGap: 20,
        gridRowGap: 20
    }
}))




const ItemSectionScrollSpy = ({ id, secTitle, viewType }) => {

    const classes = useStyles();


    return (
        <section id={id} className={classes.section} >
            <Typography variant="h5" color="primary">{secTitle}</Typography>
            {/* <JMRCard /> */}
            {viewType === '1' && <Grid item className={classes.sec1Grid} >
                <ListCard />
                <Divider />

                <ListCard />
                <Divider />

                <ListCard />
                <Divider />

                <ListCard />
                <Divider />

                <ListCard />
                <Divider />

                <ListCard />
            </Grid>}
            {viewType !== '1' && <Grid itme className={classes.sec3Grid}>
                <ImageCardWithTitleBtn imgSrc={Rectangle1160} />
                <ImageCardWithTitleBtn imgSrc={Rectangle1160} />
                <ImageCardWithTitleBtn imgSrc={Rectangle1160} />
                <ImageCardWithTitleBtn imgSrc={Rectangle1160} />
                <ImageCardWithTitleBtn imgSrc={Rectangle1160} />
                <ImageCardWithTitleBtn imgSrc={Rectangle1160} />
            </Grid>}
        </section>
    );
}

export default ItemSectionScrollSpy;
