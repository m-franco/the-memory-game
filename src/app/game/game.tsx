"use client"

import { useState } from "react";
import CardFlip from "./CardFlip";

interface MemoTest {
  id: number;
  name: string;
  images: any[];
}

export default function Game({memoTest,backImage}:{memoTest : MemoTest, backImage : any}) {
  const items: number[] = [];
  const width: number = 563;
  const height: number = 738;

  const multiplier:number = 0.2;
  const fixWidth: number = parseInt((563 * multiplier).toString());
  const fixHeight: number = parseInt((738 * multiplier).toString());

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [retries, setRetries] = useState(0);

  const handleCardClick = (index: number) => {
    if (flippedCards.includes(index+1)) return;
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index+1]);

    if (flippedCards.length === 1) {
      const firstCard = memoTest.images[flippedCards[0]-1];
      const secondCard = memoTest.images[index];

      if (firstCard.path === secondCard.path) {
        setMatchedPairs((prevMatchedPairs) => prevMatchedPairs + 1);
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, firstCard.id, secondCard.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setRetries((prevRetries) => prevRetries + 1);
          setFlippedCards([]);
        }, 2000);
      }
    }
  };

  return (
    <div className="w-[1300px] justify-center items" >
        <div className="h-[60px] w-[100%] bg-red-600 flex justify-center items-center text-3xl">
          <h1> The Memory Game</h1>
        </div>
        <div className="h-[80px] w-[100%] bg-slate-200 flex justify-center items-center text-blue-500 text-xl" >
            <p>Retries: {retries}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
            <p> Matched Pairs:  {matchedPairs}</p>
        </div>

      <div className="flex flex-wrap justify-between items-center ">
        {memoTest.images.map((image, index) => (
          <CardFlip
            key={index+1}
            item={image}
            width={fixWidth}
            height={fixHeight}
            backImage={backImage}
            onClick={() => handleCardClick(index)} 
            flippedCards={flippedCards}
            matchedCards={matchedCards}
          />
        ))}
      </div>
      {matchedPairs === memoTest.images.length / 2 && (
        <div className="h-[80px] text-center text-2xl flex justify-center items-center">
          <p>Congratulations! You've completed the memo test.</p>

        </div>
      )}
    </div>
  );
};