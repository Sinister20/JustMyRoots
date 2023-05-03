import React, { useEffect } from 'react'
import { deleteKeyFromLocalStorage, getFromLocalStorage } from '../../../../utils/localStorageUtils'
import {
    Button,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Typography,
    TextField
    
  } from '@material-ui/core';
  import styled from 'styled-components';
  import { Autocomplete } from '@material-ui/lab';
import t22 from '../../../../images/T22.jpg'
import { useState } from 'react';
import {  currentEnvironment,
  environmentConfigs,
  apiUrlPrefixes,}from '../../../../config/environmentConfig'
import axios from 'axios';
import { Link } from 'react-router-dom';

  const AppWrapper = styled.div`
  width: 100%;
  padding: 35px 35px 20px;
  margin: 0 auto;
`;
  const AppWrapperContainer = styled.div`
  max-width: 1270px;
  margin: 30 auto;
  position: relative;
  text-align: center;
  margin: 0 auto;
`;

const useStyles = makeStyles(theme =>({
wcScreen:{
    width:'100%',
   padding:'0 10px',
   minHeight:'100vh' ,
},
wcLogo:{
    maxWidth: '840px',
    marginBottom: 20,
    marginTop: 40,
    display: 'inline-block',
    '& img': {
      width: '100%',
    },
},

matches:{
  width:'50%',
  justifyContent:'center',
  marginLeft:'25%',
  marginBottom:'50px',
 
  '& .span' :{
    fontWeight:'bold',
    fontSize:'28px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '70%',
    justifyContent:'center',
    marginLeft:'15%',
    marginBottom:'50px',
    // height: 200,
  },

},

selectBox:{
 border:'4px solid #A11E23',
 borderRadius:'8px',
 height:'auto',
 padding:'10px',
'& .selectTeam':{
  border:'none',
  // height:'20px',
  // display:'flex',
}
},
selectedTeams:{
  display:'flex',
  gap:'20px',
  marginLeft:'10%',
  [theme.breakpoints.down('sm')]: {
   marginLeft:'0%',
   display:'block',

  },
},

selectedTeams3:{
  display:'flex',
  gap:'20px',
  marginLeft:'45%',
  [theme.breakpoints.down('sm')]: {
   marginLeft:'0%',
   display:'block',

  },
},

selected:{
 width:'auto',
 background:'#b3b3b373',
 borderRadius:'6px',
 padding:'8px',
 [theme.breakpoints.down('sm')]: {
  
 },
},
thanks:{
 fontWeight:'bold',
 fontSize:'20px',
 marginBottom:'40px',
},
addCartBtn2:{ 
  textDecoration: 'none',
}
}))

