import React, { useEffect } from 'react';
import { Slider } from './Slider';

const isWidescreen = () => {
    console.log(window.innerWidth > 1280)
    return window.innerWidth > 1280;
}

export const MainSlider = (props: {slides: JSX.Element[]}) => {
    const [mainPage, setMainPage] = React.useState(props.slides[0]);
    const subSlides = React.useState(props.slides.slice(1));

    useEffect(() => {
       window.addEventListener('resize', (e) => { changeLayout()} )
    }) 

    const changeLayout = () => {
        if(isWidescreen()){
            setMainPage(React.cloneElement(mainPage,{...mainPage.props, subSlides}))
        } else {
            setMainPage(props.slides[0])
        }
    }

    return (
        isWidescreen()? 
        React.cloneElement(mainPage,{...mainPage.props, subSlides}):
        <Slider slides={props.slides}/>
    )
}