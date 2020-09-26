import React, { useEffect } from "react";
import { connect } from "react-redux";
import { SlideState } from "State/types";
import { swapSlide } from "State/actions";
import "./Navbar.scss"
import { slideIcon } from "Helpers/functions";
import anime from "animejs";
import isMobile from "is-mobile";

const NavBar = (props: { slides: Map<string, number>, activeSlide?: number, swapSlide: Function }) => {

    const [isOpened, setIsOpened] = React.useState(false);

    const isFirstRun = React.useRef(true);
    
    useEffect(() => {
        const heightRange = isOpened? [`0px`, `300px`] : [`300px`, `0px`] ;
        const tabRange = isOpened? [0, 50]: [50, 0] ;
        !isFirstRun.current && anime.timeline().add({
            duration: 500,
            targets: document.querySelectorAll("#navBar #iconList"),
            'max-height': heightRange,
            'border-radius': [50, 0],
            easing: "easeInOutQuart",
            
            complete: () => {}
        }, 0).add({
            duration: 300,
            targets: document.querySelectorAll("#navBar .activeTab"),
            height: tabRange,
            easing: "easeInOutQuart"
        }, 250)
        isFirstRun.current = false;
    },[isOpened]);


    useEffect(() => {
        if (props.activeSlide !== undefined) {
            const translateTab = isMobile({tablet: true})? 
            {
                translateY: `${60*props.activeSlide}px`
            } : {
                translateY: `${80*props.activeSlide}px`
            }
            anime({
                duration: 300,
                targets: document.querySelectorAll("#navBar .activeTab"),
                ...translateTab,
                easing: "easeInOutQuart",
            });
        }
    },[props.activeSlide])

    return (
        <div id="navBar">
            {isMobile({tablet: true}) && 
                <div id="mobileMenu" onClick={() => setIsOpened(!isOpened)}>
                    <i className="material-icons">menu</i>
                </div>
            }
            <ul id="iconList">
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