import React from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import HomePage from "./Components/HomePage/";
import About from "./Components/Slides/About/About";
import Contact from "./Components/Slides/Contact/Contact";
import Slider from "./Components/Slider/Slider";
import { VideoBackground } from "Components/Background/VideoBackground";
import Resume from "Components/Slides/Resume/Resume";
import { connect } from "react-redux";
import { urlToSlide, registerSlide, swapSlide } from "State/actions";
import { isMobile } from "is-mobile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = ( props: { urlToSlide: Function; registerSlide: Function, swapSlide: Function, match: {params: { slide: string}}}) => {

  const [view, setView] = React.useState<JSX.Element>();
  React.useEffect(() => {
    getResumeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
        const slides = [aboutPage, resumePage, contactPage]
        if (isMobile({tablet: true})){
          const homePage = <HomePage name="Home" data={value}/>
          slides.unshift(homePage);
          setView(<Slider slides={slides}/>)
        } else {
          const subSlider = (<Slider slides={slides}/>);
          setView(<HomePage name="Home" data={value} slider={subSlider} />);
        }
        slides.forEach((slide, index) => {
          props.registerSlide(slide.props.name, index);
        })
      }).then(() => {
        if (props.match.params.slide) {
          props.urlToSlide(props.match.params.slide);
        } else if (isMobile({tablet: true})){
          props.swapSlide(0);
        } 
        
      });
  };
  return view ? (
    <div className="App">
      <VideoBackground />
      {view}
      <ToastContainer 
            position="bottom-center"
            autoClose={5000}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover            
         />
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

export default connect((a, b) => ({ b }), { urlToSlide, registerSlide, swapSlide })(App);
