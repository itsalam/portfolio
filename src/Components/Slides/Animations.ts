import anime from "animejs";

export const playTitle = (titleId: string, delay: number = 0) => {
    anime({
      targets: `${titleId} text`,
      opacity: [0, 1],
        strokeDasharray: [
           {value: ['0% 100%' ,'100% 0%'],
          duration: 1000},
        ],
      delay: function(el, i) { console.log(el, i); return i * 250 },
      easing: "easeOutCirc",
    });
    anime({
      targets: `.titleDiv hr`,
      opacity: [0, 1],
        width: [
           {value: ['0%' ,'22%'],
          duration: 1000},
        ],
      delay: function(el, i) { console.log(el, i); return i * 250 },
      easing: "easeOutCirc",
    });
}


