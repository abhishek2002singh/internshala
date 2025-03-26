import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const WeatherDisplay = () => {

  const { data, loading, error } = useSelector((state) => state.weather);


  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Weather App</h1>
      

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {Object.keys(data).length > 0 && (
        <div className="mt-4">
          {Object.entries(data).map(([cityName, weather]) => (
            <div key={cityName} className="bg-white p-4 rounded shadow mb-2">
              <h2 className="text-lg font-semibold">{cityName.toUpperCase()}</h2>
              <p>Temperature: {weather.temp}°C</p>
              <p>Description: {weather.description}</p>
              <img
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                alt="weather icon"
                className="w-12 h-12"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
