import Button from '@mui/material/Button'
import { NavLink } from "react-router-dom"
import { aboutTitle, loginTitle, mainTitle, rulesTitle, singupTitle, Slide, webName } from './Const'
import { aboutPage, loginPage, rulesPage, signUpPage, } from '../../Const'
import './home.css'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useState } from 'react';

const images = [
  '/carousel/memoryGame.png',
  '/carousel/snake.png',
  '/carousel/spaceInvaders.png',
  '/carousel/ticTacToe.png',
  '/carousel/WhackAMole.png',
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // מצב לתפריט

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return ( 
    <div className="home-page">
      <header className="header">
        <nav className="nav">
          <h2 className="logo">{ webName }</h2>
          <div className="nav-buttons">
            <NavLink to={ loginPage }>
              <Button variant="outlined" size='large'>{ loginTitle }</Button>
            </NavLink>
            <NavLink to={ signUpPage }>
              <Button variant="outlined" size='large'>{ singupTitle }</Button>
            </NavLink>
            <NavLink to={ aboutPage }>
              <Button variant="outlined" size='large'>{ aboutTitle }</Button>
            </NavLink>
            <NavLink to={ rulesPage }>
              <Button variant="outlined" size='large'>{ rulesTitle }</Button>
            </NavLink>
          </div>
          {/* כפתור המבורגר */}
          <button className="hamburger" onClick={ toggleMenu }>
            &#9776;
          </button>
        </nav>
        {/* תפריט קופץ */}
        <div className={ `dropdown-menu ${ isMenuOpen ? 'open' : '' }` }>
          <NavLink to={ loginPage }>
            <Button variant="outlined" size='large'>{ loginTitle }</Button>
          </NavLink>
          <NavLink to={ signUpPage }>
            <Button variant="outlined" size='large'>{ singupTitle }</Button>
          </NavLink>
          <NavLink to={ aboutPage }>
            <Button variant="outlined" size='large'>{ aboutTitle }</Button>
          </NavLink>
          <NavLink to={ rulesPage }>
            <Button variant="outlined" size='large'>{ rulesTitle }</Button>
          </NavLink>
        </div>
      </header>
      <span className='main-title'>{ mainTitle }</span>
      <div className="carousel-container">
        <Carousel 
          autoPlay 
          interval={ 2000 } 
          infiniteLoop 
          showThumbs={ false } 
          
          showStatus={ false }
        >
          {images.map((src, index) => (
            <div key={ index }>
              <img src={ src } alt={ `${ Slide } ${ index + 1 }` } />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}