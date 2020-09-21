import React, { useEffect } from "react";
import { connect } from "react-redux";
import { SlideState } from "State/types";
import { swapSlide } from "State/actions";
import "./Navbar.scss"
import { slideIcon } from "Helpers/functions";
import anime from "animejs";

const NavBar = (props: { slides: Map<string, number>, activeSlide?: number, swapSlide: Function }) => {

    useEffect(() => {
        props.activeSlide !== undefined && anime({
            duration: 300,
            targets: document.querySelectorAll("#navBar .activeTab"),
            translateY: `${80*props.activeSlide}px`,
            easing: "easeInOutQuart",
        });
    },[props.activeSlide])

    return (
        <div id="navBar">
            <ul>
                <div className="activeTab"/>
                {
                    Array.from(props.slides.entries(), ([name, index]) => {
                        return (
                            <li key={name} className={"navEntry " + (props.activeSlide === index ? "current" : "")} onClick={() => props.swapSlide(index)}>
                                <div className="navContent" >
                                    <i className="material-icons">{slideIcon(name.toLowerCase())}</i>
                                    <div>
                                        <p>{name.toUpperCase()}</p>
                                    </div>
                                </div>
                            </li>)
                    })
                }
            </ul>
        </div>
    )
}

export default connect((state: { slideState: SlideState }, ownProps) => {

    return ({
        slides: state.slideState.slides,
        activeSlide: state.slideState.activeSlide
    })
}

    , { swapSlide })(NavBar);