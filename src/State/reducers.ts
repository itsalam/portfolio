import { ACTIONS, SlideState, SlideAction } from "./types";
import { combineReducers } from "redux";



function slideReducer (state:SlideState = {currentSlide: 0, slides: {}}, action: SlideAction){
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
        case ACTIONS.REGISTER_SLIDE: {
            state.slides[action.slideName] = action.key;
            return {
                ...state
            }
        }
        default:
            return state;
    }
}

export default combineReducers({slideState: slideReducer})