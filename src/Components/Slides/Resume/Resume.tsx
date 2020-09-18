import React from "react";
import { PortfolioData } from "Models/portfolioData";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "./Resume.scss";
import { SlideState } from "State/types";
import { connect } from "react-redux";
import { resetPlaySlide, registerSlide } from "State/actions";

var mobile = require("is-mobile");

const Resume = (props: {
  data: PortfolioData;
  name: String;
  index?: number;
  slideState?: SlideState;
  resetPlaySlide?: Function;
}) => {

  const handleMobileResumeClick = () => {

  }

  return (
    <div id="resume">
      <div className="titleDiv">
        <svg id="title" viewBox="0 0 150 100" className="svgTitle">
          <text x="50%" y="60%" textAnchor="middle" fill="transparent"> RESUME & WORK
          </text>
        </svg>
        <hr />

      </div>
      <AwesomeSlider className="resume-slider">
        <div id="resumeSlide">
          <div id="pdfDiv">
            {mobile({tablet: true}) ? (
              <iframe
                title="resumePdf"
                id="resumePdf"
                src="https://drive.google.com/file/d/1tgh9ymwnGOIz2_FtGaaHbu6RNw5Yq33J/preview"
                onClick={handleMobileResumeClick}
              ></iframe>
            ) : (
                <embed id="resumePdf" src="Vincent LAM CMPT August 2020.pdf" />
              )}

            
          </div>
        </div>
        <div><div id="workDiv">
          <blockquote className="embedly-card" data-card-theme="dark"><h4><a href="https://medium.com/apache-mxnet/self-driving-remote-control-car-with-apache-mxnet-1919541a83d7">Self driving remote-control car with Apache MXNet</a></h4><p>This is the complete list of parts required to build the car. I've added some additional comments based on my experience buying some of these items, as the availability of parts varies by location. After you have procured all of the components, it's time to assemble the hardware.</p></blockquote>
        </div></div>
        
      </AwesomeSlider>
    </div>
  );
};

export default connect(
  (state: { slideState: SlideState }, ownProps) => ({
    slideState: state.slideState,
    ...ownProps,
  }),
  { resetPlaySlide, registerSlide }
)(Resume);
