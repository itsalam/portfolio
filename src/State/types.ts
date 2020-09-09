export enum ACTIONS {
  SWAP_SLIDE = "SWAP_SLIDE",
  PLAY_SLIDE = "PLAY_SLIDE",
  REGISTER_SLIDES = "REGISTER_SLIDES",
  REGISTER_SLIDE = "REGISTER_SLIDE",
  URL_TO_SLIDE = "URL_TO_SLIDE"
}

export interface SlideState {
    activeSlide: number;
    originSlide?: number;
    playSlide?: number;
    slides: Map<string, number>;
}

export interface SlideAction extends SlideState{
    type: ACTIONS
    key: number,
    slideName: string
}