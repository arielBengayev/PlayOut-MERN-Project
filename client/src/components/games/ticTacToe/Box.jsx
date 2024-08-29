import { xTurn } from "./Const"

export default function Box({ value, playerTurn, click }){

  let hover = null
  if(value === null && playerTurn === xTurn) 
    hover = `${ playerTurn }-hover`
  
  return(
    <button onClick={ click } className={ `box ${ hover }` } >
      { value }
    </button>
  )
}