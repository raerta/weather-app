import React, { useState } from "react";
import "./App.css";
import {
  deleteItem,
  deleteRefreshedItem,
  fetchData,
  refreshData,
} from "./features/weather/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const weather = useSelector((state) => state.weather);
  const { loading, error, cities, refreshedCities, refreshSuccess } = weather;

  const dispatch = useDispatch();

  const [city, setCity] = useState("");
  const [filterText, setFilterText] = useState("");
  const [deletedCity, setDeletedCity] = useState("");

  const slugify = function (text) {
    var trMap = {
      çÇ: "c",
      ğĞ: "g",
      şŞ: "s",
      üÜ: "u",
      ıİ: "i",
      öÖ: "o",
    };
    for (var key in trMap) {
      text = text.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
    }
    return text
      .replace(/[^-a-zA-Z0-9\s]+/gi, "") // remove non-alphanumeric chars
      .replace(/[-]+/gi, "-") // trim repeated dashes
      .toLowerCase();
  };

  var filteredCities = !refreshSuccess
    ? cities.length > 0 &&
      cities.filter((x) =>
        x.weather.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : refreshedCities.weather.list.filter((x) =>
        x.name.toLowerCase().includes(filterText.toLowerCase())
      );

  const cityIds = cities.length > 0 && cities.map((c) => c.weather.id);

  const handleRefresh = () => {
    dispatch(refreshData(cityIds.toString()));
  };

  const handleFetchWeather = () => {
    dispatch(fetchData(slugify(city)));
    setCity("");
  };

  // const deleteCity = (city) => {
  //   console.log(city);

  //   console.log(filteredCities);
  //   var newData = filteredCities.slice(city);
  //   console.log(newData);
  // };

  const handleClick = (index) => {
    console.log(filteredCities);
    console.log(index);
    dispatch(deleteItem(index));
  };

  return (
    <div className="app">
      <div className="flex-container">
        <div className="row">
          <p className="heading">Add new city</p>
          <div className="flex-item">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleFetchWeather}>
              <p>+</p> <span>Add</span>
            </button>
          </div>
          {loading && <div>Loading...</div>}
          {error && <div>error... {error}</div>}
          {filteredCities && filteredCities.length > 0 && (
            <div className="filterContainer">
              <button onClick={handleRefresh}> Refresh</button>
              <input
                onChange={(e) => setFilterText(e.target.value)}
                type="text"
                value={filterText}
                placeholder="fulltext search by name"
              ></input>
            </div>
          )}

          {refreshSuccess ? (
            <div className="citiesContainer">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <div key={index} className="cityBox">
                    <div className="head">
                      <p>
                        {city.name}, {city.sys.country}
                      </p>
                      <img
                        width="90px"
                        alt="havadurumu"
                        src={
                          window.location.origin +
                          `/weather-icons/${city.weather[0].icon}@2x.png`
                        }
                        style={{ position: "absolute", top: 0, right: -10 }}
                      />
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <p>{city.weather[0].main}</p>
                      <p className="temperature">
                        {Math.round(city.main.temp)} C^
                      </p>
                    </div>

                    <div className="trash" onClick={() => dispatch(deleteRefreshedItem(index))}>
                      <svg
                        className="trash-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="30px"
                        color="red"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <p className="heading">Henüz bir şehir seçilmedi.</p>
              )}
            </div>
          ) : (
            <div className="citiesContainer">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <div key={index} className="cityBox">
                    <div className="head">
                      <p>
                        {city.weather.name}, {city.weather.sys.country}
                      </p>
                      <img
                        width="90px"
                        alt="havadurumu"
                        src={
                          window.location.origin +
                          `/weather-icons/${city.weather.weather[0].icon}@2x.png`
                        }
                        style={{ position: "absolute", top: 0, right: -10 }}
                      />
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <p>{city.weather.weather[0].main}</p>
                      <p className="temperature">
                        {Math.round(city.weather.main.temp)} C^
                      </p>
                    </div>

                    <div className="trash" onClick={() => handleClick(index)}>
                      <svg
                        className="trash-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="30px"
                        color="red"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <p className="heading">Henüz bir şehir seçilmedi.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
