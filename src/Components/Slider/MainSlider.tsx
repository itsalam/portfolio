import React, { useEffect } from 'react';
import { Slider } from './Slider';

const isWidescreen = () => {
    return window.innerWidth > 1280;
}

export const MainSlider = (props: {slides: JSX.Element[]}) => {
    const [isWide, setIsWide] = React.useState(isWidescreen());
    const [mainPage, setMainPage] = React.useState(props.slides[0]);
    const subSlides = React.useState(props.slides.slice(1));

    useEffect(() => {
       window.addEventListener('resize', (e) => { changeLayout()} )
    }) 

    const changeLayout = () => {
        const currentIsWide: boolean = isWidescreen();
        if(isWide !== currentIsWide){
            setMainPage(currentIsWide? React.cloneElement(mainPage,{...mainPage.props, subSlides}) : props.slides[0])
            setIsWide(currentIsWide);
        }
    }

    return (
        isWidescreen()? 
        mainPage:
        <Slider slides={props.slides}/>
    )
}