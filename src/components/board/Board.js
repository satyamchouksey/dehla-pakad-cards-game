import React, { useEffect, useState } from 'react'
import { useDrop } from "react-dnd";
import Card from '../card/Card'
import './board.css'
const players =[[0,-1],[1,0],[0,1],[-1,0]]
const acePositions=[0,13,26,39];
//get the element that is dragged and only drop in needed field
// call cards{/* {[...Array(52).keys()].map((i)=><Card i={i}/>)} */}
// facedDowndeck {[...Array(20).keys()].map((item,index)=><Card style={{position: 'absolute', left:`${index*2}px`, top:`${index*1}px`, fontSize: '20px'}} i={-1}/>)}
const Board = () => {
    const [deck, setDeck] = useState([]);
    const [currentCards, setCurrentCards] = useState({});
    const [currentDraggedCard, setCurrentDraggedCards] = useState(false);
    useEffect(() => {
    }, [currentCards])
    const addCardToPlay = (cardPlayed) =>{
        const {id, owner} = cardPlayed;
        setCurrentCards(prev=>({...prev,[owner]:id}))
        setDeck(prevDeck=>prevDeck.map(item=>item===id?53:item))
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (content) => addCardToPlay(content),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }));
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
        return suitCards.sort((a,b)=>acePositions.includes(a)?-1:acePositions.includes(b)?1:a>52?1:b>52?-1:b-a)
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
    const inHandCards = (from, to, playedBy, cl='') => (
            <div className={`inHandVisibleCards ${cl}`}>
                {sortCards(deck.slice(from, to)).map((vCard,index)=><Card currentCards={currentCards} i={vCard} owner={playedBy} style={{position: 'absolute', fontSize:'20px', left: `${index*25}px`}}/>)}
            </div>
        )
    if(deck.length===0){
        return <>Loading</>
    }
    return (
        <div className="board">
            <div className="row">{/*later just keep users card open*/}
                <div className="deckDownFaced">
                    {[...Array(20).keys()].map((item,index)=><Card style={{position: 'absolute', left:`${index*1.2}px`, top:`${index*1}px`, fontSize: '20px'}} i={-1}/>)}
                </div>
                {inHandCards(0, 13, "play1", "row1")}
                <div ref={drop} className="inPlayCards play1">
                    <Card i={currentCards.play1||-1} style={{position: 'absolute', left:`${848}px`, top:`${342}px`, fontSize: '20px'}}/>   
                </div>
            </div>
            <div className="row">
                <div className="col col1">
                    {inHandCards(13, 26, "play4")}
                </div>
                <div ref={drop} className="inPlayCards play4">
                    <Card i={currentCards.play4||-1} style={{position: 'absolute', left:`${645}px`, top:`${428}px`, fontSize: '20px'}}/>   
                </div>
                <div ref={drop} className="inPlayCards play2">
                    <Card i={currentCards.play2||-1} style={{position: 'absolute', left:`${1050}px`, top:`${428}px`, fontSize: '20px'}}/>   
                </div>
                <div className="col col2">
                    {inHandCards(26, 39, "play2")}
                </div>
            </div>
            <div className="row">
                <div ref={drop} className="inPlayCards play3">
                    <Card i={currentCards.play3||-1} style={{position: 'absolute', left:`${848}px`, top:`${500}px`, fontSize: '20px'}}/>   
                </div>
                {inHandCards(39,52, "play3", "row3")}
            </div>
        </div>
    )
}

export default Board
