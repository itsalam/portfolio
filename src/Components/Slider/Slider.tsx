import React, { Component, useEffect, Fragment } from 'react';
import anime from "animejs";
import { Transition, TransitionGroup } from 'react-transition-group';
import './Slider.scss';
import { swapSlide, registerSlide, playSlide } from "State/actions";
import { connect } from 'react-redux';
import { isWideScreen } from 'Helpers/functions';
import Navbar from 'Components/NavBar/Navbar';
import { SlideState } from 'State/types';

const Slider = (props: { slides: JSX.Element[], activeSlide: number, swapSlide: Function, playSlide: Function, registerSlide:Function, disabled?:Boolean}) => {
    const [slider, setSlider] = React.useState({
        currentSlide: 0,
        isMoving: false,
        slideLength: props.slides.length
    })
    
    const nodeRef : React.RefObject<HTMLDivElement> = React.createRef();

    React.useEffect(()=>{
        props.activeSlide !== slider.currentSlide && slideTo(props.activeSlide);
    })

    const slideTo = (target: number) => {
        if (target < 0 || target >= slider.slideLength || slider.isMoving) return;
        const direction = target > slider.currentSlide? 1 : -1;
        props.swapSlide(target);
        setSlider({ ...slider, isMoving: true });
        setTimeout(()=> {
            anime({
                duration: 400,
                targets: document.querySelectorAll(`.active`,),
                translateY: [0, -100 * direction + "%"],
                easing: "easeInOutQuart",
            }
            );
    
            anime({
                duration: 400,
                targets: document.querySelectorAll(`.slide-${target}`),
                translateY: [100 * direction + "%", 0],
                easing: "easeInOutQuart",
                complete: () => { 
                    setSlider({ ...slider, isMoving: false, currentSlide: target}); 
                    props.playSlide(target);}
            }
            );
        }, 0);
    }

    const handleScroll = (event: React.WheelEvent) => {
        event.preventDefault();
        var direction = event.deltaY > 0 ? 1: -1;
        var target =  slider.currentSlide + direction;
        slideTo(target);
    }

    return (
        props.disabled? props.slides[0] :
        <Fragment>
            <TransitionGroup className="slider">
                {props.slides.map((slide, index) => {
                    props.registerSlide(slide.props.name, index);
                    return (
                        <Transition
                        timeout={2000}
                        appear
                        mountOnEnter
                        unmountOnExit
                        key= {`slide-${index}`}
                        nodeRef={nodeRef}
                        > 
                            <div onWheel={e => handleScroll(e)}
                                className={slider.currentSlide === index?  `slide active` : `slide-${index} slide`}
                                key= {`slide-${index}-page`}
                                ref={nodeRef}
                            >
                                <div className={(!isWideScreen() && index === 0) ? "main":""} id="background">
                                {React.cloneElement(slide, {...slide.props, index})}
                                </div>
                            </div>
                        </Transition>
                    )
                })}
            </TransitionGroup>
            <Navbar/>
        </Fragment>
    )
}

export default connect((state: { slideState: SlideState }, ownProps)=>(
    {...ownProps, 
    activeSlide: state.slideState.activeSlide
    }), 
    {swapSlide, playSlide, registerSlide})(Slider);