const WorldCup = () => {
    const classes = useStyles();
    const itemPrice = getFromLocalStorage('itemTotal')
    const disabled = true
    const limit1 = 4
    const [match1 , setMatch1] = useState([])
    const [match2 , setMatch2] = useState([])
    const [match3 , setMatch3] = useState([])
    const [gameId , setGameId] = useState()
    const[teams , setTeams] = useState([])

    const [showThanks , setShowThanks] = useState(false)
    const currentUrl = apiUrlPrefixes[currentEnvironment];
  const token = JSON.parse(localStorage.getItem('lscache-HKTWQ'));
  const finalToken = token.replaceAll('"', '');

  const semifinals = {
    type:'semi',
    teamIds:match1.map((item)=> item._id)
  }
  const orderId = getFromLocalStorage('orderId')
    useEffect(()=>{
     getGame()
    },[])

  const options =[
    {
      teamName:'india'
    },
    {
      teamName:'australia'
    },
    {
      teamName:'pakistan'
    },
    {
      teamName:'england'
    },
    {
      teamName:'newzealand'
    },
    {
      teamName:'sri-lanka'
    }
  ]

    const getGame=()=>{
      axios.get(`${currentUrl}/api/mobile/game/get-game`,{
        headers:{
          'Authorization':`Bearer ${finalToken}`
        }
      })
      .then((res)=>{
        console.log(res.data.data[0]._id)
        setGameId(res.data.data[0]._id)
        getTeams(res.data.data[0]._id)

      })
    }

    const getTeams =(id)=>{
      axios.get(`${currentUrl}/api/mobile/game/get-game-temas?gameId=${id}`,{
        headers:{
          'Authorization':`Bearer ${finalToken}`
        }
      })
      .then((res)=>{
        console.log(res.data.data)
        setTeams(res.data.data)

      })
    }

   const onSubmit =()=>{
    // console.log(match1.map((item)=> item._id) || match2.map((item)=> item._id) || match3.map((item)=> item._id))
    
    
    
    // console.log('teamIds': match1.map((item)=> item._id))
    axios.post(`${currentUrl}/api/web/game/submit-prediction`,{
      gameId:gameId,
      // teamId:match1.map((item)=> item._id) || match2.map((item)=> item._id) ||  match3.map((item)=> item._id),
      orderId:orderId,
      predictions:[
        {
          type:'semi',
          teamIds:match1.map((item)=> item._id)
        },
        {
          type:'final',
          teamIds:match2.map((item)=> item._id)
        },
        {
          type:'winner',
          teamIds:match3.map((item)=> item._id)
        },
      ]
      // predictions:
    },{
      headers:{
        'Authorization':`Bearer ${finalToken}`
      }
    })
    .then((res)=>{
      console.log(res)
      if(res.data.success === true){
        setShowThanks(true)
        deleteKeyFromLocalStorage('orderId')
        deleteKeyFromLocalStorage('itemTotal')
 
      }
      else{
        alert("Something went wrong")
      }
    })
    .catch((err)=>{
      alert('Something went wrong!')
    })
    // axios.
    // deleteKeyFromLocalStorage('itemTotal')
   }  

    

  return (
    <AppWrapper className={classes.wcScreen}>
<AppWrapperContainer>
    <div className={classes.wcLogo}>
     <img src={t22} alt="wc-logo" className=''/>   
    </div>
  
  {!showThanks && (
     <div>
     {itemPrice >= 750 && (
    <div className={classes.matches}> 
    <div>
    <span className='span'>SEMIFINALISTS</span>
    <div className={classes.selectBox}>
     
    <Autocomplete 
    // freeSolo={options.length >=4 ? false : true} 
    multiple
    options={teams}
    getOptionLabel={option => option.teamName}
    getOptionDisabled={(option)=> match1.length >=4 ?true:false }
    onChange={(e,newValue)=>{
      setMatch1(newValue)
     }}
    
    size="small"
    renderInput={params => <TextField
     {...params}
     label="Select your 4 teams"
     margin='normal'
     variant='outlined'
    
   />}
    />
    <div className={classes.selectedTeams}>
   
     {match1.map((item ,index) =>{
       return <div key={index} className={classes.selected}>
         {item.teamName}
       </div>
     })}
   
   
     
    </div>
   
    </div>
    </div>
   </div>
     )}
   
   {itemPrice >= 1500 && (
    <div className={classes.matches}> 
    <div>
    <span className='span'>FINALISTS</span>
    <div className={classes.selectBox}>
     
    <Autocomplete 
    multiple
    options={teams}
    getOptionLabel={option => option.teamName}
    getOptionDisabled={(option)=> match2.length >=2 ?true:false }
    onChange={(e,newValue)=>{
      setMatch2(newValue)
     }}
    size="small"
    renderInput={params => <TextField
     {...params}
     label="Select your 2 teams"
     margin='normal'
     variant='outlined'
    
   />}
    />
    <div className={classes.selectedTeams}>
     {match2.map((item ,index) =>{
       return <div key={index} className={classes.selected}>
         {item.teamName}
       </div>
     })}
   
   
     
    </div>
   
    </div>
    </div>
   </div>
     )}
    
    {itemPrice >= 2500 && (
    <div className={classes.matches}> 
    <div>
    <span className='span'>WINNER</span>
    <div className={classes.selectBox}>
     
    <Autocomplete 
    multiple
    options={teams}
    getOptionLabel={option => option.teamName}
    getOptionDisabled={(option)=> match3.length >=1 ?true:false }

    onChange={(e,newValue)=>{
      setMatch3(newValue)
     }}
    size="small"
    renderInput={params => <TextField
     {...params}
     label="Select your team"
     margin='normal'
     variant='outlined'
    
   />}
    />
    <div className={classes.selectedTeams3}>
     {match3.map((item ,index) =>{
       return <div key={index} className={classes.selected}>
         {item.teamName}
       </div>
     })}
   
   
     
    </div>
   
    </div>
    </div>
   </div>
     )}
   
     <div>
       <Button variant ="contained" color="primary" onClick={onSubmit}>
        Submit
       </Button>
     </div>
     </div>
  )}

  {showThanks && (
    <>
    <div className={classes.thanks}>
      Thank you for playing.<br/>
       Our Customer service team will get in touch with you if you qualify.
    </div>
     <Link className={classes.addCartBtn2} to="/">
     <Button
       variant="outlined"
       color="primary"        
     >
       GO BACK TO HOME PAGE
     </Button>
   </Link>
   </>
  )}
 
</AppWrapperContainer>
    </AppWrapper>
  )
}

export default WorldCup