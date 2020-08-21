import React, { Component } from 'react';
import { PortfolioData } from 'Models/portfolioData';

const Contact = (props: {data: PortfolioData, name: String}) => {

      const data = props.data;

      const handleChange = () => {
         
      }

      return (
         <section id="contact">
            <div className="row section-head">

            </div>
            <div className="row">
               <div className="eight columns">
                  <form action="" method="post" id="contactForm" name="contactForm">
                     <fieldset>
                        <div>
                           <label htmlFor="contactName">Name <span className="required">*</span></label>
                           <input type="text" defaultValue="" size={35} id="contactName" name="contactName" onChange={handleChange} />
                        </div>
                        <div>
                           <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                           <input type="text" defaultValue="" size={35} id="contactEmail" name="contactEmail" onChange={handleChange} />
                        </div>
                        <div>
                           <label htmlFor="contactSubject">Subject</label>
                           <input type="text" defaultValue="" size={35} id="contactSubject" name="contactSubject" onChange={handleChange} />
                        </div>
                        <div>
                           <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                           <textarea cols={50} rows={13} id="contactMessage" name="contactMessage"></textarea>
                        </div>
                        <div>
                           <button className="submit">Submit</button>
                           <span id="image-loader">
                              <img alt="" src="images/loader.gif" />
                           </span>
                        </div>
                     </fieldset>
                  </form>
                  <div id="message-warning"> Error boy</div>
                  <div id="message-success">
                     <i className="fa fa-check"></i>Your message was sent, thank you!<br />
                  </div>
               </div>
               <aside className="four columns footer-widgets">
                  <div className="widget widget_contact">
                     <h4>Address and Phone</h4>
                     <p className="address">
                        {data.name}<br />
                        {data.address.street} <br />
                        {data.address.city}, {data.address.state} {data.address.zip}<br />
                        <span>{data.phone}</span>
                     </p>
                  </div>
                  
               </aside>
            </div>
         </section>
      );
   }


export default Contact;
