import React from 'react'
import './card.css'
import cardBack from './../../images/back-teal.png'
const ranks = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
const suits = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');

const getRank = (i) => ranks[i % 13];
const getSuit = (i) => suits[i / 13 | 0];
const getColor = (i) => (i / 13 | 0) % 2 ? 'red' : 'black';
const suitPositions = [
    [
      [0, 0]
    ],
    [
      [0, -1],
      [0, 1, true]
    ],
    [
      [0, -1],
      [0, 0],
      [0, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [0, 0],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [-1, 0], [1, 0],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [0, -0.5],
      [-1, 0], [1, 0],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [0, -0.5],
      [-1, 0], [1, 0],
      [0, 0.5, true],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [-1, -1 / 3], [1, -1 / 3],
      [0, 0],
      [-1, 1 / 3, true], [1, 1 / 3, true],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [0, -2 / 3],
      [-1, -1 / 3], [1, -1 / 3],
      [-1, 1 / 3, true], [1, 1 / 3, true],
      [0, 2 / 3, true],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [0, 0]
    ],
    [
      [0, 0]
    ],
    [
      [0, 0]
    ]
  ];
const createSuit = (suit) => (pos) => {
  const [ x, y, mirrored ] = pos;
  const mirroredClass = mirrored ? ' mirrored' : '';
  return(
    <div className={`card-suit ${mirroredClass}`} style={{left: `${x * 100}%`, top: `${y * 100}%`}}>
        {suit}
    </div>
  )
};


const Card = ({i, style}) => {
    const rank = getRank(i);
    const suit = getSuit(i);
    const colorClass = 'card ' + getColor(i);
    if(i<0){
        return <img className="card" src={cardBack} alt=''/>
        
    }
    return (
        <div style={style} className="deck">
            <div className={colorClass}>
                <div className="card-suits">
                    {suitPositions[i % 13].map(createSuit(suit))}
                </div>
                <div className="card-topleft">
                    <div className="card-corner-rank">
                        {rank}
                    </div>
                    <div className="card-corner-suit">
                        {suit}
                    </div>
                </div>
                <div className="card-bottomright">
                    <div className="card-corner-rank">
                        {rank}
                    </div>
                    <div className="card-corner-suit">
                        {suit}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
