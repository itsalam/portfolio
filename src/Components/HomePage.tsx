import React, { Component } from 'react';
import { PortfolioData } from '../Models/portfolioData';
import anime from "animejs";
import Particles from 'react-particles-js';
import './HomePage.scss';
import { Transition } from 'react-transition-group';
var particleData = require("../particles.json");

class HomePage extends Component<PortfolioData> {

   onYouTubeIframeAPIReady() {
      var player;
      player = new YT.Player('YouTubeBackgroundVideoPlayer', {
          videoId: 'qt9jjQqJ3Wc', // YouTube Video ID
          width: 1280,               // Player width (in px)
          height: 720,              // Player height (in px)
          playerVars: {
              autoplay: 1,        // Auto-play the video on load
              autohide: 1,
              disablekb: 1, 
              controls: 0,        // Hide pause/play buttons in player
              showinfo: 0,        // Hide the video title
              modestbranding: 1,  // Hide the Youtube Logo
              loop: 1,            // Run the video in a loop
              fs: 0,              // Hide the full screen button
              rel: 0,
              enablejsapi: 1,
              cc_load_policy: 0, // closed caption
              iv_load_policy: 3, // annotations
              playsinline: 1, // play inline on iOS
          },
          events: {
            onReady: function(e) {
                e.target.mute();
                e.target.setPlaybackQuality('hd1080');
                e.target.playVideo();
            },
            onStateChange: function(e) {
             
              if (e.data === 1) { // fade out #_buffering-background
                  anime({
                     duration: 1000,
                     targets: document.getElementById('_buffering-background'),
                     opacity: [1, 0],
                  })
                  // if (!this.state.title){
                  //    this.showTitle();
                  // }
              }
              if (e.data === 0) { // loop video
                  e.target.mute();
                  e.target.setPlaybackQuality('hd1080');
                  e.target.playVideo();
              }
            }
          }
      });
    }

   async componentDidMount() {
      await fetch('/resumeData.json')
         .then(response => {
            if (!response.ok) {
               console.log(response);
               alert(response);
            }
            return response.json();
         }).then(value => this.setState({ ...value }));
      this.onYouTubeIframeAPIReady()
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

            <Transition
               in={true}
               timeout={10000}>
               <div className="video-background">
                  {/* <div className="pattern-overlay"></div> */}
                  <div id="_buffering-background"></div>
                  <div className="video-foreground" id="YouTubeBackgroundVideoPlayer">
                  </div>
               </div>
            </Transition>
            <Particles className="particles" params={particleData} />

            <div className="row banner">

               <div className="banner-text">
                  <div className="title-text">
                     <h1 className="responsive-headline" id="title">Hi, I'm {data.name}.</h1>
                  </div>
                  <h3> Hey don't look at this yet its not ready C: </h3>
                  {/* <h3>I'm a {data.address.city} based <span>{data.occupation}</span>. {data.description}.</h3> */}
                  <hr />
                  <ul className="social">
                     {networks}
                  </ul>
               </div>
            </div>

            <p className="scrolldown">
               <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
            </p>

         </header>
      );
   }
}

export default HomePage;
