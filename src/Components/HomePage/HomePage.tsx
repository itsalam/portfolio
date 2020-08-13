import React, { Component, Fragment } from 'react';
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
   const [sliderHidden, setSliderHidden] = React.useState(true);
   const [titleAnimationComplete, setTitleAnimationComplete] = React.useState(false);

   var networks = props.social ?
      props.social.map(function (network) {
         return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      })
      :
      null;

   const showSlider = () => {
      if(isWidescreen() && sliderHidden && titleAnimationComplete){
         setSliderHidden(false);
         anime({
            targets: [".banner"],
            translateX: "-25vw",
            duration: 1250,
            easing: "easeOutCirc",
         })
         anime({
            targets: [".smoothscroll"],
            translateY: "10vw",
            duration: 4000,
            easing: "easeOutCirc",
         })
         anime({
            targets: [".slider"],
            translateY: ["10vh", "0"],
            opacity: [0, 1],
            duration: 1500,
            easing: "easeOutCirc"
         })
      }
   }

   return (
      <header id="home" onWheel={props.slider? showSlider : undefined}>

         <VideoBackground/>
         <Particles className="particles" params={particleData} />

         <Title titleStr={`Hi, I'm ${props.name}.`} networks={networks} onTitleComplete={() => {setTitleAnimationComplete(true)}}></Title>

         {props.slider?
               <Fragment>
                  {props.slider}
                  <p className="scrolldown">
                     <a className="smoothscroll" onClick={showSlider} href="#about"><i className="icon-down-circle"></i></a>
                  </p>
               </Fragment> 
            :
            <p className="scrolldown">
               <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
            </p>
         }
      </header>
   );
}

export default HomePage;
