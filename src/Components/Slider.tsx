import React, { FunctionComponent, Component, useRef, Fragment } from 'react';
import anime from "animejs";
import { Transition, TransitionGroup } from 'react-transition-group';
import './Slider.css';
import Header from './Header/Header';


type SliderState = {
    currentSlide: number,
    isMoving: boolean,
    slideLength: number
}

export class Slider extends Component<{ slides: JSX.Element[] }, SliderState> {
    public readonly state: Readonly<SliderState> = {
        currentSlide: 0,
        isMoving: false,
        slideLength: this.props.slides.length
    }

    constructor(props: any) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    private nodeRef : React.RefObject<HTMLDivElement> = React.createRef();

    handleScroll(event: React.WheelEvent) {
        event.preventDefault();

        var length = this.state.slideLength;
        var scrollingDown = event.deltaY > 0;
        var direction = scrollingDown? 1: -1;
        var oldSlide = this.state.currentSlide;
        var target =  oldSlide + direction;
        if (target < 0 || target >= length || this.state.isMoving) return;
        
        this.setState({ isMoving: true });

        var updates = 0;

        console.log(direction);
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
                complete: () => { this.setState({isMoving: false, currentSlide: target})}
            }
            );
        }, 0);
        


    }

    render() {
        return (
            <Fragment>
                <Header/>
                <TransitionGroup className="slider">
                    {this.props.slides.map((slide, index) => {
                        return (
                            <Transition
                            timeout={2000}
                            appear
                            mountOnEnter
                            unmountOnExit
                            key= {`slide-${index}`}
                            nodeRef={this.nodeRef}
                        > 
                            <div onWheel={e => this.handleScroll(e)}
                                className={this.state.currentSlide === index?  `slide active` : `slide-${index} slide`}
                                key= {`slide-${index}-page`}
                                ref={this.nodeRef}
                            >
                                {slide}
                            </div>
                            
                        </Transition>
                        )
                    })}
                </TransitionGroup>
                </Fragment>
        )
    }
}