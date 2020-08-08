import React, { useEffect, Fragment } from 'react';
import "./Title.scss";
import anime from 'animejs';

export const Title = (props: { titleStr: string, networks: JSX.Element[] | null }) => {
    const [currentTitle, setCurrentTitle] = React.useState("");
    const [titleCompleted, setTitleCompleted] = React.useState(false);
    const ref = React.createRef<HTMLDivElement>();
    const subtitle = (<div className="subtitle" ref={ref}>
        <h3> Hey don't look at this yet its not ready C: </h3>
        {/* <h3>I'm a {data.address.city} based <span>{data.occupation}</span>. {data.description}.</h3> */}
        <hr />
            <ul className="social">
                {props.networks}
            </ul>
        </div>)
    


    useEffect(() => {
        setTimeout(() => {
            setCurrentTitle(currentTitle + props.titleStr.charAt(currentTitle.length));
        }, anime.random(60, 95));
        if (currentTitle.length === props.titleStr.length) {
            setTitleCompleted(true);
            anime({
                duration: 500,
                targets: ".title-text",
                easing: "easeInCubic",
                translateY: ["4vh", 0]
            }
            )
            anime({
                duration: 750,
                targets: ".subtitle",
                opacity: [0, 1],
                easing: "easeInCubic",
                translateY: ["-2vg", 0]
            }
            )
        }
    }, [currentTitle, props.titleStr, props.networks])

    return (
        <div className="row banner">
            <div className={"banner-text"}>
                <div className={"title-text " +  (subtitle !== undefined? "completed" : "")}>
                    <h1 className="responsive-headline" id="title">{currentTitle}</h1>
                </div>
                {subtitle}
            </div>
        </div>
    )
}