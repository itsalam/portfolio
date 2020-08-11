import React, { Component } from "react";
import { PortfolioData } from "Models/portfolioData";
import "./About.scss";

class About extends Component<PortfolioData, {}> {

   render() {

      const data = this.props;

      return (
         <section id="about">
            <h1> ABOUT </h1>
            <h3> A new grad with an affinity of exploring all that programming has to offer. While I'm currently enjoy learning what modern front-end techonology can make (like this website), I'm eager to learn whatever else may interests me and makes me a strong asset in the field. </h3>
            {/* <div className="row">
               <div className="three columns">
                  <img
                     className="profile-pic"
                     src={data.image}
                     alt="Tim Baker Profile Pic"
                  />
               </div>
               <div className="nine columns main-col">
                  <h2>About Me</h2>

                  <p>{data.name}</p>
                  <div className="row">
                     <div className="columns contact-details">
                        <h2>Contact Details</h2>
                        <p className="address">
                           <span>{data.name}</span>
                           <br />
                           <span>
                              {data.address.street}
                              <br />
                              {data.address.city} {data.address.state}, {data.address.zip}
                           </span>
                           <br />
                           <span>{data.phone}</span>
                           <br />
                           <span>{data.email}</span>
                        </p>
                     </div>
                     <div className="columns download">
                        <p>
                           <a href={data.resumeDownload} className="button">
                              <i className="fa fa-download"></i>Download Resume
                  </a>
                        </p>
                     </div>
                  </div>
               </div>
            </div> */}
         </section>
      );
   }
}

export default About;
