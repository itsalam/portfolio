import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import anime from "animejs";
import "./VideoBackground.scss";
import isMobile from "is-mobile";
import Particles from 'react-particles-js';

var particleData = require("particles.json");

export const VideoBackground = () => {

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
  });

  return (
    <CSSTransition in={true} timeout={10000}>
      <div className="video-container">
        <div className="pattern-overlay"></div>
        <div id="_buffering-background"></div>
        {!isMobile({tablet: true}) && <Particles className="particles" params={particleData} />}
        <video preload="auto" autoPlay playsInline id="background_video" loop muted/>
      </div>
    </CSSTransition>
  );
};

