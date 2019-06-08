import React from 'react';
import style from '../header.module.css';

const Header = (props) => {
  return (
    <div className={style.header}>
    <div className="container">
      <h1 className={style.header__title}>{props.title}</h1>
      {props.subtitle && <h2 className={style.header__subtitle}>{props.subtitle}</h2>} 
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: 'Weatherfy'
};

export default Header;