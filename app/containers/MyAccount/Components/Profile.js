import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Button,
  Hidden,
  useTheme,
  useMediaQuery,
  Box,
  Typography
} from '@material-ui/core';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import moment from 'moment';
import { uploadFile } from 'react-s3';
import TabContents from './TabContents';
import bgProfile from '../../../images/profile-banner.jpg';
import { selectGlobelStoreByKey } from '../../App/selectors';
import UserDetails from '../../../components/Login/UserDetails';
import { getUserDetails, submitUserDetails } from '../../HomePage/actions';
import { config } from '../../../awsconfig';
import ReferShare from './ReferShare';

const useStyles = makeStyles(theme => ({
  topContainer: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: 500,
    fontFamily: "'Roboto'",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: 30,
      flexDirection: 'row',
      minHeight: 685,
    },
  },
  bottomContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 40,
    },
  },
  leftContainer: {
    width: '45%',
    position: 'relative',
    alignSelf: 'flex-end',
    height: '100%',
    display:'flex',
    // display: 'flex',
    // // alignItems: 'flex-end',
    // backgroundPosition: 'bottom',
    // justifyContent: 'center',
    // backgroundImage: `url(${bgProfile})`,
    // backgroundSize: '100% 65%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      // display:'block',
      alignSelf: 'start',

    },
  },
  rightContainer: {
    width: '50%',
    padding: '30px 0 10px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: 500,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      position: 'absolute',
      top: '65%',
    },
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  editProfile: {
    position: 'absolute',
    right: ' 0',
    top: '-5px',
    '& a': {
      fontSize: '14px',
      fontWeight: '500',
      textDecoration: 'none',
      border: '2px solid',
      borderRadius: '4px',
      padding: '6px 16px',
      color: '#AC1715',
      borderColor: '#AC1715',
    },
  },
  updateImage: {
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    border: '2px solid',
    borderRadius: '4px',
    padding: '4px 10px',
    marginTop: '16px',
    color: '#AC1715',
    borderColor: '#AC1715',
    background: '#fff',
  },
  currentLocationText: {
    color: '#333536',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  myChoicesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333536',
    marginRight: 10,
  },
  button: {
    border: '1px solid #B69C72',
    borderRadius: 3,
    height: 26,
    width: 74,
    fontSize: 9,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  customDivider: {
    background:
      'linear-gradient(180deg, #DFDFDF 0%, rgba(255, 255, 255, 0) 100%)',
    height: '16px',
  },
  bgProfile: {
    height: 480,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },
  editProfile: {
    position: 'absolute',
    right: ' 0',
    top: '-5px',
    '& a': {
      fontSize: '14px',
      fontWeight: '500',
      textDecoration: 'none',
      border: '2px solid',
      borderRadius: '4px',
      padding: '6px 16px',
      color: '#AC1715',
      borderColor: '#AC1715',
    },
  },
  updateImage: {
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    border: '2px solid',
    borderRadius: '4px',
    padding: '4px 10px',
    marginTop: '16px',
    color: '#AC1715',
    borderColor: '#AC1715',
    background: '#fff',
  },
  userPofileWrapper: {
    // display: 'none',
    justifyContent: 'center',
    position: 'relative',
    bottom: '55%',
    zIndex: 1,
    transform: 'translate(-50%)',
    left: '50%',
    [theme.breakpoints.down('sm')]: {
      position:'relative',
     
    },
  },
  userPofileEditor: {
    height: 318,
    width: 318,
    border: '1px solid #ddd',
    borderRadius: '50%',
    '& avatar-image': {
      borderRadius: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      height: 180,
      width: 180,
    },
  },
  userPofile: {
    height: 318,
    height: 318,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    display: 'none',
    '& img': {
      width: 318,
      height: 318,
      borderRadius: '50%',
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        width: 220,
        height: 220,
      },
    },
    [theme.breakpoints.down('sm')]: {
      height: 220,
    },
  },
  profileImgButtons: {
    justifyContent: 'center',
    '& button': {
      textTransform: 'capitalize',
      color: '#0c649c',
      fontSize: '12px',
    },
  },
  closeBtn:{
    color: '#fff',
    backgroundColor: '#AC1715',
    padding:'4px 18px',
    borderRadius:'6px',
    border:'none',
    cursor:'pointer'
  },
}));

