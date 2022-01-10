import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './board.css'
const players =[[0,-1],[1,0],[0,1],[-1,0]]
const acePositions=[0,13,26,39];

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
    const sortSuitCards = (suitCards) =>{
        return suitCards.sort((a,b)=>acePositions.includes(a)?-1:acePositions.includes(b)?1:b-a)
    }
    const sortCards = (cards) =>{
        let pivotHeart=0;
        let pivotClub=0;
        let pivotDiamond=0;
        const sortedDeck=[];
        cards.map(cardIndex=>{
            if(cardIndex<13&&cardIndex>=0){
                sortedDeck.unshift(cardIndex);
                pivotHeart++;
                pivotClub++;
                pivotDiamond++;
            }
            else if(cardIndex<26&&cardIndex>=13){
                sortedDeck.splice(pivotHeart,0,cardIndex);
                pivotClub++;
                pivotDiamond++;
            }
            else if(cardIndex<39&&cardIndex>=26){
                sortedDeck.splice(pivotClub,0,cardIndex);
                pivotDiamond++;
            }
            else{
                sortedDeck.push(cardIndex);
            }
        })
        return [...sortSuitCards(sortedDeck.slice(0,pivotHeart)),
            ...sortSuitCards(sortedDeck.slice(pivotHeart, pivotClub)),
            ...sortSuitCards(sortedDeck.slice(pivotClub, pivotDiamond)),
            ...sortSuitCards(sortedDeck.slice(pivotDiamond))]
    }
    useEffect(() => {
        shuffle();
    }, [])

    const inHandCards = (from, to, cl='') => (
            <div className={`inHandVisibleCards ${cl}`}>
                {sortCards(deck.slice(from, to)).map((vCard,index)=><Card i={vCard} style={{position: 'absolute', fontSize:'20px', left: `${index*25}px`}}/>)}
            </div>
        )
    
    if(deck.length===0){
        return <>Loading</>
    }
    return (
        <div className="board">
            <div className="row">{/*later just keep users card open*/}
                {inHandCards(0,13, "row1")}
            </div>
            <div className="row">
                <div className="col col1">
                    {inHandCards(13,26)}
                </div>
                <div className="col col2">
                    {inHandCards(26,39)}
                </div>
            </div>
            <div className="row">
                {inHandCards(39,52, "row3")}
            </div>
        </div>
    )
}

export default Board
