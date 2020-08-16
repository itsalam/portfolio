import { ACTIONS, SlideState } from "./types";
import { combineReducers } from "redux";


function slideReducer (state:SlideState = {currentSlide: 0}, action: {type:ACTIONS, currentSlide?: number, playSlide?: number}){
    console.log(state, action);
    switch(action.type) {
        case ACTIONS.SWAP_SLIDE: {
            return {
                ...state,
                currentSlide: action.currentSlide
            }
        }
        case ACTIONS.PLAY_SLIDE: {
            return {
                ...state,
                playSlide: action.playSlide
            }
        }
        default:
            return state;
    }
}

export default combineReducers({slideState: slideReducer})