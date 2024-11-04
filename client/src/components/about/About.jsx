import './about.css'
import { content, mainTitle } from './Const'

export default function About() {
  return (
    <div class="description">
        <h2>{ mainTitle }</h2>
        <p className='content'>{ content }</p>
    </div>
  )
}
