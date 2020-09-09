import React, { Component, useEffect, Fragment } from 'react';
import anime from "animejs";
import { Transition, TransitionGroup } from 'react-transition-group';
import './Slider.scss';
import { swapSlide, registerSlide } from "State/actions";
import { connect } from 'react-redux';
import Navbar from 'Components/NavBar/Navbar';
import { SlideState } from 'State/types';
import isMobile from "is-mobile";

const Slider = (props: { slides: JSX.Element[], originSlide?: number, oldSlide?: number, activeSlide: number, registerSlide:Function}) => {
    const [slider, setSlider] = React.useState({
        isMoving: false,
        slideLength: props.slides.length
    })

    const nodeRef : React.RefObject<HTMLDivElement> = React.createRef();

    const slideTo =  (target: number) => {
        if (slider.isMoving) return;
        console.log(target);
        setSlider({ ...slider, isMoving: true });
        const direction = props.oldSlide? (props.oldSlide < target ? 1 : -1) : 1;
        setTimeout(()=> {
            anime({
                duration: 400,
                targets: document.querySelectorAll(`.slide-${props.oldSlide}`),
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
                    setSlider({ ...slider, isMoving: false}); 
            }
        });
        }, 50);
    }

    useEffect(()=>{
        if (props.originSlide) slideTo(props.originSlide);
        props.slides.forEach((slide, index) => {
            props.registerSlide(slide.props.name, index);
        })
            
    }, [props.originSlide, props.slides])

    useEffect(()=> {
        slideTo(props.activeSlide);
    }, [props.activeSlide]);

    return (
        <Fragment>
            <TransitionGroup className="slider">
                {props.slides.map((slide, index) => {
                    return (
                        <Transition
                        timeout={2000}
                        appear
                        mountOnEnter
                        unmountOnExit
                        key= {`slide-${index}`}
                        nodeRef={nodeRef}
                        > 
                            <div
                                className={`slide-${index} slide ` + (props.activeSlide === index?  `` : "")}
                                key= {`slide-${index}-page`}
                                ref={nodeRef}
                            >
                                <div className={(isMobile() && index === 0) ? "main":""} id="background">
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
    oldSlide: state.slideState.oldSlide,
    activeSlide: state.slideState.activeSlide,
    originSlide: state.slideState.originSlide
    }), 
    {swapSlide, registerSlide})(Slider);