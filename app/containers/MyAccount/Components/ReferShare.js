import React from 'react'
import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    EmailShareButton,
    EmailIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,

  } from 'react-share';
  import {
    makeStyles,
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
          position:'relative',
          '& h2': {
            padding:'20px 40px 30px 40px',
  
          },
          '& .closeModal': {
            color:'#000',
            fontSize:20,
            position:'absolute',
            right:'10px',
            fontWeight:'bold',
            cursor:'pointer',
            top:'10px',
  
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
  
const ReferShare = (props) => {
    const {
          referCode,
          closeShare
            } = props;
    const shareUrl = 'https://justmyroots.com/';
    const classes = useStyles();

  return (
    <div className={classes.mainModal}>
          <div className={classes.modalContent}>
            <div onClick={closeShare} className='closeModal'><span
                       >
                         X
                       </span></div>
            <h2> Share your Refer Code :</h2>
            <div className={classes.modalFooter}>
            <FacebookShareButton
          url={shareUrl}
          quote={`Please use this refer code to get a free meal worth Rs 250/- '${referCode}'`}
        >
          <FacebookIcon size={50} round={true} />
        </FacebookShareButton>

        <WhatsappShareButton
          url={shareUrl}
          quote={`Please use this refer code to get a free meal worth Rs 250/- '${referCode}'`}
          title={`Please use this refer code to get a free meal worth Rs 250/- '${referCode}'`}

          
        >
          <WhatsappIcon size={50} round={true} />
        </WhatsappShareButton>

        <TwitterShareButton
        url={shareUrl}
        title={`Please use this refer code to get a free meal worth Rs 250/- '${referCode}'`}

        >
            <TwitterIcon size={50} round={true} />
        </TwitterShareButton>

       <EmailShareButton 
       url={shareUrl}
       subject={'JMR Refer Code'}
       body= {`Please use this refer code to get a free meal worth Rs 250/- '${referCode}'`}
       >
        <EmailIcon size={50} round={true}/>
       </EmailShareButton>

       <LinkedinShareButton
        url={shareUrl}
        title={"JMR Refer Code"}
        summary={`Please use this refer code to get a free meal worth Rs 250/- '${referCode}'`}
       >
       <LinkedinIcon size={50} round={true} />
       </LinkedinShareButton>
            </div>

        </div>
        </div>
  )
}

export default ReferShare