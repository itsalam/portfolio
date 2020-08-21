import React from "react";
import { PortfolioData } from "Models/portfolioData";
import "./Resume.scss";

export const Resume = (props:{data: PortfolioData, name: String})=> {
    return(
        <div id="resume">
            <div className="about-title">
                <div className="text">
                    <h1> RESUME / WORKS </h1>
                </div>
              <hr />
            </div>
            <div id="pdfDiv">
                <embed id="resumePdf" src="Vincent Lam CMPT.pdf"/>
                <a id="download" href="./Vincent Lam CMPT.pdf" download="Vincent Lam CMPT.pdf">
                    <button type="submit">
                        <i className="material-icons">
                            get_app
                        </i>
                    </button>
                </a>
            </div>

            
            <div id= "works">

            </div>
        </div>
    )
  }