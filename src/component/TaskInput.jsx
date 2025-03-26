import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { fetchWeather } from "../redux/weatherSlice";

const TaskInput = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather.data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const normalizedCity = city.toLowerCase().trim();
    let weatherInfo = null;

    if (normalizedCity) {
      try {
        const weatherResponse = await dispatch(fetchWeather(normalizedCity)).unwrap();
        weatherInfo = weatherResponse.weatherData;
        console.log(weatherResponse) // Get weather data
        console.log(weatherInfo)
      } catch (error) {
        console.error("Weather fetch failed:", error);
      }
    }

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      priority,
      city: normalizedCity || null,
      weather: weatherInfo, // Store weather data with task
    };

    dispatch(addTask(newTask));

    setText("");
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task..."
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="enter state name for weather (optional)"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
