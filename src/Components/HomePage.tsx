import React, { Component } from 'react';
import { PortfolioData } from '../Models/portfolioData';
import Particles from 'react-particles-js';
import './HomePage.scss';

var particleData = require("../particles.json");

class HomePage extends Component<PortfolioData> {
   player: any;

   async componentDidMount() {
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

            
            <div className="video-background">
               <div id="_buffering-background"></div>
               <div className="video-foreground" id="YouTubeBackgroundVideoPlayer">
               </div>
            </div>
            <Particles className="particles" params={particleData} />

            <div className="row banner">

               <div className="banner-text">

                  <h1 className="responsive-headline">I'm {data.name}.</h1>
                  <h3>I'm a {data.address.city} based <span>{data.occupation}</span>. {data.description}.</h3>
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
