
export default function Card({ card, index, click }){
  const cardClass = card.status ? card.status : ``

  return(
    <div 
      className = { `card ${ cardClass }` } 
      onClick = { () => click(index) }
    >
      <img 
       src={ card.img } 
       alt={ card.name } 
       className={ `img ${ cardClass }` }  
      />
    </div>
  )
}