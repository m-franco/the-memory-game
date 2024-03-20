"use client"

import MemoTestItem from "@/components/MemoTestItem";
import GameSessionItem from "@/components/GameSessionItem";
import { gql, useQuery } from '@apollo/client';
import { Spinner } from "@nextui-org/react";

import { useRouter } from 'next/navigation';
import { useGameSessionContext } from "@/context/gameSessionContext";


const GET_MEMO_TESTS = gql`
  query getMemoTests($first: Int!, $page: Int!) {
    memoTests(first:$first,page:$page) {
      data {
        id
        name
        images {
          id
        }
        high_score
      }
    }
  }
`;

const GET_STARTED_GAME_SESSIONS = gql`
  query getStartedGameSessions($userSessionCode: String!) {
    gameSessions(
      user_session_code: $userSessionCode,
      state: Started
      first: 10, 
      page:1) {
      data{
          id
          memoTest {
            id
            name
            images{
              id
            }
          }
          user_session_code
          retries
          number_of_pairs
          state
          score
      }
    }
  }
`;

export default function GameList() {
  const router = useRouter();
  const { selectedGameSessionId, setSelectedGameSessionId,
          selectedMemoTestId, setSelectedMemoTestId  } = useGameSessionContext();

  const { 
    loading: memoTestsLoading,
    error: memoTestsError, 
    data: memoTestsData } = useQuery(GET_MEMO_TESTS, {
      variables: { first: 20, page: 1 },
  });   
  const { 
    loading: gameSessionsLoading, 
    error: gameSessionsError, 
    data: gameSessionsData } = useQuery(GET_STARTED_GAME_SESSIONS, {
    variables: { userSessionCode: '123' },
  });

  const handleStartGame = (memoTestId:string) => {
    setSelectedMemoTestId(memoTestId);
    router.push('/game');
  };

  const handleContinueGame = (gameSessionId:string) => {

    setSelectedGameSessionId(gameSessionId);
    router.push('/game');
  };

  return (
    <div className="relative w-full h-full flex justify-center">
        {(!memoTestsData || !gameSessionsData) &&
        <div className="absolute z-10 top-0 left-0 w-full h-full flex gap-4 justify-center items-center bg-black bg-opacity-80">
          <Spinner className="circ5le2" size="lg" label="Loading" color="secondary" labelColor="secondary"/>
         </div>}
        <div className="w-[1300px] justify-center items-center z-0" >
            <div className="flex justify-center items-center text-3xl h-[60px] w-[100%]
            bg-red-800 bg-gradient-to-r from-rose-700 to-red-900 italic font-light
            ">
              <h1 className=""> The Memory Game</h1>
            </div>
            
            {memoTestsData &&
              <div className="h-[80px] w-[100%]  flex justify-center items-center text-blue-500 text-2xl mt-10" >
                  <p>Memo Test Games</p>
              </div>}

            <div className="flex flex-wrap justify-center items-center mb-10"> 
              {memoTestsData &&
                memoTestsData.memoTests.data.map((memoTest:any,index:number) =>
                  (<MemoTestItem key={index} memoTest={memoTest} onClickButton={handleStartGame}/>))}
            </div>
            {gameSessionsData &&
            <div className="h-[80px] w-[100%]  flex justify-center items-center text-blue-500 text-2xl mt-10" >
                  <p>Continue your previous games</p>
            </div>}
            <div className="flex flex-wrap justify-center items-center  mb-10"> 
              {gameSessionsData &&
                gameSessionsData.gameSessions.data.map((gameSession:any,index:number) =>
                  (<GameSessionItem key={index} gameSession={gameSession} onClickButton={handleContinueGame}/>))}
            </div>
        </div>
    </div>
  );
};