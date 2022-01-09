
const ranks = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
const suits = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');

const getRank = (i) => ranks[i % 13];
const getSuit = (i) => suits[i / 13 | 0];
const getColor = (i) => (i / 13 | 0) % 2 ? 'red' : 'black';

const createSuit = (suit) => (pos) => {
  const [ x, y, mirrored ] = pos;
  const mirroredClass = mirrored ? ' mirrored' : '';
  return div({
    class: 'card-suit' + mirroredClass,
    style: `left: ${x * 100}%; top: ${y * 100}%;`
  }, [ suit ]);
};