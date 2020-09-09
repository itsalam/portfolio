import { ACTIONS, SlideState, SlideAction } from "./types";
import { combineReducers } from "redux";



function slideReducer (state:SlideState = {activeSlide: 0, slides: new Map()}, action: SlideAction){
    console.log(state, action);
    switch(action.type) {
        case ACTIONS.SCROLL_SLIDE: {
            const target = state.activeSlide + (action.direction || 0);
            if (target < 0 || target >= state.slides.size || action.direction === undefined) return state;
            return {
                ...state,
                oldSlide: state.activeSlide,
                activeSlide: target,
                playSlide: target
            }
        }
        case ACTIONS.SWAP_SLIDE: {
            return {
                ...state,
                oldSlide: state.activeSlide,
                activeSlide: action.activeSlide,
                playSlide: action.activeSlide
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
                oldSlide: state.activeSlide,
                activeSlide: originSlide,
                playSlide: originSlide,
                originSlide
            }
        }
        default:
            return state;
    }
}

export default combineReducers({slideState: slideReducer})