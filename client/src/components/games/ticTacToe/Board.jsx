import Box from "./Box"

export default function Board({ boxes, playerTurn, fill }){

  return(
    <div className="board">
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(0) } 
        value = { boxes[0] } 
      />
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(1) } 
        value = { boxes[1] } 
      />
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(2) } 
        value = { boxes[2] } 
      />
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(3) } 
        value = { boxes[3] } 
      />
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(4) } 
        value = { boxes[4] } 
      />
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(5) } 
        value = { boxes[5] } 
      />
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(6) } 
        value = { boxes[6] } 
      />
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(7) } 
        value = { boxes[7] } 
      />
      <Box 
        playerTurn={ playerTurn } 
        click={ () => fill(8) } 
        value = { boxes[8] } 
      />
    </div>   
  )
}