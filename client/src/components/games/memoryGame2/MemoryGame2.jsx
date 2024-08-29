import { useState, useEffect, useCallback } from "react"
import './memoryGame2.css'
import { gameTitle } from "./Const"

export default function MemoryGame2() {
    
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5])
    const board = Array.from({ length: 100 }, (_, index) => numbers[index] || '')
    const [shuffledCells, setShuffledCells] = useState([])
    const [hiddenCells, setHiddenCells] = useState([])
    const [clicked, setClicked] = useState(false)
  
    const shuffleArray = (array) => {
      const shuffledArray = [...array]
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()*i);
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
      }
      return shuffledArray
    }
  
    useEffect(() => {
      const newShuffledCells = shuffleArray(board)
      setShuffledCells(newShuffledCells)
      let newHiddenCells = newShuffledCells.map((cell, index) => cell ? index : -1).filter(index => index !== -1 && index)
      setTimeout(() =>{  
        setHiddenCells(newHiddenCells)
    }, 2500)
      return () => clearTimeout() 
    }, [])

    const hide = (index) => { return shuffledCells[index] !== '' }
   
    const handleClick = () => {
        
    }
  
    return (
      <div className="order-remember">
        <h2>{ gameTitle }</h2>
        <div className= 'board'>
          {shuffledCells.map((number, index) => (
            <div key={ index } 
            className= { `cell ${ hiddenCells.includes(index) ? 'cell-hide' : '' }` }
            onClick={ handleClick }
            >
              { number }
            </div>
          ))}
        </div>
      </div>
    )
}

// import { useState, useEffect } from "react";
// import './memoryGame2.css';

// export default function MemoryGame2() {
//   const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
//   const board = Array.from({ length: 100 }, (_, index) => numbers[index] || '');
//   const [shuffledCells, setShuffledCells] = useState([]);
//   const [hiddenCells, setHiddenCells] = useState(new Set());

//   const shuffleArray = (array) => {
//     const shuffledArray = [...array];
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//     }
//     return shuffledArray;
//   };

//   useEffect(() => {
//     const shuffled = shuffleArray(board);
//     setShuffledCells(shuffled);
    
//     // חישוב התאים שצריכים להיות מוסתרים (לא ריקים)
//     const initialHiddenCells = new Set(
//       shuffled.map((value, index) => value ? index : -1).filter(index => index !== -1)
//     );

//     // הגדרת התאים המוסתרים לאחר 2.5 שניות
//     const timer = setTimeout(() => {
//       setHiddenCells(initialHiddenCells);
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, [numbers]);

//   const handleClick = (index) => {
//     setHiddenCells(prev => {
//       const newHiddenCells = new Set(prev);
//       newHiddenCells.delete(index); // הסרת הרקע לתא שנלחץ
//       return newHiddenCells;
//     });
//   };

//   return (
//     <div className='board2'>
//       {shuffledCells.map((number, index) => (
//         <div
//           key={index}
//           className={`cell ${hiddenCells.has(index) ? 'cell-hide' : ''}`}
//           onClick={() => handleClick(index)}
//         >
//           {number}
//         </div>
//       ))}
//     </div>
//   );
// }