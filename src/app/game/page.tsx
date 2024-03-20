"use client"
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { shuffle } from 'lodash';
import Game from "./game";
import { GameSessionProvider } from "@/context/gameSessionContext";

export default function Page() {

  const [memoTest, setMemoTest] = useState({
    id: 1,
    name: "Memory",
    images: selectRandomItems(siteConfig.stickers,15),
  })

  return (
    <GameSessionProvider>
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
          <div className="flex justify-around flex-wrap  h-full w-full">
            <Game memoTest={memoTest}/>
          </div>
      </div>
    </GameSessionProvider>
  );
}

const selectRandomItems = (array: any[], n: number) => {
  const shuffled = shuffle(array);
  const nItems=shuffled.slice(0, n);
  const pairs= shuffle([...nItems,...nItems]);
  const images= [];
  for(let i=0; i<pairs.length;i++){
    images.push({id:i+1, path: pairs[i]});
  }
  return images;
};
