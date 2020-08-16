import React, { useEffect } from 'react';
import "./Title.scss";
import anime from 'animejs';

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
            }).add({
                duration: 1000,
                targets: ".title-text",
                easing: "easeInOutCirc",
                translateY: ["4vh", 0],
                delay: 0,
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
            }, 0).add({
                targets: "#linebreak",
                width: {
                    easing: "easeOutQuint",
                    value: "100%",
                    delay: 500,
                    duration: 750,
                },
            }, 0).add({
                targets: "header .social",
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
            }, 250)

            anime({                
                targets: ".smoothscroll",
                opacity: {
                    value: [0, 1],
                    duration: 1000,
                    delay: 500
                },
                translateY: {
                    value: ["4vh", 0],
                    easing: "easeOutQuint",
                    duration: 1000,
                    delay: 500
                },
                loopComplete: () => {console.log("done"); props.onTitleComplete();}
            })
        }
    }, [animationComplete, currentTitle, props])

    return (
        <div className="row banner">
            <div className={"banner-text"}>
                <div className={"title-text"}>
                    <h1 className="responsive-headline" id="title">{currentTitle}</h1>
                </div>
                <div className="subtitle" ref={ref}>
                    <h3> Full-Stack Developer </h3>
                    <hr id="linebreak"/>
                    <ul className="social">
                        {props.networks}
                    </ul>
                </div>
            </div>
        </div>
    )
}