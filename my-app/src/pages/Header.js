// Header.js
import React from 'react';
import './Header.css'; // Si vous souhaitez ajouter du style

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="path/to/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="/">Page 1</a></li>
          <li><a href="/page2">Page 2</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
