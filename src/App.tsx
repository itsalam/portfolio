import React, { Component } from 'react';
import './App.css';
import HomePage from './Components/HomePage';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import { PortfolioData } from './Models/portfolioData';
import Header from './Components/Header/Header';
import { Slider } from './Components/Slider';


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
      }).then(value => this.setState({
        slides: [
          <HomePage {...value} />,
          <About {...value} />,
          <Contact {...value} />
        ]
      }));
    
  }




  render() {

    return (
      this.state? 
      <div className="App">
        <Slider slides={this.state.slides}></Slider>
      </div>
      :
      <div></div>
    );
  }
}

export default App;
