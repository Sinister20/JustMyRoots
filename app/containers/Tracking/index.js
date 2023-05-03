import React, { useEffect, useState } from 'react';
import { makeStyles, Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import trackIcon from '../../images/track.png';
import transit from '../../trackIcons/Untitled.png';
import confirmed from '../../trackIcons/confirmed.png';
import delivered from '../../images/delivered.png';
import placed from '../../images/placed.png'
import recieved from '../../images/Recieved.png';
import out from '../../images/out.png';
import LoadingIndicator from '../../components/LoadingIndicator';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step, StepProgressBar } from "react-step-progress-bar";
import {
  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes,
} from '../../config/environmentConfig';
import tick from '../../trackIcons/tick.png'
import { find, findIndex, indexOf, lastIndexOf, slice } from 'lodash';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1064,
    margin: '40px auto 0',
    width: '100%',
    overflow: 'hidden',
    padding: '0 40px 40px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: '0 20px',
    },

    '& .progressBar': {
      marginTop: '100px',
      width: '90%',
      marginLeft: '5%',
      height: '70px',
      marginBottom: '80px',
    },

    '& .indexedStep': {
      // color:'white',  
      width: '100px',
      height: '120px',
      borderRadius: '50%',
      display: 'block',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '12px',

      '& .icon': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2px',
        // width:'50px',
        '& img': {
          height: '50px',
          width: '49%',
          borderRadius: '50%',
          border: '2px solid #AC1715'
          // border:'2px solid black'
        },

        [theme.breakpoints.down('sm')]: {
          '& img': {
            height: '50px',
            width: '50%',
          },


        },
      },
      '& .accomplished': {
        // backgroundColor: '#2E2EFF',
        color: "black",
        width: "20px",
        height: "20px",
        fontSize: "12px",
        fontWeight: 'bold',
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: '40%',
        border: '4px solid #00A300'
        // width:'80px',
        // height:'100px',
        // borderRadius:'50%',
        // display:'block',
        // justifyContent:'center',
        // alignItems:'center',
        // fontSize:'12px',
        // border:'2px solid black'
      },

      '& .index': {
        color: "white",
        width: "20px",
        height: "20px",
        fontSize: "12px",
        backgroundColor: '#C5C5C5',
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: '40%',
      },

      '& .tick': {
        width: '18px',
        height: '18px',
        borderRadius: '50%',
      },
      '& .text': {
        fontWeight: 'bold',
        width: '100%',
        height: '50px',
        fontSize: '16px',
        textAlign: 'center',
        marginTop: '10px',

        [theme.breakpoints.down('sm')]: {
          fontSize: '10px',
          width: '61%',
          height: '25px',
          marginTop: '10px',
          marginLeft: '20%',

        },
      }
      // backgroundColor:'white',
    },


  },



  heading: {
    fontSize: 35,
    fontWeight: 700,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
    },
  },
  policyContent: {
    fontSize: 20,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  desc: {
    fontSize: 20,
  },
}));

const status = [
  {
    stats: "placed",
    img: placed,
    name: "Order Received"
  },
  {
    stats: "confirmed",
    img: recieved,
    name: "Order Confirmed by Vendor"
  },
  {
    stats: "transit",
    img: transit,
    name: "Order In-Transit"
  },
  {
    stats: "out",
    img: out,
    name: "Order Out for Delivery"
  },
  {
    stats: "delivered",
    img: delivered,
    name: "Order Delivered"
  },
  {
    stats: "feedback",
    img: confirmed,
    name: "Feedback"
  },
]

export const Tracking = () => {
  const classes = useStyles();
  const [orderList, setOrderList] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [statusPending, setStatusPending] = React.useState(false);
  const [noOrder, setNoOrder] = useState(false);

  const currentUrl = apiUrlPrefixes[currentEnvironment];
 
  const orderNumber = window.location.pathname.split('/').pop();
  const [allLogs, setAllLogs] = useState([])

  // const transfer = {
  //   stats: "out" // change transfer status to progress bar
  // };

  const pp1 = orderList.map((obj, index) => {
    return obj.map((j, l) => {
      return j
    })
  })

  const pp2 = pp1.filter((type, index) => pp1.indexOf(type) === index)

  const getStepPosition = (transferStatus) => {

    // return pp2.filter((status))
    // return pp2.findIndex(h => h.some(r => r === transferStatus))+1
  };


  const transitionStyles = {
    entering: { transform: "scale(1.5)" },
    entered: { transform: "scale(1)" },
    exiting: { transform: "scale(1.5)" },
    exited: { transform: "scale(1)" }
  };

  useEffect(() => {
    // getStatusLogs()
    getAllStatus()
  }, [])

  const getAllStatus = () => {
    axios.get(`${currentUrl}/api/web/allorderstatuslogs?orderNumber=${orderNumber} `)
      .then((res) => {
        setAllLogs(res.data.data)
        setOrderList(res.data.data.map((x) => {
          return x.orderStatusLogs.map((y) => {
            return y.status
          })
        }))
        setLoading(false)

      })
  }

  return (
    <div className={classes.appWrapper}>
      <Box
        display="flex"
        alignItems="center"
        pb={2}
        mb={6}
        style={{ borderBottom: '1px solid #000' }}
      >
        <img src={trackIcon} alt="track" height="47px" width="47px" />
        <div className={classes.heading}>ORDER TRACKING</div>

      </Box>
      {loading && <LoadingIndicator/>}

      {allLogs && allLogs.map((item, idx) => {

        return (
          <>
            <div className={classes.policyContent}>

              <div>Order Number : ORD/22-23/{orderNumber} </div>
              <div>Invoice Number: {item.invoiceNumber}</div>
              <div>From Location : {item.dispatchLocation.name}</div>
              <div>Current Status : {item.orderStatusLogs.map((obj, index) => obj.status).slice(-1)[0]}</div>
            </div>


            <div className='progressBar' key={idx}>

              <ProgressBar
                // percent={100 * getStepPosition((item.orderStatusLogs.slice(-1)[0].status)) / status.length}
                percent={100 * (item.orderStatusLogs.map((obj, index) => obj.status).findIndex((status) => status === item.orderStatusLogs.slice(-1)[0].status) + 1) / status.length}

                filledBackground="#AC1715"
              >
                {status.map((step, index, arr) => {
                  return (
                    <Step position={100 * (index / arr.length)}
                      transition="scale"
                    >
                      {({ accomplished, index }) => (
                        <div
                          className='indexedStep'
                        >
                          <div className='icon'>

                            <img
                              src={step.img}
                              alt="confirmed"

                            />
                          </div>
                          <div className={` ${accomplished ? "accomplished" : 'index'}`}>
                            {accomplished ? <img src={tick} alt="" className='tick' /> : ''}
                          </div>

                          <div className='text'>
                            {step.name}
                          </div>

                        </div>
                      )}

                    </Step>
                  )
                })}

              </ProgressBar>
            </div>
          </>
        )

      })
      }

    </div>
  );
};
