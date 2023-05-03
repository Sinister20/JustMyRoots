import React, { memo } from 'react';
import {
    makeStyles,
    TextField,
    Button,
    IconButton,
    Box,
    Tab,
    Grid,
    Tabs,
    Typography,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  mainModal: {
    position: 'fixed',
    width: '100%',
    height:' 100vh',
    top: 0,
    left: 0,
    zIndex: '9999',
    background: '#00000096',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    
    },
    modalContent: {
        width: '500px',
        margin: '0 auto',
        background: '#fff',
        color: '#484848',
        textAlign: 'center',
        padding: '16px',
        '& h2': {
          padding:'20px 40px 30px 40px',

        }
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'center',
      padding: '0 0 28px 0',
        '& .primaryBtn': {
          color: '#fff',
          backgroundColor: '#AC1715',
          padding:'4px 18px',
          borderRadius:'6px',
          border:'none',
          marginRight:20,
          minWidth:120,
          cursor:'pointer'
        },
        '& .closeBtn': {
          color: '#000',
          backgroundColor: '#D9D9D9',
          padding:'4px 18px',
          borderRadius:'6px',
          border:'none',
          cursor:'pointer',
          minWidth:120,
        },
        
    },
   
    
}));


const VoucherMessage = props => {
    const {
onRegister,
onClose,
message
    } = props;
    const classes = useStyles();

    return (
        <>
        <div className={classes.mainModal}>
          <div className={classes.modalContent}>
            <h2>{message}</h2>
            <div className={classes.modalFooter}>
    
            <button onClick={onClose} className='closeBtn'>
                OK
            </button>
            </div>

        </div>
        </div>
         
        </>
    );
};

export default VoucherMessage
