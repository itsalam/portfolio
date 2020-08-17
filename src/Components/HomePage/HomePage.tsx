import React, { Fragment } from "react";
import { PortfolioData } from "../../Models/portfolioData";
import "./HomePage.scss";
import anime from "animejs";
import { Title } from "./Title";
import { playSlide } from "State/actions";
import { connect } from "react-redux";
import { isWideScreen } from "Helpers/functions";

interface HomePageProps extends PortfolioData {
  playSlide: Function;
  slider?: JSX.Element;
}

export const HomePage = (props: HomePageProps) => {
  const [sliderHidden, setSliderHidden] = React.useState(true);
  const [titleAnimationComplete, setTitleAnimationComplete] = React.useState(false);

  var networks = props.social
    ? props.social.map(function (network) {
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
    if (isWideScreen() && sliderHidden && titleAnimationComplete) {
      setSliderHidden(false);
      anime({
        targets: [".banner"],
        translateX: "-26.5vw",
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
        begin: ()=> {props.playSlide(0)}
      });
    }
  };

  return (
    <header id="home" onWheel={isWideScreen() ? showSlider : undefined}>
      <Title
        titleStr={`Hi, I'm ${props.name}.`}
        networks={networks}
        onTitleComplete={() => {
          setTitleAnimationComplete(true);
        }}
      ></Title>

      {isWideScreen() ? (
        <Fragment>
          {props.slider}
          <p className="scrolldown">
            <a className="smoothscroll" onClick={showSlider} href="#about">
              <i className="icon-down-circle"></i>
            </a>
          </p>
        </Fragment>
      ) : (
        <p className="scrolldown">
          <a className="smoothscroll"  href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      )}
    </header>
  );
};

export default connect(null, { playSlide })(HomePage);
