import React, { useEffect } from 'react';
import "./Title.scss";
import anime from 'animejs';
import { wait } from '@testing-library/react';

export const Title = (props: { titleStr: string, networks: JSX.Element[] | null, onTitleComplete: Function }) => {
    const [currentTitle, setCurrentTitle] = React.useState("");
    const [animationComplete, setAnimationComplete] = React.useState(false);
    const ref = React.createRef<HTMLDivElement>();

    useEffect(() => {
        const cursorSpeed = currentTitle? anime.random(80, 125) : 1000;
        setTimeout(() => {
            setCurrentTitle(currentTitle + props.titleStr.charAt(currentTitle.length));
        }, cursorSpeed);
        if (currentTitle.length === props.titleStr.length && !animationComplete) {
            setAnimationComplete(true)
            anime.timeline({
                delay: 1500,
                update: (anim) => {console.log(anim.progress)},
                loopComplete: () => {console.log("done"); props.onTitleComplete();}
            }).add({
                duration: 1000,
                targets: ".title-text",
                easing: "easeInOutCirc",
                translateY: ["4vh", 0],
                delay: 0,
            }, 0).add({
                targets: ".smoothscroll",
                opacity: {
                    value: [0, 1],
                    duration: 1500,
                    delay: 500
                },
                translateY: {
                    value: ["4vh", 0],
                    easing: "easeOutQuint",
                    duration: 1500,
                    delay: 500
                }
            }, 0).add({
                targets: ".subtitle",
                translateY: {
                    easing: "easeOutQuint",
                    value: ["-1vh", 0],
                    delay: 500,
                    duration: 1500,
                },                
                opacity: {
                    value: [0, 1],
                    duration: 1500,
                    delay: 500,
                },
            }, 0)
        }
    }, [animationComplete, currentTitle, props])

    return (
        <div className="row banner">
            <div className={"banner-text"}>
                <div className={"title-text"}>
                    <h1 className="responsive-headline" id="title">{currentTitle}</h1>
                </div>
                <div className="subtitle" ref={ref}>
                    <h3> Full-Stack Developer | Machine Learning Enthusiast </h3>
                    <hr />
                    <ul className="social">
                        {props.networks}
                    </ul>
                </div>
            </div>
        </div>
    )
}