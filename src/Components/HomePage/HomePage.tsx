import React, { Component } from 'react';
import { PortfolioData } from '../../Models/portfolioData';
import Particles from 'react-particles-js';
import './HomePage.scss';
import { VideoBackground } from './VideoBackground';
import { Title } from './Title';
var particleData = require("particles.json");

interface HomePageProps extends PortfolioData {
   slider?: JSX.Element
}

export const HomePage = (props: HomePageProps) => {

   var networks = props.social ?
      props.social.map(function (network) {
         return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      })
      :
      null;

   React.useEffect(() => {
      console.log(props.slider);})

   return (
      <header id="home">

         <VideoBackground/>
         <Particles className="particles" params={particleData} />

         <Title titleStr={`Hi, I'm ${props.name}.`} networks={networks}></Title>

         <p className="scrolldown">
            <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
         </p>
         <div className="subslider"></div>
         {/* {props.slider? props.slider : null} */}

      </header>
   );
}

export default HomePage;
