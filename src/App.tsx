import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import { PortfolioData } from './Models/portfolioData';


class App extends Component<{}, PortfolioData>{

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
      }).then(value => this.setState({...value}));
  }


  render() {

    return (
      this.state? 
      <div className="App">
        <Header {...this.state} />
        <About {...this.state} />
        <Contact {...this.state} />
        <Footer {...this.state} />
      </div>
      :
      <div></div>
    );
  }
}

export default App;
