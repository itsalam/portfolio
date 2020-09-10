import React from 'react';
import './Contact.scss'
import { PortfolioData } from 'Models/portfolioData';
import { SlideState } from 'State/types';
import { connect } from 'react-redux';
import { resetPlaySlide, registerSlide } from "State/actions";

const Contact = (props: {
   data: PortfolioData;
   name: String;
   index?: number;
   slideState?: SlideState;
   resetPlaySlide?: Function;
}) => {



   return (
      <div id="contact">
         <div className="titleDiv">
            <svg id="title" viewBox="0 0 150 100" className="svgTitle">
               <text x="50%" y="60%" textAnchor="middle" fill="transparent"> CONTACT
          </text>
            </svg>
            <hr />

         </div>
         <div className="contact-form">
            <form id="contact" autoComplete="false">
               <ul>
                  
               </ul>
            </form>
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
