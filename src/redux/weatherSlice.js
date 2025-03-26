import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const normalizedCity = city.toLowerCase().trim();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${normalizedCity},in&appid=fd0127af9ea3e9ac78ed6d33f15bac36&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      return { city: normalizedCity, weatherData: data }; // Return both city name and weather data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {}, // Store multiple cities' weather as key-value pairs
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        // Store the weather data with the city name as the key
        state.data[action.payload.city] = action.payload.weatherData;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;