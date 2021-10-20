import React, { useEffect, useState } from "react";
import {
  deleteItem,
  fetchData,
  refreshData,
} from "../features/weather/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { slugify } from "../utils/slugify";
import moment from "moment";
import ErrorBox from "./ErrorBox";

function Weather() {
  const weather = useSelector((state) => state.weather);
  const { loading, error, cities, refreshSuccess, updateTime } = weather;

  const dispatch = useDispatch();

  const [city, setCity] = useState("");
  const [filterText, setFilterText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  var filteredCities =
    cities.length > 0 &&
    cities.filter((x) =>
      x.name.toLowerCase().includes(filterText.toLowerCase())
    );

  const cityIds = cities.length > 0 && cities.map((c) => c.id);

  useEffect(() => {
    if (refreshSuccess) {
      setModalVisible(false);
    }
  }, [refreshSuccess]);

  const handleRefresh = () => {
    if (updateTime) {
      const timestamp = moment(updateTime, "MMMM Do YYYY, h:mm:ss a").diff(
        Date.now(),
        "seconds"
      );

      if (timestamp <= -60) {
        dispatch(refreshData(cityIds.toString()));
      } else {
        console.log("60 saniye dolmadı.");
        setModalVisible(true);
      }
    } else {
      dispatch(refreshData(cityIds.toString()));
    }
  };

  const handleFetchWeather = () => {
    dispatch(fetchData(slugify(city)));
    setCity("");
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteItem(index));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFetchWeather();
    }
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
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleFetchWeather}>
              <p>+</p> <span>Add</span>
            </button>
          </div>
          {loading && <div className="loadingBox">Loading...</div>}
          {error && <ErrorBox message={error}></ErrorBox>}
          {modalVisible && (
            <div className="errorBox" style={{ gap: 20 }}>
              <p style={{ fontSize: "2x", fontWeight: 600 }}>
                You can only refresh once in 60 seconds.
              </p>
              <svg
                onClick={() => setModalVisible(false)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="30px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}

          {filteredCities && filteredCities.length > 0 && (
            <div className="filterContainer">
              <button onClick={handleRefresh}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="15px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>{" "}
                Refresh
              </button>
              <input
                onChange={(e) => setFilterText(e.target.value)}
                type="text"
                value={filterText}
                placeholder="fulltext search by name"
              ></input>
            </div>
          )}
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

                  <div
                    className="trash"
                    onClick={() => handleDeleteItem(index)}
                  >
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
              <p className="heading">There is no selected city yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
