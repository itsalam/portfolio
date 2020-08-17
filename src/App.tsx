import React, { Component } from "react";
import "./App.css";
import HomePage from "./Components/HomePage/";
import About from "./Components/Slides/About/About";
import Contact from "./Components/Slides/Contact";
import Slider from "./Components/Slider/Slider";
import { MainSlider } from "Components/Slider/MainSlider";
import { VideoBackground } from "Components/Background/VideoBackground";
import { Resume } from "Components/Slides/Resume/Resume";

class App extends Component<{}, { slides: JSX.Element[] }> {
  async componentDidMount() {
    await this.getResumeData();
  }

  async getResumeData() {
    await fetch("/resumeData.json")
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          alert(response);
        }
        return response.json();
      })
      .then((value) => {
        const aboutPage = <About data={value}/>;
        const contactPage = <Contact {...value} />;
        const resumePage = <Resume data={value}/>
        const subSlider = <Slider slides={[aboutPage, resumePage, contactPage]} />;
        this.setState({
          slides: [
            <HomePage {...value} slider={subSlider} />,
            aboutPage,
            resumePage,
            contactPage,
          ],
        });
      });
  }

  render() {
    return this.state ? (
      <div className="App">
        <VideoBackground />

        <MainSlider slides={this.state.slides}></MainSlider>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default App;
