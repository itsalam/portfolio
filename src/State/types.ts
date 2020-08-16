export enum ACTIONS {
    SWAP_SLIDE = "SWAP_SLIDE",
    PLAY_SLIDE = "PLAY_SLIDE",
    REGISTER_SLIDES = "REGISTER_SLIDES",
    REGISTER_SLIDE = "REGISTER_SLIDE"
}

export interface SlideState {
    currentSlide?: number;
    playSlide?: number;
    slides?: {};
}

export interface SlideAction extends SlideState{
    type: ACTIONS
    key: number,
    slideName: String
}