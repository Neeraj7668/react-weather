/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";

let api_key = "81e645940e528e7626a8675a4e208c05";

const Weather = () => {
  const [searchValue, setSearchValue] = useState({
    loading: false,
    value: "London",
  });

  const [searchData, setSearchData] = useState(null);

  const handleSearch = async () => {
    if (!searchValue.value) return;
    setSearchValue({ ...searchValue, loading: true });
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&appid=${api_key}`;
    try {
      const { data } = await axios.get(url);
      setSearchData(data);
      console.log(data, "asdkhjfgas");
    } catch (error) {
      setSearchData(null);
    } finally {
      setSearchValue({ ...searchValue, loading: false });
    }
  };

  useEffect(() => {
    handleSearch();
    return () => {};
  }, []);

  function kelvinToCelsius(kelvin) {
    if (kelvin === 0) return 0;
    return (kelvin - 273.15).toFixed(2);
  }
  const weatherImages = {
    Clear: "assets/images/contrast.png",
    Clouds: "assets/images/cloud.png",
    Drizzle: "assets/images/drizzle.png",
    Rain: "assets/images/rain.png",
    Thunderstorm:"assets/images/thunderstorm.png",
    Snow: "assets/images/snow.png",
    Squall:
      "assets/images/Squall.png",
    Tornado:
      "assets/images/Tornado.png",
  };

  const imgTypes = (type) => {
    return weatherImages[type] || null;
  };

  return (
    <div className="container">
      <div className="top-weather-image">
        <img src="assets/images/cloud.png" alt="" srcset="" />
      </div>
      <div className="top-bar">
        <div className="input-wrapper">
          <input
            type="text"
            className="city-input"
            placeholder="Search"
            value={searchValue.value}
            onChange={(e) =>
              setSearchValue({ value: e.target.value, loading: false })
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {searchValue.value && (
            <img
              src="assets/images/close.png"
              alt=""
              srcset=""
              className="close-icon"
              onClick={() => {
                setSearchValue({ value: "", loading: false });
                setSearchData(null);
              }}
            />
          )}
        </div>
      </div>

      <div className="summary-container">
        <div className="weather-image">
          <img
            src={
              (searchData?.weather?.[0]?.main &&
                imgTypes(searchData?.weather?.[0]?.main)) ||
              "assets/images/contrast.png"
            }
            alt=""
            srcset=""
          />
        </div>

        <div className="right-content">
          <div className="weather-temp">
            {kelvinToCelsius(searchData?.main?.temp || 0)}&deg;C
          </div>
          <p className="clear">{searchData?.weather?.[0].main || ""}</p>
          <div className="weather-location">{searchData?.name || ""}</div>
          <div className="data-container">
            <div className="element">
              <img
                src="assets/images/humidity.png"
                alt=""
                srcset=""
                className="icon humidity"
              />
              <div className="data">
                <div className="humidity-percent">
                  {searchData?.main?.humidity || 0}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img
                src="assets/images/wind.png"
                alt=""
                srcset=""
                className="icon"
              />
              <div className="data">
                <div className="humidity-percent">
                  {searchData?.wind?.speed || 0} km/h
                </div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
