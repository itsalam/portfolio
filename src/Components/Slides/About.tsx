import React, { Component } from "react";
import { connect } from "react-redux";
import { PortfolioData } from "Models/portfolioData";
import "./About.scss";
import anime from "animejs";
import { SlideState } from "State/types";
import { resetPlaySlide } from "State/actions";

export const About = (props: {data:PortfolioData, slideState?: SlideState, index?: number, resetPlaySlide? : Function}) => {

    React.useEffect(()=> {
      console.log(props)
      
      if ( props.slideState?.playSlide === props.index){
        playAnimation(0);
      }
    })

    const playAnimation = (delay: number) => {
      anime({
        targets: ".about-title h1",
        opacity: {
          value: [0, 1],
          duration: 150
        },
        translateY: {
          value: [150, 0],
          duration: 1500,
          easing: "easeOutCirc",
          delay: 150
        },
        delay
      })

      anime({
        targets: '.logo',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
      });

      props.resetPlaySlide && props.resetPlaySlide();
    }

    return (
      <div id="about">
        <div className="about-title">
          <div className="text">
          <h1> ABOUT </h1>
          </div>
          
          <hr/>
        </div>
        
        <div className="about-text">
          <p>
            {" "}
            A new grad from Vancouver, BC. I'm a developer with an affinity for exploring all the industry has to
            offer. While I'm currently enjoying learning modern front-end
            technology (like building this site), I'm eager to learn whatever
            else may interest me and makes me a strong asset in my field.{" "}
          </p>
          <br />
          <p>
            With work history in two Fortune 500 companies, I have experience in
            large enterprise development, as well as small scale applications
            and projects built for private utility to help teams throughout
            company.{" "}
          </p>

          <br />
          <p>
            {" "}
            A majority of my hobbies involve creating and building; currently
            things such as CGI graphics, computer builds, and cooking.
          </p>
        </div>
        <h2>
            Things I like using:
        </h2>
        <div id="tools-section">

          {props.data.tools.map((tool, index) => {
            return (
              <div className="logo" key={index}>
                <img src={tool.path} alt="Trulli"/>
                <p>{tool.name.charAt(0).toUpperCase() + tool.name.slice(1)}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
}


export default connect(
  (state: {slideState: SlideState}, ownProps) => ({
    slideState: state.slideState,
    ...ownProps
  })
  , {resetPlaySlide}) (About);

