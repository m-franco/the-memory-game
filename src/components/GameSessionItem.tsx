import { Button } from "@nextui-org/react";

interface GameSession {
    id: string,
    retries: number,
    number_of_pairs:number,
    memoTest:any,
}


export default function GameSessionItem ({ gameSession, onClickButton }:
    {gameSession:GameSession, onClickButton: (gameSessionId:string) => void}){

    const onClick = () =>{
        onClickButton(gameSession.id);
    }    

    return (
    <div className="flex justify-around items-center 
        bg-blue-700 bg-gradient-to-r from-blue-900 to-orange-500
         h-16 w-[1100px] rounded-2xl border-2 m-4"> 
        <div className="w-[300px] flex justify-center">
            {gameSession && gameSession.memoTest.name}
        </div>
        <div>{gameSession && gameSession.memoTest.images && 
        (`${gameSession.memoTest.images.length} Pair${gameSession.memoTest.images.length!==1?'s':''}`)}</div>
        <div>{gameSession.retries+gameSession.number_of_pairs} Tries</div>
        <div>{gameSession.retries} Retries</div>
        <div>{gameSession.number_of_pairs} Matched Pairs</div>
        <div className="flex justify-center items-center">
             <Button radius="full" className="bg-gradient-to-tr from-pink-700 to-blue-500 text-white shadow-lg pr-4 pl-4 pt-1 pb-1 gap-4"
                      onClick={onClick}>
             {"Continue"}
            </Button>
        </div>
    </div>);
}