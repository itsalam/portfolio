import React, { Component, useEffect } from 'react';
import anime from "animejs";
import { Transition, TransitionGroup } from 'react-transition-group';
import './Slider.css';
import { registerSlide, playSlide } from "State/actions";
import { connect } from 'react-redux';

const Slider = (props: { slides: JSX.Element[], playSlide: Function, registerSlide:Function, disabled?:Boolean}) => {
    const [slider, setSlider] = React.useState({
        currentSlide: 0,
        isMoving: false,
        slideLength: props.slides.length
    })

    const nodeRef : React.RefObject<HTMLDivElement> = React.createRef();

    const handleScroll = (event: React.WheelEvent) => {
        var length = slider.slideLength;
        var scrollingDown = event.deltaY > 0;
        var direction = scrollingDown? 1: -1;
        var oldSlide = slider.currentSlide;
        var target =  oldSlide + direction;
        if (target < 0 || target >= length || slider.isMoving) return;
        
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

    return (
        props.disabled? props.slides[0] :
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
                                {React.cloneElement(slide, {...slide.props, index})}
                            </div>
                        </Transition>
                    )
                })}
            </TransitionGroup>
    )
}

export default connect((a,b)=>({...b}), {playSlide, registerSlide})(Slider);