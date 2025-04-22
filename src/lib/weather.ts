// src/lib/weather.ts

export interface WeatherData {
  city: string;
  temp: number;
  description: string;
  icon: string;
}

// Your OpenWeatherMap API key
const API_KEY = "8d258c17e35b80a39e1c8a6d1793f73f";

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}
