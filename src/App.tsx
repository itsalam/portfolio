import React, { Component } from 'react';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import About from './Components/Slides/About';
import Contact from './Components/Slides/Contact';
import Footer from './Components/Footer';
import { PortfolioData } from './Models/portfolioData';
import Header from './Components/Header/Header';
import { Slider } from './Components/Slider/Slider';
import { MainSlider } from 'Components/Slider/MainSlider';


class App extends Component<{}, {slides: JSX.Element[]}>{

  async componentDidMount(){
    await this.getResumeData();
    
    console.log(this.state)
  }

  async getResumeData() {

    await fetch('/resumeData.json')
      .then(response => {
        if (!response.ok){
          console.log(response);
          alert(response);
        }
        return response.json();
      }).then(value => {
        
        const aboutPage = <About {...value} />;
        const contactPage = <Contact {...value} />;
        const subSlider = <Slider slides={[aboutPage, contactPage]}/>;
        this.setState({
          slides: [
            <HomePage {...value} slider={subSlider} />,
            <About {...value} />,
            <Contact {...value} />
          ]
        });
      });
    
  }




  render() {

    return (
      this.state? 
      <div className="App">
        <MainSlider slides={this.state.slides}></MainSlider>
      </div>
      :
      <div></div>
    );
  }
}

export default App;