const Profile = ({ userDetails, getUserDetails, submitUserDetails }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [defaultImg, setDefaultImg] = useState();
  const [imgFile, setImageFile] = useState();
  const [showProfile, setShowProfile] = useState(true);
  const [showShare,setShowShare] = useState(false);

  const applyImage = file => {
    setShowProfile(false);
    handleUploadProfilePic(file);
    const src = window.URL.createObjectURL(file);
    setDefaultImg(src);
  };

  const deleteImage = () => {
    setDefaultImg();
    setShowProfile(true);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  useEffect(() => { 
    if (userDetails && userDetails.picture) {
    
      setShowProfile(false)
    }
   }, [userDetails]);

 
  const handleUploadProfilePic = file => {
    uploadFile(file, config).then(d => {
      new Promise((resolve, reject) => {
        const merged = { ...userDetails, picture: d.location };
        submitUserDetails({ resolve, reject, merged });
      })
        .then(() => {
          getUserDetails();
        })
        .catch(e => {
          console.log(e);
        });
    });
  };
  const handleUpdateProfileImage = () => {
    setShowProfile(false);
  };
 console.log(userDetails)
  return (
    <div>
      <div className={classes.topContainer}>
        <div className={classes.leftContainer}>
          <div className={classes.userPofileWrapper}>
            {showProfile ? (
              <div className={classes.userPofileEditor}>
                <AvatarImageCropper apply={applyImage} isBack />
                {defaultImg && (
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.profileImgButtons}
                  >
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={() => setShowProfile(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </div>
            ) : (
              <div className={classes.userPofile}>
                <img
                  src={
                    userDetails
                      ? userDetails.picture
                        ? userDetails.picture
                        : defaultImg
                      : null
                  }
                />
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.profileImgButtons}
                >
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setShowProfile(true)}
                  >
                    Change
                  </Button>
                  <span>/</span>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => deleteImage()}
                  >
                    Delete
                  </Button>
                </Box>
              </div>
            )}
          </div>
          {/* <img src={bgProfile} className={classes.bgProfile} /> */}
        </div>
        <div className={classes.rightContainer}>
          <Hidden smDown>
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                fontSize: 20,
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#737373' }}>You have   </span>
              <Typography style={{
                margin: '0px 5px',
              }} variant="h2" component="span" color="primary">
                {userDetails ? userDetails.loyaltyPoint : null}
              </Typography>
              <span style={{ color: '#333536', fontWeight: 900 }}>
                JMR points!
              </span>
            </div>
          </Hidden>
          <div>
            <div className={classes.name}>
              <span style={{ color: '#B69C72' }}>Hi </span>
              <span style={{ color: '#333536', textTransform: 'capitalize' }}>
                {userDetails && userDetails.firstName}&nbsp;{userDetails && userDetails.lastName}
              </span>
              <div className={classes.editProfile}>
                <a href="/profile/edit-profile">Edit Profile</a>
              </div>
            </div>
            <div
              style={{ borderBottom: '1px solid #B69C72', paddingBottom: 10 }}
            >
              <span className={classes.currentLocationText}>
                Current City:
              </span>
              <span style={{ fontSize: 14, color: '#EF4423' }}> {userDetails && userDetails.city}</span>
            </div>
            <div style={{ margin: '15px 0' }}>
              <span className={classes.myChoicesText}>My Choices:</span>
              {/* <span style={{ fontSize: 12, color: '#EF4423' }}>Change</span> */}
            </div>
            <div style={{ fontSize: 15, margin: '15px 0' }}>
              <span
                style={{ fontWeight: 300, marginRight: 10, color: '#333536' }}
              >
                I like:
              </span>
              <span style={{ fontWeight: 500, color: '#737373' }}>
                {userDetails && userDetails.isVeg ? 'veg' : 'non-veg'}
              </span>
            </div>
            <div style={{ fontSize: 15, margin: '15px 0' }}>
              <span
                style={{ color: '#333536', fontWeight: 300, marginRight: 10 }}
              >
                My Birthday:
              </span>
              <span style={{ color: '#737373', fontWeight: 500 }}>
                {userDetails && moment(userDetails.dob).format('DD-MMM-YYYY')}
              </span>
            </div>
            <div style={{ fontSize: 15, margin: '15px 0' }}>
              <span
                style={{ color: '#333536', fontWeight: 300, marginRight: 10 }}
              >
                Anniversary Date:
              </span>
              <span style={{ color: '#737373', fontWeight: 500 }}>
                {userDetails && moment(userDetails.anniversary).format('DD-MMM-YYYY')}
              </span>
            </div>
            <div
              style={{
                fontSize: 15,
                paddingBottom: 10,
                borderBottom: '1px solid #B69C72',
              }}
            >
              <span
                style={{ color: '#333536', fontWeight: 300, marginRight: 10 }}
              >
                My Ethnic identity:
              </span>
              <span style={{ color: '#737373', fontWeight: 500 }}>
                {userDetails && userDetails.ethnicIdentity}
              </span>
            </div>
            {userDetails &&  userDetails.totalOrder &&( <div style={{ fontSize: 14, fontWeight: 'bold', margin: '15px 0' }}>
              <span style={{ color: '#333536', marginRight: 10 }}>
                Orders till now:
              </span>
              <span style={{ color: '#737373' }}>{userDetails.totalOrder  }</span>
            </div>)  }
           
            <div
              style={{ fontSize: 14, fontWeight: 'bold', marginTop: '15px' }}
            >
              <span style={{ color: '#333536', marginRight: 10 }}>
                Phone number:
              </span>
              <span style={{ color: '#737373' }}>
              {userDetails && "+" + userDetails.phoneNumber}
              </span>
            </div>
            <div
              style={{ fontSize: 14, fontWeight: 'bold', marginTop: '15px' }}
            >
              <span style={{ color: '#333536', marginRight: 10 }}>
                Referal Code:
              </span>
             
              <span style={{ color: '#737373' }}>
              {userDetails && userDetails.referCode}
              </span>
              <span style={{marginLeft:40}}>
                <button onClick={()=> setShowShare(true)} className={classes.closeBtn} >Share</button>
              </span>
            </div>
            <div
              style={{
                display: 'none',
                alignItems: 'center',
                fontSize: 14,
                margin: '10px 0',
                marginLeft: isMobile && 80,
              }}
            >
              <div style={{ marginRight: 10 }}>Status:</div>
              <div style={{ color: '#34A853' }}>In transit...</div>
              <Button className={classes.button} variant="outlined">
                Track
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.customDivider} />
      <div className={classes.bottomContainer}>
        <TabContents />
      </div>
      {showShare && (
        <ReferShare 
        referCode={userDetails? userDetails.referCode:''}
        closeShare={()=> setShowShare(false)}
        />
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  userDetails: selectGlobelStoreByKey('userDetails'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserDetails,
      submitUserDetails,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Profile);
