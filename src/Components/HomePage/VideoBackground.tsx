import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import anime from 'animejs';
import './VideoBackground.scss';

export const VideoBackground = () => {
    useEffect(() => {
        var player;
        // @ts-ignore
        window.YT.ready( ()=> {
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
        });
        
      }
    );

    return (
        <CSSTransition
        in={true}
        timeout={10000}>
        <div className="video-background">
           {/* <div className="pattern-overlay"></div> */}
           <div id="_buffering-background"></div>
           <div className="video-foreground" id="YouTubeBackgroundVideoPlayer">
           </div>
        </div>
     </CSSTransition>
    );
}