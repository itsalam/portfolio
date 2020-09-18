import React, { FormEvent } from 'react';
import './Contact.scss'
import { PortfolioData } from 'Models/portfolioData';
import { SlideState } from 'State/types';
import { connect } from 'react-redux';
import { resetPlaySlide, registerSlide } from "State/actions"; 
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = (props: {
   data: PortfolioData;
   name: String;
   index?: number;
   slideState?: SlideState;
   resetPlaySlide?: Function;
}) => {

   const [name, setName] = React.useState<string>();
   const [email, setEmail] = React.useState<string>();
   const [subject, setSubject] = React.useState<string>();
   const [message, setMessage] = React.useState<string>();

   const contactSubmit = (e: FormEvent) => {
      e.preventDefault();
      let data = {
         name,
         email,
         subject,
         message
      }
      console.log(data);
      console.log(process.env);
      process.env.REACT_APP_CONTACT_URL ? axios.post(process.env.REACT_APP_CONTACT_URL, data)
      .then( res => {
          //TODO: relay message sent 
          renderSuccess();
          console.log(`sent! Response message: ${res.data}`);
      })
      .catch( (error) => {
        console.log(`Message not sent: ${error}`);
        renderError();
      }) : renderError();
   }

   const renderError = () => {
      toast.error('❌ Something went wrong, try my email/phone number.(and tell me about my bugs)', {
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         });
   }

   const renderSuccess = () => {
      toast.success(`👍 Message sent! I'll get to you shortly.`, {
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });
   }

   return (
      <div id="contact">
         <div className="titleDiv">
            <svg id="title" viewBox="0 0 150 100" className="svgTitle">
               <text x="50%" y="60%" textAnchor="middle" fill="transparent"> CONTACT
          </text>
            </svg>
            <hr />

         </div>
      
         <div className="contact-form-div">
            <form id="contact-form" autoComplete="false" onSubmit={(e: FormEvent) => contactSubmit(e)}>
               <ul>
                  <li className="half input">
                     <input className="input-field" placeholder="Name" type="text" name="name" required onChange={(e) => setName(e.target.value)}></input>
                     <div className="border"/>
                  </li>
                  <li className="half input"> 
                     <input className="input-field"placeholder="Email" type="email" name="email" required onChange={(e) => setEmail(e.target.value)}></input>
                     <div className="border"/>
                  </li>
                  <li className="full input">
                     <input className="input-field" placeholder="Subject" type="text" name="subject" required onChange={(e) => setSubject(e.target.value)}></input>
                     <div className="border"/>
                  </li>
                  <li className="box input">
                     <textarea className="input-field text-field" placeholder="Message" name="msg" required onChange={(e) => setMessage(e.target.value)}></textarea>
                     <div className="border"/>
                  </li>
                  <li className="submit animated fadeInUp">  
                     <input id="submit" type="submit" className="flat-button" value="SEND"/>
                  </li>
               </ul>
            </form>
         </div>
         <div id="contact-message"> 

         <hr/>
            <h3>
               Other Ways
            </h3>
            <p>
               (+1) 778 - 388 - 2376
            </p>
            <p>
               vincentthanhlam@gmail.com
            </p>
         </div>
      </div>
   );
}


export default connect(
   (state: { slideState: SlideState }, ownProps) => ({
      slideState: state.slideState,
      ...ownProps,
   }),
   { resetPlaySlide, registerSlide }
)(Contact);
