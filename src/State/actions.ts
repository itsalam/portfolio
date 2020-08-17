import { ACTIONS } from "./types";

export const swapSlide = (slideNumber: number) => {
  return {
    type: ACTIONS.SWAP_SLIDE,
    currentSlide: slideNumber,
  };
};

export const playSlide = (slideNumber: number) => {
    return {
      type: ACTIONS.PLAY_SLIDE,
      playSlide: slideNumber,
    };
  };

export const resetPlaySlide = () => {
    return {
        type: ACTIONS.PLAY_SLIDE,
        playSlide: undefined
    }
}
  
export const registerSlide = (slideName: String, key: number) => {
  return {
      type:ACTIONS.REGISTER_SLIDE,
      slideName,
      key,
  }
}