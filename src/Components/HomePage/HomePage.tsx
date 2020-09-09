import React, { Fragment, useEffect } from "react";
import { PortfolioData } from "../../Models/portfolioData";
import "./HomePage.scss";
import anime from "animejs";
import { Title } from "./Title";
import { playSlide } from "State/actions";
import { connect } from "react-redux";
import { SlideState } from "State/types";
import isMobile from "is-mobile";

interface HomePageProps {
  name: String;
  data: PortfolioData;
  playSlide: Function;
  activeSlide: number;
  originSlide?: number;
  slider?: JSX.Element;
}

export const HomePage = (props: HomePageProps) => {
  const [sliderHidden, setSliderHidden] = React.useState(true);
  const [skipTitle, setSkipTitle] = React.useState(false);

  React.useEffect(() => {
    if(props.originSlide) {
      
    console.log(props.originSlide);
      showSlider();
    }

  })

  var networks = props.data.social
    ? props.data.social.map(function (network) {
        return (
          <li key={network.name}>
            <a href={network.url}>
              <i className={network.className}></i>
            </a>
          </li>
        );
      })
    : null;

  const showSlider = () => {
    if (!isMobile() && sliderHidden) {
      setSkipTitle(true);
      setSliderHidden(false);
      anime({
        targets: [".banner"],
        translateX: "-27.5%",
        duration: 1250,
        easing: "easeOutCirc",
      });
      anime({
        targets: [".smoothscroll"],
        translateY: "10vw",
        duration: 1500,
        easing: "easeOutCirc",
      });
      anime({
        targets: [".slider"],
        translateY: ["10vh", "0"],
        opacity: [0, 1],
        duration: 1500,
        easing: "easeOutCirc",
        begin: ()=> {props.playSlide(props.activeSlide)}
      })
      anime({
        targets: ["#navBar"],
        translateX: ["5vw", "0"],        
        opacity: [0, 1],
        duration: 1500,
        easing: "easeOutCirc",
      });
    }
  };

  return (
    <header id="home" onWheel={!isMobile() ? showSlider : undefined}>
      <Title
        titleStr={`Hi, I'm ${props.data.name}.`}
        networks={networks}
        skipTitle={skipTitle}
      ></Title>

      {!isMobile() ? (
        <Fragment>
          {props.slider}
          <p className="scrolldown">
            <a className="scrollicon" onClick={showSlider} href="#about">
              <i className="icon-down-circle"></i>
            </a>
          </p>
        </Fragment>
      ) : (
        <p className="scrolldown">
          <a className="scrollicon"  href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      )}
    </header>
  );
};

export default connect(   (state: { slideState: SlideState }, ownProps) => ({
  activeSlide: state.slideState.activeSlide,
  originSlide: state.slideState.originSlide,
  ...ownProps,
}), { playSlide })(HomePage);
