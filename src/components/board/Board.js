import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './board.css'
import tableImage from '../../images/table.png'
const players =[[0,-1],[1,0],[0,1],[-1,0]]

// {/* {[...Array(52).keys()].map((i)=><Card i={i}/>)} */}

const Board = () => {
    const [deck, setDeck] = useState([]);
    const shuffle = (cards=[...Array(52).keys()]) => {
        const tempCards=cards;
        for (let i = 0; i < cards.length; i++) {
          const rnd = Math.random() * i | 0;
          const tmp = tempCards[i];
          tempCards[i] = tempCards[rnd];
          tempCards[rnd] = tmp;
        }
        setDeck(tempCards);
    };
    useEffect(() => {
        shuffle();
    }, [])

    const inHandCards = (from, to, cl='') => (
            <div className={`inHandVisibleCards ${cl}`}>
                {deck.slice(from, to).map((vCard,index)=><Card i={vCard} style={{position: 'absolute', fontSize:'20px', left: `${index*25}px`}}/>)}
            </div>
        )
    
    if(deck.length===0){
        return <>Loading</>
    }
    return (
        <div className="board">
            <div className="row">{/*later just keep users card open*/}
                <div className="cardContainer0">{inHandCards(0,13, "row1")}</div>
            </div>
            <div className="row">
                <div className="col col1">
                    {inHandCards(0,13)}
                </div>
                <div className="col col2">
                    {inHandCards(0,13)}
                </div>
            </div>
            <div className="row">
                    {inHandCards(0,13, "row3")}
            </div>
        </div>
    )
}

export default Board
