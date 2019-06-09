import React from 'react';
import style from '../weather.module.css'

const Weather = ({place, summary,temperature, image, precip}) => {

  return(
    <div className={style.weather}>
      <h1>{place}</h1>
      <img className={style.image} src={`https://darksky.net/images/weather-icons/${image}.png`} alt=""/>
      <div className={style.content}>
      <p>{summary}</p>
      <p>It is currently {temperature}C degrees out. There is {precip}% chance of rain today!</p>
      </div>
      
    </div>
  );
};

export default Weather;