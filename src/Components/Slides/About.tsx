import React, { Component } from "react";
import { PortfolioData } from "Models/portfolioData";
import "./About.scss";

class About extends Component<PortfolioData, {}> {
  render() {
    const data = this.props;

    return (
      <div id="about">
        <div className="about-title">
          <h1> ABOUT </h1>
        </div>
        <div className="about-text">
          <p>
            {" "}
            A new grad with an affinity of exploring all that programming has to
            offer. While I'm currently enjoying learning what modern front-end
            technology can make (like this website), I'm eager to learn whatever
            else may interest me and makes me a strong asset in my field.{" "}
          </p>
         <br/>
          <p>
            With work history in two Fortune 500 companies, I have experience in
            large enterprise development, as well as small scale applications
            and projects built for private utility to help teams across the
            company with what they need effectively.{" "}
          </p>

          <br/>
          <p>
            {" "}
            A majority of my hobbies involve creating and building; currently
            things such as CGI graphics, computer builds, and cooking. I'm also
            passionate about fitness and health, especially calisthenics/body
            weight training.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
