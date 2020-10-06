import React, { useEffect, Fragment } from 'react';
import anime from "animejs";
import { Transition, TransitionGroup } from 'react-transition-group';
import './Slider.scss';
import { swapSlide, registerSlide, scrollSlide } from "State/actions";
import { connect } from 'react-redux';
import Navbar from 'Components/NavBar/Navbar';
import { SlideState } from 'State/types';
import isMobile from "is-mobile";
import "./SlideStyle.scss";
import { playTitle } from 'Components/Slides/Animations';
import Hammer from "hammerjs";
var debounce = require("lodash.debounce");

const Slider = (props: { slides: JSX.Element[], activeSlide?: number, registerSlide: Function, scrollSlide: Function }) => {
    const [oldSlide, setOldSlide] = React.useState<number>();
    const [slideActive, setSlideActive] = React.useState(false);
    const [slidesVisited, ] = React.useState(props.slides.map(() => false));

    const nodeRef: React.RefObject<HTMLDivElement> = React.createRef();

    const playTitleOnce = (target: number) => {
        !slidesVisited[target] && playTitle(target, 0);
        slidesVisited[target] = true;
    }

    const slideTo = (target: number) => {
        if (oldSlide === target) return;
        const direction = oldSlide ? (oldSlide < target ? 1 : -1) : 1;
        console.log(target, oldSlide, direction);
        setTimeout(() => {
            anime({
                duration: 500,
                targets: document.querySelectorAll(`.slide-${oldSlide}`),
                translateY: [0, -50 * direction + "%"],
                opacity: [ 1, 0 ],
                easing: "easeInOutQuart",
                "z-index": [20, -20], 
                begin: () => {
                    setTimeout(() => playTitleOnce(target), 250)
                },
                complete: () => {
                    setOldSlide(target);
                }
            }
            );

            anime({
                duration: 500,
                targets: document.querySelectorAll(`.slide-${target}`),
                opacity: [ 0, 1 ],
                translateY: [40 * direction + "%", 0],
                "z-index": [-20, 20], 
                easing: "easeInOutQuart",
            });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        console.log(props.activeSlide, !slideActive);
        if (props.activeSlide !== undefined && !slideActive) {
            document.querySelector(`.slide-${props.activeSlide}`)?.classList.add("active");
            setOldSlide(props.activeSlide);
            playTitleOnce(props.activeSlide);
            setTimeout(() => window.addEventListener(
                "wheel",
                debounce(
                    (event: WheelEvent) => {
                        var direction = event.deltaY > 0 ? 1 : -1;
                        props.scrollSlide(direction);
                    },
                    200,
                    { leading: true, trailing: false }
                ),
                { passive: true }
            ), 1000);
            setSlideActive(true);
        } else {
            props.activeSlide !== undefined && slideTo(props.activeSlide);
        }
    })

    useEffect(() => {
        if (isMobile({tablet: true})){
            
            var slider = document.querySelector('.slider') as HTMLElement;
            var hammer = new Hammer(slider!);

            hammer.get('swipe').set({
                direction: Hammer.DIRECTION_ALL,
                threshold: 10, 
                velocity: 0.1
              });

            hammer.on('swipeup swipedown', (e)=> {
                if (Hammer.DIRECTION_UP === e.direction) {
                    props.scrollSlide(1);
                } else if (Hammer.DIRECTION_DOWN === e.direction) {
                    props.scrollSlide(-1);
                }
            })
          }
    }, [])

    return (
        <Fragment>
            <TransitionGroup className="slider">
                {props.slides.map((slide, index) => {
                    return (
                        <Transition
                            timeout={500}
                            appear
                            mountOnEnter
                            unmountOnExit
                            key={`slide-${index}`}
                            nodeRef={nodeRef}
                        >

                            <div
                                className={`slide-${index} slide ` + (props.activeSlide === index ? "" : "")}
                                key={`slide-${index}-page`}
                                ref={nodeRef}
                            >
                            { 0 !== index? 
                                <div className="arrow up" onClick={()=> props.scrollSlide(-1)}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>:
                                <div/>
                            }

                                <div id={(isMobile({ tablet: true }) && index === 0) ? "main" : ""} className="background">
                                    {slide}
                                </div>
                            {props.slides.length -1 !== index? 
                                <div className="arrow down" onClick={()=> props.scrollSlide(1)}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>:
                                <div/>
                            }
                            
                            </div>
                        </Transition>
                    )
                })}
            </TransitionGroup>
            <Navbar />
        </Fragment>
    )
}

export default connect((state: { slideState: SlideState }, ownProps) => (
    {
        ...ownProps,
        activeSlide: state.slideState.activeSlide
    }),
    { swapSlide, registerSlide, scrollSlide })(Slider);