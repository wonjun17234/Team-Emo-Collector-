export const global = {
  centerX: 0,
  centerY: 0,
  smoothX: 0,
  smoothY: 0,
  speed: 0,
  smoothSpeed: 0,

  a: 'asdf',

  stars: [],
  lightImg: null,

  emoImg: {
    happy: 0, sad: 0, angry: 0,
    surprised: 0, neutral: 0, fearful: 0
  },

  emoGrayImg: {
    happy: 0, sad: 0, angry: 0,
    surprised: 0, neutral: 0, fearful: 0
  },

  situations: [
    {
      id: 1,
      title: "길거리를 걷다 옛 친구를 만난 상황",
      img: null, // 상황 이미지
      //description: "길거리를 걷다 옛 친구를 만난 상황입니다. 이때 느껴지는 당신의 감정을 표정으로 나타내주세요.",
      emotion: "happy", // 기본 감정
      recognitionRate: 80 // 인식률
    },
    // {
    //   id: 2,
    //   title: "시험을 망친 후 친구와 대화하는 상황",
    //   img: null,
    //   //description: "시험을 망친 후 친구와 대화하는 상황입니다. 이때 느껴지는 당신의 감정을 표정으로 나타내주세요.",
    //   emotion: "sad",
    //   recognitionRate: 75
    // },
    // {
    //   id: 3,
    //   title: "새로운 직장에서 첫 출근하는 상황",
    //   img: null,
    //   //description: "새로운 직장에서 첫 출근하는 상황입니다. 이때 느껴지는 당신의 감정을 표정으로 나타내주세요.",
    //   emotion: "neutral",
    //   recognitionRate: 85
    // }
  ],

  grdImg: null,

  emotions: ["happy", "sad", "angry", "surprised", "neutral", "fearful"]
};