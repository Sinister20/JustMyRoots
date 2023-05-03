import React from 'react';
import {
  makeStyles,
  IconButton,
  Badge,
  Typography,
  Box,
} from '@material-ui/core';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import jrmLogo from '../../images/jrmLogo.svg';
import Cart from '../../images/78.svg';
import PersonIconJMR from '../../images/180.svg';
import Frame from '../../images/Frame.svg';
import { Link } from 'react-router-dom';
import Track from '../../images/track-order.png';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '8px 20px 0 20px',
  },
  searchInput: {
    textDecoration: 'none',
    fontSize: 14,
    color: theme.palette.primary.main,
  },
  firstRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #737373',
    paddingBottom: 8,
  },
  transition3: {
    transition: 'height 0.3s ease',
  },
  setDim: {
    height: 50,
    width: 75,
  },
  setDim1: {
    height: 77,
    width: 120,
    cursor: 'pointer',
  },
  secondRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  selectBox: {
    outline: 'none',
    padding: 3,
    border: 0,
    fontSize: 12,
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

const HeaderMobile = props => {
  const { trigger, updateGlobelStoreByKeyVal, history } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.firstRow}>
        <Box display="flex">
          <div style={{ marginRight: 10 }}>
            <MenuIcon
              onClick={() =>
                updateGlobelStoreByKeyVal({ key: 'nav', value: true })
              }
            />
          </div>
          <div
            onClick={() => {
              history.push('/');
            }}
          >
            <img alt="img" src={jrmLogo} style={{ height: 38, width: 59 }} />
          </div>
        </Box>
        <Box display="flex" alignItems="center">
          <div>Hi Guest</div>
          <IconButton
            aria-label="login"
            style={{ padding: '5px 0', marginLeft: '8px' }}
            onClick={() =>
              updateGlobelStoreByKeyVal({
                key: 'isLoginOpen',
                value: true,
              })
            }
          >
            <img src={PersonIconJMR} height="20px" width="20px" />
          </IconButton>

          <IconButton
            onClick={() => history.push('/checkout')}
            style={{ padding: '5px 0' }}
          >
            <Badge
              badgeContent={4}
              color="primary"
              style={{ padding: '5px 0', marginLeft: '8px' }}
            >
              <img alt="img" src={Cart} height="20px" width="20px" />
            </Badge>
          </IconButton>

          {/* track */}
          {/* <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="inherit"
                  justifyContent="flex-end"
                  title="Track Order"
                  onClick={() => history.push('/order-tracking')}
                  className={classes.orderTrack}
                >
                  <img src={Track} alt="Track Order" />
                </Box> */}
                <IconButton
            onClick={() => history.push('/checkout')}
            style={{ padding: '5px 0' }}
          >
            <Badge
              badgeContent={4}
              color="primary"
              style={{ padding: '5px 0', marginLeft: '8px' }}
            >
              <img alt="img" src={Cart} height="20px" width="20px" />
            </Badge>
          </IconButton>

        </Box>
      </div>
      <div className={classes.secondRow}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
          <IconButton aria-label="menu" style={{ padding: '5px 5px' }}>
            <RoomOutlinedIcon />
          </IconButton>
          <Typography variant="caption" style={{ width: 65 }}>
            Delivery in
          </Typography>
          <select className={classes.selectBox}>
            <option>Kolkata</option>
            <option>Delhi</option>
            <option>Mumbai</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/search" className={classes.searchInput}>
            <img src={Frame} height="19px" width="18px" />
            <Typography variant="inherit"> Search</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};

HeaderMobile.propTypes = {
  trigger: PropTypes.any,
};

export default HeaderMobile;
