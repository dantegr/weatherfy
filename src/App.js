import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";
import "./App.css";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const App = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [precip, setPrecip] = useState("");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getWeather = async () => {
      setIsLoading(true);
      try {
        setIsError(false);
        const responseLocation = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoiZGFudGVnciIsImEiOiJjanZhd2F1ZWowb3lkM3lxbWNwbXBmdW9lIn0.3gVF-ekrnv4XrVRJ4YBUmQ&limit=1`
        );

        console.log(responseLocation);
        const dataLocation = await responseLocation.json();
        setLocation(dataLocation.features[0].place_name);
        const responseWeather = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/131c59f4dd9c0c2c3f1bca28f69c250d/${dataLocation.features[0].center[1]},${dataLocation.features[0].center[0]}?units=si`
        );
        const dataWeather = await responseWeather.json();
        setSummary(dataWeather.daily.data[0].summary);
        setTemperature(dataWeather.currently.temperature);
        setPrecip(dataWeather.currently.precipProbability);
        setImage(dataWeather.currently.icon);
        console.log(dataWeather);
      } catch (ex) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    getWeather();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <div className="container">
        <Header subtitle="Type a location to tell you its weather at the moment!" />
        <form onSubmit={getSearch} className="search-form">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        {isError ? (
          <p></p>
        ) : (
          <div>
            {isLoading ? (
              <div className="sweet-loading">
                <RingLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={"#0000cd"}
                />
              </div>
            ) : (
              <div className="weather">
                <Weather
                  place={location}
                  summary={summary}
                  temperature={temperature}
                  image={image}
                  precip={precip}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
