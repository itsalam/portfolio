import React, { Component } from 'react';
import { PortfolioData } from '../../Models/portfolioData';
import Particles from 'react-particles-js';
import './HomePage.scss';
import { VideoBackground } from './VideoBackground';
import { Title } from './Title';
var particleData = require("particles.json");

class HomePage extends Component<PortfolioData> {

   async componentDidMount() {
      console.log(particleData);
      await fetch('/resumeData.json')
         .then(response => {
            if (!response.ok) {
               console.log(response);
               alert(response);
            }
            return response.json();
         }).then(value => this.setState({ ...value }));
   }

   render() {

      var data = this.props;

      var networks = data.social ?
         this.props.social.map(function (network) {
            return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
         })
         :
         null;

      return (
         <header id="home">

            <VideoBackground/>
            <Particles className="particles" params={particleData} />

            <Title titleStr={`Hi, I'm ${data.name}.`} networks={networks}></Title>

            <p className="scrolldown">
               <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
            </p>

         </header>
      );
   }
}

export default HomePage;
