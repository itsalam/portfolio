export enum ACTIONS {
  SWAP_SLIDE = "SWAP_SLIDE",
  PLAY_SLIDE = "PLAY_SLIDE",
  REGISTER_SLIDES = "REGISTER_SLIDES",
  REGISTER_SLIDE = "REGISTER_SLIDE",
  URL_TO_SLIDE = "URL_TO_SLIDE",
  SCROLL_SLIDE = "SCROLL_SLIDE"
}

export interface SlideState {
    slides: Map<string, number>;
    activeSlide: number;
    oldSlide?: number;
    originSlide?: number;
    playSlide?: number;
}

export interface SlideAction extends SlideState{
    type: ACTIONS
    key: number,
    slideName: string,
    direction?: number;
}