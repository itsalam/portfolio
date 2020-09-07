import React, { Component } from "react";
import { connect } from "react-redux";
import { PortfolioData } from "Models/portfolioData";
import "./About.scss";
import anime from "animejs";
import { SlideState } from "State/types";
import { resetPlaySlide} from "State/actions";
import { isWideScreen } from "Helpers/functions";
import { playTitle } from "../Animations";

export const About = (props: {
  name: String;
  data: PortfolioData;
  slideState?: SlideState;
  index?: number;
  resetPlaySlide?: Function;
}) => {

  const [titlePlayed, setTitlePlayed] = React.useState(false);

  React.useEffect(() => {
    if (props.slideState?.playSlide === props.index && !titlePlayed) {
      playTitle("#aboutTitle", 0);
      setTitlePlayed(true);
      props.resetPlaySlide && props.resetPlaySlide();
    }
  });

  return (
    <div id="about">
      <div className="titleDiv">
        <svg id="aboutTitle" viewBox="0 0 150 100" className="svgTitle">
          <text x="50%" y="60%" textAnchor="middle" fill="transparent"> ABOUT
            </text>
        </svg>
        <hr />

      </div>

      <div className="about-text">
        <p>
          {" "}
          A new grad from Vancouver, BC. I'm a developer with an affinity for
          exploring all the industry has to offer. While I'm currently enjoying
          learning modern front-end technology (like building this site), I'm
          eager to learn whatever else may interest me and makes me a strong
          asset in my field.{" "}
        </p>
        <br />
        <p>
          With work history in two Fortune 500 companies, I have experience in
          large enterprise development, as well as small scale applications and
          projects built for private utility to help teams throughout company.{" "}
        </p>

        <br />
        <p>
          {" "}
          A majority of my hobbies involve creating and building; currently
          things such as CGI graphics, computer builds, and cooking.
        </p>
      </div>
      <div id="tools-section">

        <h2>Things I like using:</h2>
        <ul id="tools">
          {props.data.tools.map((tool, index) => {
            return (
              <li className="logo" key={index}>
                <img src={tool.path} alt="Trulli" />
                <p>{tool.name.charAt(0).toUpperCase() + tool.name.slice(1)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

About.displayName = "About";

export default connect(
  (state: { slideState: SlideState }, ownProps) => ({
    slideState: state.slideState,
    ...ownProps,
  }),
  { resetPlaySlide }
)(About);
