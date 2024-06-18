import './test.css'

import React, { useState } from 'react';
import './test.css';

const Test = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="menu-button" onClick={toggleMenu}>
      &#9776; {/* סמל של תפריט המבורגר */}
      </div>
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-item">Item 1</div>
        <div className="menu-item">Item 2</div>
        <div className="menu-item">Item 3</div>
        <div className="menu-item">Item 4</div>
      </div>
      <div className="content">
        <div className="container">
          <div className="box1">Box 1</div>
          <div className="box1">Box 2</div>
          <div className="box1">Box 3</div>
          <div className="box1">Box 4</div>
        </div>
      </div>
    </div>
  );
};

export default Test;
