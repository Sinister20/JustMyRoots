import React, { useState } from 'react'
import { Grid, Box, Button, makeStyles } from '@material-ui/core'
import voucher from '../../images/Group 4445.png'


const useStyles = makeStyles(theme => ({
    radioToolbar: {
        margin: '10px 0px 0px 0px',
        padding: '0px 10px 0px 0px',
        '& input': {
            opacity: 0,
            position: 'fixed',
            width: 0,

            "&:checked + label": {
                backgroundColor: "#AC1715",
                color: 'white'
            },
            
        },

        '& label': {
            display: 'inline-block',
            padding: '5px 10px 5px 10px',
            fontSize: '16px',
            border: '1px solid #444',
            borderRadius: '4px',
            cursor: 'pointer',
            [theme.breakpoints.down('xs')]: {
                padding: '5px 10px 5px 2px',
                display: 'flex flex-row',
                 
            },

        },
    },

    Amount:{
      display:'flex',
      '& .amountLable':{
        fontWeight: 'bold', display: 'block', paddingTop: '15px',
        [theme.breakpoints.down('xs')]: {
            padding: '28px 10px 5px 2px',
            display: 'flex flex-row',
            width:'28%',
            marginLeft:'-20px'
        },
      }
    },

    To: {
        display: 'flex',

        '& textarea':{
            width: '60%', borderRadius: '5px', marginLeft: '20px',
            [theme.breakpoints.down('xs')]:{
                marginLeft:'48px',
            }
        }

    },

    From: {
        display: 'flex',
        '& label': {
            fontWeight: 'bold', display: 'block', width: '9%',
            [theme.breakpoints.down('xs')]: {
                padding: '5px 10px 5px 2px',
                display: 'flex flex-row',
                width:'18%',
            },
        }
    },

    Message:{
     display:'flex',
      '& label':{
        fontWeight: 'bold', display: 'block', width: '12%', paddingTop: '15px',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 10px 5px 2px',
            display: 'flex flex-row',
            width:'28%',
            marginLeft:'-11px'
        },
      }
    },

    Quantity:{
        display:'flex',
        '& label':{
            fontWeight: 'bold', display: 'block', paddingTop: '5px', width: '10%',
            [theme.breakpoints.down('xs')]: {
                padding: '15px 10px 5px 2px',
                display: 'flex flex-row',
                width:'25%',
                marginLeft:'-16px'
            },
            
        }
    }
})
)

const GiftVouchers = () => {
    const classes = useStyles();
    const [checked, setCheckBoxChecked] = useState([]);

    const handleChange = (value) => {
        setCheckBoxChecked(value)
        console.log(value)
    }

    const data = [
        {
            title: '₹ 100',
            value: 100,
        },
        {
            title: '₹ 250',
            value: 250,
        },
        {
            title: '₹ 500',
            value: 500,
        },
        {
            title: '₹ 1000',
            value: 1000,
        },

    ];
    return (
        <div style={{ margin: "20px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div style={{ padding: '10px', }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover', overflow: 'hidden' }} src={voucher} alt="voucher" />
                    </div>
                    <div style={{ marginLeft: '5%' }}>
                        <b><i>
                            Hope you enjoy this gift card!
                        </i>
                        </b>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} >

                    <div style={{ padding: '5px', width: '100%', }}>
                        <h3>1. Enter your Gift Card details</h3>
                        <div style={{ padding: '1px 0px 10px 40px', }}>
                            <form>
                                <Grid container spacing={4} >
                                    <Grid item xs={12} >
                                        {/* <Box mb={1}> */}
                                        <div className={classes.Amount}>
                                            <label className='amountLable'>Amount</label>
                                            <div style={{ display: 'flex', marginLeft: '24px' }}>
                                                {data.map((item, key) => (
                                                    <div className={classes.radioToolbar}>
                                                        <input
                                                            type="radio"
                                                            value={item.value}
                                                            name={item.title}
                                                            id={item.title}
                                                            checked={checked === item.value}
                                                            onClick={() => handleChange(item.value)}
                                                        />
                                                        <label for={item.title}>{item.title}</label>
                                                    </div>

                                                ))}
                                            </div>
                                        </div>
                                    </Grid>

                                    {/* </Box> */}
                                    {/* </Grid> */}
                                    <Grid item xs={12} >
                                        <div className={classes.To}>

                                            <label style={{ fontWeight: 'bold', display: 'block', width: '9%' }}>To</label>
                                            <textarea rows={1}  />
                                        </div>
                                    </Grid>
                                    {/* </Box>
                                    </Grid> */}

                                    <Grid item xs={12} >
                                        <div className={classes.From}>

                                            <label>From</label>
                                            {/* <textarea rows={1} style={{ width: '60%', borderColor: '#cfcfcf', marginLeft: '20px' }} /> */}
                                            <input type="text" style={{ width: '60%', marginLeft: '20px', borderRadius: '5px' }} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <div className={classes.Message}>

                                            <label >Message</label>
                                            <textarea rows={2} style={{ width: '60%', borderRadius: '5px', marginLeft: '0px' }} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={classes.Quantity}>

                                            <label >Quantity</label>
                                            <input type="number" style={{ width: '15%', borderRadius: '5px', marginLeft: '12px' }} />
                                        </div>
                                    </Grid>



                                </Grid>
                                <Grid item xs={3} >
                                    <div style={{ marginTop: '40px' }}>
                                        <Button variant="contained"
                                            color="primary" size='small' >Pay Now</Button>
                                    </div>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default GiftVouchers