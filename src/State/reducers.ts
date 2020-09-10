import { ACTIONS, SlideState, SlideAction } from "./types";
import { combineReducers } from "redux";


function slideReducer(state:SlideState = {slides: new Map()}, action: SlideAction) : SlideState{
    console.log(action, state)
    switch(action.type) {
        case ACTIONS.SCROLL_SLIDE: {
            if (state.activeSlide === undefined) return state;
            const target = state.activeSlide + (action.direction || 0);
            if (target < 0 || target >= state.slides.size || action.direction === undefined) return state;
            return {
                ...state,
                activeSlide: target,
                playSlide: target
            }
        }
        case ACTIONS.SWAP_SLIDE: {
            return {
                ...state,
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
            slides.set(action.slideName.toLowerCase(), action.key);
            return {
                ...state,
                slides
            }
        }
        case ACTIONS.URL_TO_SLIDE: {
            let originSlide = state.slides.get(action.slideName);
            console.log(state, originSlide);
            return {
                ...state,
                activeSlide: originSlide,
                skipTitle: true,
            }
        }
        default:
            return state;
    }
}

export default combineReducers({slideState: slideReducer})