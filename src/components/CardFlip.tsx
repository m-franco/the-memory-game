import {useState, useEffect} from "react"
import {motion} from "framer-motion"

export default function CardFlip(
  {item, width,  height, onClick, flippedCards, matchedCards}:
  { item: any,
    width: number, 
    height: number,
    onClick: () => void,
    flippedCards: number[],
    matchedCards: number[],  
  }) {

  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
        if(!matchedCards.includes(item.id) && !flippedCards.includes(item.id) && isFlipped){ 
          setIsFlipped(false);
        }    
  }, [flippedCards]);

  const handleFlip = () => {  
    if (flippedCards.length === 2) return;

    if(!isFlipped && !isAnimating) {
      setIsFlipped(!isFlipped)
      setIsAnimating(true)
      onClick();
    }
  }

  return (
    <div className={`flex items-center justify-center cursor-pointer`}
      style={{"width":width+10, "height":height+10}}
      >
      <div 
        className={`flip-card rounded-md`} 
        style={{"width":width, "height":height}}
        onClick={handleFlip}>
        <motion.div
        className="flip-card-inner w-[100%] h-[100%]"
        initial={false}
        animate={{rotateY: isFlipped ? 180 : 360}}
        transition={{duration: 0.6, animationDirection: "normal"}}
        onAnimationComplete={()=> setIsAnimating(false)}
        >
          <div className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-yellow-500 rounded-lg p-4 flex items-center justify-center bg-red-800">
            <div className="absolute h-full w-full bg-slate-950 z-0">
              <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(250,30,30,0.15),rgba(255,255,255,0))]"></div>
              <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[147px] w-[112px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,30,27,.15),rgba(255,255,255,0))]"></div>
             </div>
            <h1 className="text-5xl font-bold self-center z-10 text-shadow-outline">{item.id}</h1>
          </div>
          <div className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text text-green-700 rounded-lg p-4"
          style={{backgroundImage:`url(${item.path})`}}
          >
          </div>
        </motion.div>
      </div>  
    </div>
  )
}
