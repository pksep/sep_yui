type ColorType = {
  text: string;
  color: string;
};

type ColorsType = {
  [key: string]: ColorType;
};

export const colors: ColorsType = {
  White: {
    text: 'White',
    color: '#ffffff'
  },
  Black: {
    text: 'Black',
    color: 'var(--text-color)'
  },
  Black1: {
    text: 'Black1',
    color: 'var(--tooltip-background-color)'
  },
  Black2: {
    text: 'Black2',
    color: '#282828'
  },
  Blue1: {
    text: 'Blue1',
    color: 'var(--primary-color)'
  },
  Blue2: {
    text: 'Blue2',
    color: 'var(--primary-pressed-light-color)'
  },
  Blue3: {
    text: 'Blue3',
    color: 'var(--primary-pressed-color)'
  },
  Blue4: {
    text: 'Blue4',
    color: 'var(--link-color)'
  },
  Blue5: {
    text: 'Blue5',
    color: '#C6D7FF'
  },
  Blue6: {
    text: 'Blue6',
    color: '#678DD5'
  },
  Blue7: {
    text: 'Blue7',
    color: 'var(--border-color)'
  },
  Blue8: {
    text: 'Blue8',
    color: '#A9BCE1'
  },
  Blue9: {
    text: 'Blue9',
    color: 'var(--primary-hover-light-color)'
  },
  Blue10: {
    text: 'Blue10',
    color: 'var(--primary-pressed-light-color)'
  },
  Blue11: {
    text: 'Blue11',
    color: 'var(--primary-pressed-light-color)'
  },
  Blue12: {
    text: 'Blue12',
    color: 'var(--background-primary-color)'
  },
  Blue13: {
    text: 'Blue13',
    color: '#E0F2FF'
  },
  Blue14: {
    text: 'Blue14',
    color: '#5CBAFF'
  },
  Blue15: {
    text: 'Blue15',
    color: 'var(--background-light-color)'
  },
  Blue16: {
    text: 'Blue16',
    color: 'var(--border-primary-color)'
  },

  Grey1: {
    text: 'Grey1',
    color: 'var(--button-neutral-color)'
  },
  Grey2: {
    text: 'Grey2',
    color: 'var(--border-color)'
  },
  Grey3: {
    text: 'Grey3',
    color: 'var(--border-color)'
  },
  Grey4: {
    text: 'Grey4',
    color: 'var(--text-light-color)'
  },
  Grey5: {
    text: 'Grey5',
    color: '#677074'
  },
  Grey6: {
    text: 'Grey6',
    color: 'var(--text-neutral-color)'
  },
  Grey7: {
    text: 'Grey7',
    color: 'var(--border-color)'
  },

  Orange1: {
    text: 'Orange1',
    color: '#FFB573'
  },
  Orange2: {
    text: 'Orange2',
    color: '#ED893E'
  },
  Orange3: {
    text: 'Orange3',
    color: '#CC915C'
  },
  Orange4: {
    text: 'Orange4',
    color: 'var(--warning-color)'
  },
  Orange5: {
    text: 'Orange5',
    color: 'var(--warning-color)'
  },
  Orange6: {
    text: 'Orange6',
    color: 'var(--warning-color)'
  },
  Orange7: {
    text: 'Orange7',
    color: 'var(--ava-ctive-color)'
  },
  Orange8: {
    text: 'Orange8',
    color: 'var(--warning-color)'
  },

  Red1: {
    text: 'Red1',
    color: '#A02724'
  },
  Red2: {
    text: 'Red2',
    color: 'var(--error-light-color)'
  },
  Red3: {
    text: 'Red3',
    color: 'var(--ban-color)'
  },
  Red4: {
    text: 'Red4',
    color: 'var(--error-color)'
  },

  Pink1: {
    text: 'Pink1',
    color: 'var(--pink-light-color)'
  },
  Pink2: {
    text: 'Pink2',
    color: 'var(--pink-color)'
  },

  Green1: {
    text: 'Green1',
    color: 'var(--positive-color)'
  },
  Green2: {
    text: 'Green2',
    color: 'var(--success-color)'
  },

  Gradient1: {
    text: 'Gradient1',
    color: 'linear-gradient(var(--primary-color, #0ACED2, #1AE4B6) )'
  },
  Gradient2: {
    text: 'Gradient2',
    color: 'linear-gradient(#6096FB, #04DDE0, #00FFC5) '
  }
};
