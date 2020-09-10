import React, { Fragment, Component } from "react";
import { PortfolioData } from "../../Models/portfolioData";
import "./HomePage.scss";
import anime from "animejs";
import { Title } from "./Title";
import { swapSlide } from "State/actions";
import { connect } from "react-redux";
import { SlideState } from "State/types";
import isMobile from "is-mobile";

interface HomePageProps {
  name: String;
  data: PortfolioData;
  swapSlide: Function;
  activeSlide?: number;
  slider?: JSX.Element;
  skipTitle?: boolean;
}

export class HomePage extends Component<HomePageProps, {sliderHidden: boolean, skipTitle: boolean}>{
  
  constructor(props: HomePageProps){
    super(props);

    this.getNetworks.bind(this)
    this.showSlider.bind(this);
    this.state = ({
      sliderHidden: true,
      skipTitle: false
    })
  }

  getNetworks(){
    return this.props.data.social
    ? this.props.data.social.map(function (network) {
        return (
          <li key={network.name}>
            <a href={network.url}>
              <i className={network.className}></i>
            </a>
          </li>
        );
      })
    : null;
  }

  componentDidMount() {
    window.addEventListener("wheel", this.showSlider, {once: true, passive: true, capture: true});
    window.addEventListener("click", this.showSlider, {once: true});
  }

  componentDidUpdate() {
    if(this.props.skipTitle) {
      this.showSlider();
    }
  }

  showSlider = () => {
    if (!isMobile() && this.state.sliderHidden) {
      this.setState({skipTitle: true, sliderHidden: false})

      anime({
        targets: [".banner"],
        translateX: "-27.5%",
        duration: 1250,
        easing: "easeOutCirc",
      });
      anime({
        targets: [".scrollicon"],
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
        begin: ()=> {this.props.activeSlide === undefined && this.props.swapSlide(0)}
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

  render() {
  return (
    <header id="home">
      <Title
        titleStr={`Hi, I'm ${this.props.data.name}.`}
        networks={this.getNetworks()}
        skipTitle={this.state.skipTitle}
      ></Title>

      {!isMobile() ? (
        <Fragment>
          {this.props.slider}
          <p className="scrolldown">
            <a className="scrollicon" onClick={this.showSlider} href="#about">
              <i className="icon-down-circle"></i>
            </a>
          </p>
        </Fragment>
      ) : (
        <p className="scrolldown">
          <a className="scrollicon" onClick={this.showSlider}>
            <i className="icon-down-circle"></i>
          </a>
        </p>
      )}
    </header>
  );
  }
};

export default connect(   (state: { slideState: SlideState }, ownProps) => ({
  activeSlide: state.slideState.activeSlide,
  skipTitle: state.slideState.skipTitle,
  ...ownProps,
}), { swapSlide })(HomePage);
