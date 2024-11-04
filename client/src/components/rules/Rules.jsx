import { content, mainTitle } from './Const'
import './rules.css'

export default function Rules() {
  return (
  <div class="description">
    <h2>{ mainTitle }</h2>
    <p className='content'>{ content }</p>
  </div>
  )
}
