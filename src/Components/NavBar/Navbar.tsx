import React from "react";
import { connect } from "react-redux";
import { SlideState } from "State/types";
import { swapSlide } from "State/actions";
import "./Navbar.scss"
import { slideIcon } from "Helpers/functions";

const NavBar = (props: { slides: Map<string, number>, activeSlide: number, swapSlide: Function }) => {
    console.log(props);
    return (
        <div id="navBar">
            <ul>
                {
                    Array.from(props.slides.entries(), ([key, value]) => {
                        return (
                        <li key={key} className={"navEntry " + ( props.activeSlide === value? "current" : "" )} onClick={() => props.swapSlide(value)}>
                            <div className="navContent" >
                                <i className="material-icons">{slideIcon(key.toLowerCase())}</i>
                                <div>
                                    <p>{key.toUpperCase()}</p>
                                </div>
                            </div>
                        </li> )
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