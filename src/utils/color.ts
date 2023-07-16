const colors = [
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

// 获取随机颜色
const getRandColor =
  colors[
    Math.floor(Math.random() * colors.length + 1) - 1
  ];

export default getRandColor;