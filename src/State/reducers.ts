import { ACTIONS, SlideState, SlideAction } from "./types";
import { combineReducers } from "redux";



function slideReducer (state:SlideState = {activeSlide: 0, slides: new Map()}, action: SlideAction){
    console.log(state, action);
    switch(action.type) {
        case ACTIONS.SWAP_SLIDE: {
            return {
                ...state,
                currentSlide: action.activeSlide
            }
        }
        case ACTIONS.PLAY_SLIDE: {
            return {
                ...state,
                playSlide: action.playSlide
            }
        }
        case ACTIONS.REGISTER_SLIDE: {
            state.slides.set(action.slideName, action.key);
            console.log(state);
            return {
                ...state
            }
        }
        default:
            return state;
    }
}

export default combineReducers({slideState: slideReducer})