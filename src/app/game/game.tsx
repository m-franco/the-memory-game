"use client"

import { useState } from "react";
import CardFlip from "../../components/CardFlip";
import { useGameSessionContext } from "@/context/gameSessionContext";
import { Spinner} from "@nextui-org/react";
import { gql, useMutation } from "@apollo/client";


interface MemoTest {
  id: number;
  name: string;
  images: any[];
}

const CREATE_GAME_SESSION = gql`
  mutation createGameSession($memoTestId:String!,$userSessionCode:String!){
    createGameSession(
      memo_test_id: $memoTestId
      user_session_code:$userSessionCode,
    ) {
      id
      memoTest{
        id name
      }
    }
  }
`;

export default function Game({memoTest}:{memoTest : MemoTest}) {

  const { selectedGameSessionId, setSelectedGameSessionId,
          selectedMemoTestId, setSelectedMemoTestId,
        } = useGameSessionContext();
  //const [createGameSession] = useMutation(CREATE_GAME_SESSION);
 
  // const handleCreateGameSession = async () => {
  //   try {
  //     const { data } = await createGameSession({
  //       variables:  { memoTestId: selectedMemoTestId, userSessionCode: '123' },
  //     });
  //     setSelectedGameSessionId(data.id);
      
  //   } catch (error) {
   
  //   }
  // };
  
  // if(!selectedMemoTestId){
  //   handleCreateGameSession();
  // }

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
    <div className="relative w-full h-full flex justify-center">
        {false &&
        <div className="absolute z-10 top-0 left-0 w-full h-full flex gap-4 justify-center items-center bg-black bg-opacity-80">
          <Spinner className="circ5le2" size="lg" label="Loading" color="secondary" labelColor="secondary"/>
        </div>}

        <div className="w-[1300px] justify-center items-center z-0" >
            <div className="flex justify-center items-center text-3xl h-[60px] w-[100%]
                bg-red-800 bg-gradient-to-r from-rose-700 to-red-900 italic font-light
                ">
                  <h1 className=""> The Memory Game</h1>
            </div>
            {/* <div className="h-[80px] w-[100%]  flex justify-around items-center text-blue-500 text-2xl" >
                <p> Memory Test:  {selectedGameSessionId}</p>
                <p> Game Session:  {selectedGameSessionId}</p>
            </div> */}
            <div className="h-[80px] w-[100%]  flex justify-around items-center text-blue-500 text-2xl" >
                <p>Tries: {retries+matchedPairs}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
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
                onClick={() => handleCardClick(index)} 
                flippedCards={flippedCards}
                matchedCards={matchedCards}
              />
            ))}
          </div>
          {matchedPairs === memoTest.images.length / 2 && (
            <div className="h-[80px] text-center text-2xl flex justify-center items-center">
              <p>Congratulations! You have completed the memo test. &nbsp;</p>
              <p> Your Score is {matchedPairs*100/retries}.</p>
            </div>
          )}
        </div>
    </div>
  );
};