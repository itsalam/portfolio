import { ACTIONS, SlideState, SlideAction } from "./types";
import { combineReducers } from "redux";



function slideReducer (state:SlideState = {activeSlide: 0, slides: new Map()}, action: SlideAction){

    console.log(action);
    switch(action.type) {
        case ACTIONS.SWAP_SLIDE: {
            return {
                ...state,
                activeSlide: action.activeSlide
            }
        }
        case ACTIONS.PLAY_SLIDE: {
            return {
                ...state,
                playSlide: action.playSlide
            }
        }
        case ACTIONS.REGISTER_SLIDE: {
            const slides = new Map(state.slides);
            slides.set(action.slideName, action.key);
            return {
                ...state,
                slides
            }
        }
        case ACTIONS.URL_TO_SLIDE: {
            let originSlide = state.slides.get(action.slideName);
            return {
                ...state,
                originSlide,
            }
        }
        default:
            return state;
    }
}

export default combineReducers({slideState: slideReducer})