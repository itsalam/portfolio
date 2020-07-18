function onYouTubeIframeAPIReady() {
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
            if (e.data == YT.PlayerState.PLAYING) { // fade out #_buffering-background
                Velocity(document.getElementById('_buffering-background'), { opacity: 0 }, 500);
            }
            if (e.data == YT.PlayerState.ENDED) { // loop video
                e.target.playVideo();
            }
            if(e && e.data === 1){
                var videoHolder = document.getElementById('home-banner-box');
                if(videoHolder && videoHolder.id){
                  videoHolder.classList.remove('loading');
                }
            }else if(e && e.data === 0){
              e.target.playVideo()
            }
          }
        }
    });
  }