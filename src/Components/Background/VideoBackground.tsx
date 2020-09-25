import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import anime from "animejs";
import "./VideoBackground.scss";
import isMobile from "is-mobile";
import Particles from 'react-particles-js';

var particleData = require("particles.json");

export const VideoBackground = () => {
  var [height, setHeight] = React.useState<number>();
  var [width, setWidth] = React.useState<number>();

  const update = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  const fadeIn = () => {
    anime({
      duration: 2000,

      easing: "easeInQuad",
      targets: document.getElementById("_buffering-background"),
      opacity: [1, 0],
      delay: 1000,
    })
    fadeInOut();
    console.log("bitches")
  }

  const fadeInOut = () => {
      anime
        .timeline({
          targets: document.getElementById("_buffering-background"),
        })
        .add({
          duration: 2500,
          easing: "easeOutQuad",
          opacity: [1, 0],
        })
        .add({
          delay: 29500,
          duration: 2500,
          easing: "easeInQuad",
          opacity: [0, 1],
        })
  };

  useEffect(() => {

    var bv = new Bideo();
    bv.init({
      // Video element
      videoEl: document.querySelector('#background_video'),
  
      // Container element
      container: document.querySelector('.video-container'),
  
      // Resize
      resize: true,
  
      autoplay: true,
  
      // Array of objects containing the src and type
      // of different video formats to add
      src: [
        {
          src: 'background.mp4',
          type: 'video/mp4'
        }
      ],
  
      // What to do once video loads (initial frame)
      onLoad: function () {
        fadeInOut();
      }
    });

    window.addEventListener("resize", update);
  });

  return (
    <CSSTransition in={true} timeout={10000}>
      <div className="video-container">
        <div className="pattern-overlay"></div>
        <div id="_buffering-background"></div>
        {!isMobile({tablet: true}) && <Particles className="particles" params={particleData} />}
        {/* <div
          className="video-foreground"
          id="YouTubeBackgroundVideoPlayer"
        /> */}
        <video id="background_video" loop muted/>
      </div>
    </CSSTransition>
  );
};

