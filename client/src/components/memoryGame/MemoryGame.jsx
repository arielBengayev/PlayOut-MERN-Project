import React, {useState, useRef} from 'react'
import Card from './Card'
import './memoryGame.css'

export default function MemoryGame({ setWin }){
    const [cards, setCards] = useState([
        { id: 0, name: 'apple', status: '', img: '/mgImages/0.jpg' },
        { id: 0, name: 'apple', status: '', img: '/mgImages/0.jpg' },
        { id: 1, name: 'spotify', status: '', img: '/mgImages/1.jpg' },
        { id: 1, name: 'spotify', status: '', img: '/mgImages/1.jpg' },
        { id: 2, name: 'youtub', status: '', img: '/mgImages/2.jpg' },
        { id: 2, name: 'youtub', status: '', img: '/mgImages/2.jpg' },
        { id: 3, name: 'html', status: '', img: '/mgImages/3.jpg' },
        { id: 3, name: 'html', status: '', img: '/mgImages/3.jpg' },
        { id: 4, name: 'js', status: '', img: '/mgImages/4.jpg' },
        { id: 4, name: 'js', status: '', img: '/mgImages/4.jpg' },
        { id: 5, name: 'css', status: '', img: '/mgImages/5.jpg' },
        { id: 5, name: 'css', status: '', img: '/mgImages/5.jpg' },
    ].sort(() => Math.random() - 0.5))
    const [previous, setPrevious] = useState(-1)
    const count = useRef(0)

    const check = (current) => {
        if(cards[current].id === cards[previous].id && current != previous){
            cards[current].status = "success"
            cards[previous].status = "success"
            setCards([...cards])
            setPrevious(-1)
            count.current++
            if(count.current === 6) setWin(true)
        }else if(current != previous){
            cards[current].status = "wrong"
            cards[previous].status = "wrong"
            setCards([...cards])
            setTimeout(() =>{
                cards[current].status = ""
                cards[previous].status = ""
                setCards([...cards])  
                setPrevious(-1)
            }, 1000)
        }
    }

    const click = (index) =>{
        if(previous === -1 && cards[index].status === ''){
            cards[index].status = "active"
            setCards([...cards])
            setPrevious(index)
        }else check(index)
    }

    return(
        <div className='mg-board'>
            {cards.map((card, index) => {
                return <Card 
                         card={  card } 
                         key={ index } 
                         index={ index } 
                         click={ click } 
                        />
                })}          
        </div>
    )
}