import React, { useEffect } from 'react';
import Slider from './Slider';
import { isWideScreen } from "Helpers/functions";

export const MainSlider = (props: {slides: JSX.Element[]}) => {
    const [isWide, setIsWide] = React.useState(isWideScreen());
    useEffect(() => {
       window.addEventListener('resize', (e) => { changeLayout()} )
    }) 

    const changeLayout = () => {
        const currentIsWide: boolean = isWideScreen();
        if(isWide !== currentIsWide){
            setIsWide(currentIsWide);
        }
    }

    return (
        <Slider slides={props.slides} disabled={isWideScreen()}/>
    )
}