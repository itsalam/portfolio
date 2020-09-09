import React, { Component } from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import HomePage from "./Components/HomePage/";
import About from "./Components/Slides/About/About";
import Contact from "./Components/Slides/Contact/Contact";
import Slider from "./Components/Slider/Slider";
import { VideoBackground } from "Components/Background/VideoBackground";
import Resume from "Components/Slides/Resume/Resume";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { urlToSlide, scrollSlide } from "State/actions";
import { isMobile } from "is-mobile";
var debounce = require("lodash.debounce");

const App = (
  props: { urlToSlide: Function; scrollSlide: Function },
  match: { slide: string }
) => {
  const [slides, setSlides] = React.useState<JSX.Element[]>();
  const [homePage, setHomePage] = React.useState<JSX.Element>();

  React.useEffect(() => {
    console.log(match.slide);
    getResumeData();
    match.slide && props.urlToSlide(match.slide);
  }, [props]);

  const getResumeData = async () => {
    await fetch("/resumeData.json")
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          alert(response);
        }
        return response.json();
      })
      .then((value) => {
        const aboutPage = <About data={value} name="About" />;
        const contactPage = <Contact data={value} name="Contact" />;
        const resumePage = <Resume data={value} name="Resume" />;
        const subSlider = (
          <Slider slides={[aboutPage, resumePage, contactPage]} />
        );
        const homePage = (
          <HomePage name="Home" data={value} slider={subSlider} />
        );
        setHomePage(homePage);
        setSlides([homePage, aboutPage, resumePage, contactPage]);
      });
  };
  return slides ? (
    <div className="App">
      <VideoBackground />
      {isMobile() ? <Slider slides={slides} /> : homePage}
    </div>
  ) : (
    <div id="loader">
      <Loader
        type="Rings"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
};

export default connect((a, b) => ({ b }), { urlToSlide, scrollSlide })(App);
