import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Rectangle160 from '../images/Rectangle160.jpg';
import Close from '../images/close-icon.png';

const useStyles = makeStyles(theme => ({
  couponContainer: {
    maxWidth: '100%',
    margin: '0 auto',
    width: '100%',
    overflow: 'hidden',
    // background: '#cfcfcf',
    // padding: '20px 16px',
    position: 'relative',
    // border: '1px solid #CCCCCC',
    // boxShadow: '0px 4px 20px #cfcfcf',
    // borderRadius: 8,
    [theme.breakpoints.down('sm')]: {

      padding: '0 20px',
    },
  },
  list: {
    border: '1px solid #CCCCCC',
    background: '#fafafa',
    borderRadius: 5,
    padding: 15,
    
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  couponTitle2: {
    fontSize: 18,
    fontWeight: 500,
  },
  closeIcon: {
    position: 'absolute',
    right: '0',
    top: '0',
    '& img': {
      width: '20px',
      height:  '20px',
    },
  },
  couponDesc: {
    color: '#717171',
    fontSize: 12,
    fontWeight: 500,
  },
  applyCoupon: {
    fontSize: 12,
    fontWeight: 500,
  },
  discount: {
    background: '#F4F4F4',
    padding: '5px 10px',
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 500,
  },
  bottomText: {
    color: '#717171',
    fontSize: 16,
    fontWeight: 400,
    marginTop: 5,
  },
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const CouponDialog = props => {
  const {
    setOpen,
    applyCoupon,
    applyLoyaltyPoint,
    getCoupons,
    cartData,
    couponData,
    itemTotal,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    getCoupons();
  }, []);

  
  return (
    <div className={classes.couponContainer}>
      
        {/* <Box onClick={() => setOpen(false)}  className={classes.closeIcon} style={{ fontSize: 14, cursor: 'pointer' }}>
          <img src={Close} alt="close" />
        </Box> */}
     
      <Box display="grid"  gridGap="20px">
        {couponData ? 
          couponData.sort((a,b)=>b.discount - a.discount).map(c => (
            <div>
              <div className={classes.list}>
              <Typography className={classes.couponTitle2}>Enjoy ₹{c.discount} off</Typography>
                {/* <Typography className={classes.couponTitle}>{c.couponTitle.replaceAll("_"," ")}</Typography> */}
                <Typography className={classes.couponDesc}>{c.couponDescription}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <div className={classes.discount}>
                    {c.code}
                  </div>
                  {c.bank ? null :
                  <Button
                    onClick={() => {
                      applyCoupon(c);
                      setOpen(false);
                    }}
                    color="primary"
                    className={classes.applyCoupon}
                    disabled={c.minCartAmount && c.minCartAmount > itemTotal ? true :false}
                  >
                    Apply
                  </Button> 
}
                </Box>
                {c.minCartAmount && c.minCartAmount > itemTotal ? (
                  <>
                 Add ₹{c.minCartAmount - itemTotal} more to avail this offer
                  </>
                ) : ''}
              </div>
             
            </div>
          )) : 
          
              <div className={classes.list}>
               
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <div>
                    No coupons
                  </div>
                  
                </Box>
              </div>
             
        }
        
      </Box>
    </div>
  );
};

export default CouponDialog;
