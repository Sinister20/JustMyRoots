import React from 'react';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import Rectangle1160 from '../../../../../../images/Rectangle1160.jpg';
import { ImageCardWithTitleBtn, JmrCardType1, ListCard } from '../../../../../../components';






const useStyles = makeStyles((theme) => ({
    section: {
        width: '100%',
    },
    sec3Grid: {
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




const ItemSectionScrollSpy = ({ id, secTitle, viewType, temp, filters }) => {

    const classes = useStyles();

    const listUI = Array.from(Array(9).keys());


    return (
        <section id={id} className={classes.section} >
            {!temp && <Typography variant="h5" color="primary">{secTitle}</Typography>}
            {/* <JMRCard /> */}
            {viewType === '1' && <Grid itme className={classes.sec3Grid}>
                {listUI.map((el) => <JmrCardType1 filters={filters} imgSrc={Rectangle1160} />)}
            </Grid>}
            {viewType !== '1' && <Grid itme className={classes.sec3Grid}>
                {listUI.map(() => <JmrCardType1 filters={filters} imgSrc={Rectangle1160} restaurant />)}
            </Grid>}
        </section>
    );
}

export default ItemSectionScrollSpy;
