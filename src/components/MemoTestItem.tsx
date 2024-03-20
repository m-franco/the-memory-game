import { Button } from "@nextui-org/react";

interface MemoTest {
    id: string,
    name: string,
    images:[],
    high_score:number,
}

export default function MemoTestItem ({memoTest, onClickButton }:
     {memoTest:MemoTest, onClickButton: (gameSessionId:string) => void
    }){

    const onClick = () =>{
  
        onClickButton(memoTest.id);
    }

    return (
    <div className="flex justify-around items-center 
        bg-blue-700 bg-gradient-to-r from-blue-900 to-orange-500
         h-16 w-[1100px] rounded-2xl border-2 m-4"> 
        <div className="w-[300px] flex justify-center">
            {memoTest && memoTest.name}
        </div>
        <div>{memoTest && memoTest.images && memoTest.images.length} Pairs</div>
        <div>Highscore: {memoTest && memoTest.high_score}</div>
        <div className="flex justify-center items-center">
             <Button radius="full" className="bg-gradient-to-tr from-pink-700 to-blue-500 text-white shadow-lg pr-4 pl-4 pt-1 pb-1 gap-4"
                     onClick={onClick}>
             {"Start" }
            </Button>
        </div>
    </div>);
}