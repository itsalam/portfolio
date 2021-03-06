import { ACTIONS } from "./types";

export const urlToSlide = (slideName: string) => {
  return {
    type: ACTIONS.URL_TO_SLIDE,
    slideName,
  }
}

export const scrollSlide = (direction: number) => {
  return {
    type: ACTIONS.SCROLL_SLIDE,
    direction
  }
}

export const swapSlide = (slideNumber: number) => {
  return {
    type: ACTIONS.SWAP_SLIDE,
    activeSlide: slideNumber,
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