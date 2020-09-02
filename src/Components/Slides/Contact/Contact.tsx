import React, { Component } from 'react';
import './Contact.scss'
import { PortfolioData } from 'Models/portfolioData';
import { SlideState } from 'State/types';
import { playTitle } from '../Animations';
import { connect } from 'react-redux';
import { resetPlaySlide, registerSlide } from "State/actions";

const Contact = (props: {
   data: PortfolioData;
   name: String;
   index?: number;
   slideState?: SlideState;
   resetPlaySlide?: Function;
}) => {


   const [titlePlayed, setTitlePlayed] = React.useState(false);

   React.useEffect(() => {
      if (props.slideState?.playSlide === props.index && !titlePlayed) {
         playTitle("#resumeTitle", 0);
         setTitlePlayed(true);
         props.resetPlaySlide && props.resetPlaySlide();
      }
   });


   const data = props.data;

   const handleChange = () => {

   }

   return (
      <div id="contact">
         <div className="titleDiv">
            <svg id="resumeTitle" viewBox="0 0 150 100" className="svgTitle">
               <text x="50%" y="60%" textAnchor="middle" fill="transparent"> CONTACT
          </text>
            </svg>
            <hr />

         </div>
         <div className="row">
            <div className="eight columns">
               <form action="" method="post" id="contactForm" name="contactForm">
                  <fieldset>
                     <div>
                        <label htmlFor="contactName">Name <span className="required">*</span></label>
                        <input type="text" defaultValue="" size={35} id="contactName" name="contactName" onChange={handleChange} />
                     </div>
                     <div>
                        <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                        <input type="text" defaultValue="" size={35} id="contactEmail" name="contactEmail" onChange={handleChange} />
                     </div>
                     <div>
                        <label htmlFor="contactSubject">Subject</label>
                        <input type="text" defaultValue="" size={35} id="contactSubject" name="contactSubject" onChange={handleChange} />
                     </div>
                     <div>
                        <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                        <textarea cols={50} rows={13} id="contactMessage" name="contactMessage"></textarea>
                     </div>
                     <div>
                        <button className="submit">Submit</button>
                        <span id="image-loader">
                           <img alt="" src="images/loader.gif" />
                        </span>
                     </div>
                  </fieldset>
               </form>
               <div id="message-warning"> Error boy</div>
               <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
               </div>
            </div>
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
