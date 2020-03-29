export const header = [
  {
    start: 400,
    duration: '30vh',
    properties: [
      {
        startValue: 50,
        endValue: -50,
        unit: '%',
        property: 'translateY',
      },
      {
        startValue: 0.5,
        endValue: 1,
        property: 'scale',
      },
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
  {
    start: 400,
    startOffset: '70vh',
    duration: '30vh',
    properties: [
      {
        startValue: -50,
        endValue: -150,
        unit: '%',
        property: 'translateY',
      },
      {
        startValue: 1,
        endValue: 0.5,
        property: 'scale',
      },
    ],
  },
  {
    start: 400,
    startOffset: '140vh',
    duration: '30vh',
    properties: [
      {
        startValue: -150,
        endValue: -230,
        unit: '%',
        property: 'translateY',
      },
    ],
  },
  {
    start: 400,
    startOffset: '210vh',
    duration: '30vh',
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: 'opacity',
      },
    ],
  },
];
