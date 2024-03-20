"use client"
import GameList from "./GameList";

import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import { GameSessionProvider } from "@/context/gameSessionContext";


export default function Home() {
  
  const memoTest:any=[];
  return (
    <ApolloProvider client={client} >
      <GameSessionProvider>
        <main>
          <div className="absolute inset-0 -z-10 h-full w-full items-center
               [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">   
            <div className="flex justify-around flex-wrap  h-full w-full">
                <GameList/>
              </div>
          </div>
      </main>
      </GameSessionProvider>
    </ApolloProvider>
  );
}
