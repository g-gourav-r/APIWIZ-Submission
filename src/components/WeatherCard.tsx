// src/components/WeatherCard.tsx
import { useEffect, useState } from "react";
import { getWeather, WeatherData } from "@/lib/weather";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function WeatherCard() {
  const { location, error: geoError } = useGeolocation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (location) {
      getWeather(location.lat, location.lon)
        .then(setWeather)
        .catch(() => setError("Failed to load weather data."));
    }
  }, [location]);

  if (geoError || error) {
    return <div className="text-red-500 text-sm">{geoError || error}</div>;
  }

  if (!weather) {
    return <div className="text-gray-500 text-sm">Loading weather...</div>;
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-xl shadow-md w-fit">
      <img src={weather.icon} alt={weather.description} className="w-12 h-12" />
      <div>
        <p className="font-semibold text-lg">{weather.city}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 capitalize">
          {weather.description} — {weather.temp}°C
        </p>
      </div>
    </div>
  );
}
