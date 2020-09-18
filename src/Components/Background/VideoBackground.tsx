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

  const fadeInOut = () => {
    setTimeout(
      () =>
        anime
          .timeline({
            targets: document.getElementById("_buffering-background"),
          })
          .add({
            duration: 2500,
            easing: "easeOutQuad",
            opacity: [0, 1],
          })
          .add({
            duration: 2500,
            easing: "easeInQuad",
            opacity: [1, 0],
          }),
      29500
    );
  };

  useEffect(() => {

    // @ts-ignore
    window.YT.ready(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      var player = new YT.Player("YouTubeBackgroundVideoPlayer", {
        videoId: "qt9jjQqJ3Wc", // YouTube Video ID
        width: width, // Player width (in px)
        height: height, // Player height (in px)
        playerVars: {
          autoplay: 1, // Auto-play the video on load
          autohide: 1,
          disablekb: 1,
          controls: 0, // Hide pause/play buttons in player
          showinfo: 0, // Hide the video title
          modestbranding: 1, // Hide the Youtube Logo
          loop: 1, // Run the video in a loop
          fs: 0, // Hide the full screen button
          rel: 0,
          playlist: "qt9jjQqJ3Wc",
          enablejsapi: 1,
          cc_load_policy: 0, // closed caption
          iv_load_policy: 3, // annotations
          playsinline: 1, // play inline on iOS
          origin: `${window.location.origin.toString()}`,
        },
        events: {
          onReady: function (e: YT.PlayerEvent) {
            // @ts-ignore
            e.target.mute();
            e.target.setPlaybackQuality("hd1080");
            e.target.playVideo();
            anime({
              duration: 2000,

              easing: "easeInQuad",
              targets: document.getElementById("_buffering-background"),
              opacity: [1, 0],
              delay: 1000,
            })
            fadeInOut();
          },
          onStateChange: function (e) {
            if (e.data === 0) {
              // loop video
              fadeInOut();
            }
          },
        },
      });
    }, []);

    window.addEventListener("resize", update);
  });

  return (
    <CSSTransition in={true} timeout={10000}>
      <div className="video-background">
        <div className="pattern-overlay"></div>
        <div id="_buffering-background"></div>
        {!isMobile({tablet: true}) && <Particles className="particles" params={particleData} />}
        <div
          className="video-foreground"
          id="YouTubeBackgroundVideoPlayer"
        />
      </div>
    </CSSTransition>
  );
};
