import React from "react";
import { connect } from "react-redux";
import { SlideState } from "State/types";
import { swapSlide } from "State/actions";
import "./Navbar.scss"

const NavBar = (props:{ slides: Map<string, number>}) => {
    console.log(props);
    return (
        <div id="navBar">
            {
                Array.from(props.slides.entries(), (key, value)=>{
                    return(
                    <ul>

                    </ul>)
                })
            }  
        </div>
    )
}

export default connect((state: { slideState: SlideState }, ownProps)=> {

    console.log(state)
    return ({slides: state.slideState.slides})
}

    , {swapSlide})(NavBar);