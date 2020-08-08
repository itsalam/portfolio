import React, { useEffect, Fragment } from 'react';
import "./Title.scss";
import anime from 'animejs';

export const Title = (props:{titleStr: string, networks: JSX.Element[] | null}) => {
    const [currentTitle, setCurrentTitle] = React.useState("");

    var subTitle = (<div>
    <h3> Hey don't look at this yet its not ready C: </h3>
    {/* <h3>I'm a {data.address.city} based <span>{data.occupation}</span>. {data.description}.</h3> */}
    <hr />
    <ul className="social">
        {props.networks}
    </ul>
    </div>);

    useEffect(() => {
        setTimeout(() => {
            
            setCurrentTitle(currentTitle+props.titleStr.charAt(currentTitle.length));
        }, anime.random(80, 95));
    })


    
    return(
        <div className="row banner">
        <div className="banner-text">
            <div className="title-text">
                <h1 className="responsive-headline" id="title">{currentTitle}</h1>
            </div>
            {currentTitle.length == props.titleStr.length? subTitle : null}
        </div>
        </div>
    )
}