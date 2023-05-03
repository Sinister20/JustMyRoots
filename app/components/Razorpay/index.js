import React, { useState, useEffect } from 'react';
import { Button ,makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme =>({
mainRazor:{
  display:'flex',
  justifyContent:'center',
},

 button:{
    background:'#AC1715',
    color:'white',
    '& :hover':{
        color:'black'
    }
 }
}))

const RazorpayButton = ({onClick=()=>null ,text}) => {
    const classes = useStyles();

    return (
        <div className={classes.mainRazor}>
<Button className={classes.button} onClick={onClick}>
    {text}
</Button>
        </div>
    )
}

export default RazorpayButton