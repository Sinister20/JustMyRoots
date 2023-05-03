import React, { useState } from 'react';
import { Grid, IconButton, InputBase, makeStyles, Typography } from '@material-ui/core';
import Frame from '../../images/Frame.svg';
const useStyles = makeStyles((theme) => ({
    searchIconWrapper: {
        background: '#fff',
        borderRadius: 4,
        minWidth: 400,
        border: '1px solid #B69C72'

    },
    search: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        flex: '20px auto',
        padding: '5px 10px',
    },
    styledInputBase: {
        marginLeft: 10,
        flex: 1,
        color: 'inherit',
        '& .MuiInputBase-input': {

        }
    },
    absSearch: {
        position: 'absolute',
        top: '-20px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        left: 0
    }
}));




const RestroSearch = () => {
    const classes = useStyles();

    return (
        <Grid item className={classes.absSearch}>
            <Grid item className={classes.searchIconWrapper}>
                <Grid item className={classes.search}>
                    <img src={Frame} height="19px" width="18px" />
                    <InputBase
                        className={classes.styledInputBase}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default RestroSearch;

