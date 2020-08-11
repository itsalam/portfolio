import React, { Component } from 'react';
import { PortfolioData } from '../../Models/portfolioData';
import Particles from 'react-particles-js';
import './HomePage.scss';
import { VideoBackground } from './VideoBackground';
import { Title } from './Title';
import anime from 'animejs';
var particleData = require("particles.json");

interface HomePageProps extends PortfolioData {
   slider?: JSX.Element
}

const isWidescreen = () => {
   return window.innerWidth > 1280;
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

   const onTitleCompleted = () => {
      if(isWidescreen()){
         anime({
            targets: [".banner"],
            translateX: "-25vw",
            duration: 1250,
            easing: "easeOutCirc",
            delay: 500
         })
         anime({
            targets: [".slider"],
            translateY: ["10vh", "0"],
            opacity: [0, 1],
            duration: 1500,
            easing: "easeOutCirc",
            delay: 1000
         })
      }
   }

   return (
      <header id="home">

         <VideoBackground/>
         <Particles className="particles" params={particleData} />

         <Title titleStr={`Hi, I'm ${props.name}.`} networks={networks} onTitleComplete={props.slider? onTitleCompleted : undefined}></Title>

         {props.slider? 
               props.slider
            :
            <p className="scrolldown">
               <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
            </p>
         }
      </header>
   );
}

export default HomePage;
