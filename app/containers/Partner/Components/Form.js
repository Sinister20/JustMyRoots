// import { TableBody, makeStyles } from '@material-ui/core';
// import signUp from '../../../images/registration.png';
// import React from 'react';
// const useStyles = makeStyles(theme => ({
//   form: {
//     height: 'auto',
//     // width: 'autonopm',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '8',
//     borderRadius:'2px',
   

//   },
//   content: {},
//   btn: {
//     position: 'center',
//     backgroundColor: '#405cf5',
//     borderRadius: '6px',

//     boxShadow:'rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0',
//     boxSizing: 'border-box',
//     color: '#fff',
//     cursor: 'pointer',
//     height: '44px',
//     lineHeight: '1.15',
//     margin: '12px 0 0',
//     outline: 'none',
//     overflow: 'hidden',
//     padding: '0 25px',
//   },

//   bname: {
//     '& input': {
//       padding: '1rem',
//     },
//   },
//   form_input: {
//     width: '100%',
//     padding: '1rem',
//     lineHeight: '1.4',
//     backgroundColor: '#f9f9f9',
//     border: '1px solid #e5e5e5',
//     borderRadius: '3px',
//     transition: ' 0.35s ease-in-out',
//   },
//   form_wrapper: {
//     display: 'flex',
//     width: '70vw',
//   },

//   column: {
//     display: 'grid',
//     gridTemplateColumns: 'auto auto',
  
//   },
//   img:{
//   width: '600px',
//   marginRight: '2rem',
  

//   }
// }));
// const Form = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.form}>
//       <div className="form">
//         <h1 style={{ textAlign: 'center' }}>Register</h1>
//         <div className={classes.form_wrapper}>
//           <img className={classes.img}
            
//             src={signUp}
//             alt="sign"
//           />
//           <div className={classes.content}>
//             <div className={classes.bname}>
//               <input
//                 type="text"
//                 id="bname"
//                 className={classes.form_input}
//                 placeholder="Brand Name"
//               />
//             </div>
//             <div className="fssai">
//               <input
//                 type="number"
//                 id="fssai"
//                 className={classes.form_input}
//                 placeholder="Fssai Number"
//               />
//             </div>
//             <div className="address">
//               <input
//                 className={classes.form_input}
//                 type="text"
//                 id="address"
//                 placeholder="Address"
//               />
//             </div>
//             <div className={classes.column}>
//             <input
//                 className={classes.form_input}
//                 type="text"
//                 id="State"
//                 placeholder="State"
//               />
             
//               <input
//                 className={classes.form_input}
//                 type="text"
//                 id="City"
//                 placeholder="City"
//               />
//             </div>

//             <div className={classes.column}>
//               <input
//                 type="email"
//                 id="email"
//                 className={classes.form_input}
//                 placeholder="Email"
//               />

//               <input
//                 className={classes.form_input}
//                 type="text"
//                 id="Contact"
//                 placeholder="Contact  "
//               />
//             </div>
//             <h3 style={{ color: 'black', position: 'center' }}>
//               {' '}
//               Brand Contact Person{' '}
//             </h3>
//             <div className="name">
//               <input
//                 type="text"
//                 id="name"
//                 className={classes.form_input}
//                 placeholder=" Name"
//               />
//             </div>
//             <div className={classes.column}>
//               <input
//                 className={classes.form_input}
//                 type="email"
//                 id="email"
//                 placeholder="Email"
//               />

//               <input
//                 className={classes.form_input}
//                 type="text"
//                 id="mobile"
//                 placeholder="Contact Number"
//               />
//             </div>
//             <button type="submit" className={classes.btn}>
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Form;
