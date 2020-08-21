import React from "react";
import { connect } from "react-redux";
import { SlideState } from "State/types";
import { swapSlide } from "State/actions";

const NavBar = (props:{ slides: Map<string, number>}) => {
    return (
        <div>
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

export default connect((state: SlideState, ownProps)=>({slides: state.slides}), {swapSlide})(NavBar);