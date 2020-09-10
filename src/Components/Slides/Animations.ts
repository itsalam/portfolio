import anime from "animejs";

export const playTitle = (slideIndex: number, delay: number = 0) => {
    anime({
      targets: `.slide-${slideIndex} #title text`,
      opacity: [0, 1],
        strokeDasharray: [
           {value: ['0% 100%' ,'100% 0%'],
          duration: 1000},
        ],
      easing: "easeOutCirc",
    });
    anime({
      targets: `.titleDiv hr`,
      opacity: [0, 1],
        width: [
           {value: ['0%' ,'15%'],
          duration: 1000},
        ],
      easing: "easeOutCirc",
    });
}


