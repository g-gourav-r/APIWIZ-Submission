import { useState, useEffect } from "react";
import MoodSelector from "./MoodSelector";
import NotesEditor from "./NotesEditor";
import { saveMoodEntry } from "@/lib/db";
import { useGeolocation } from "@/hooks/useGeolocation";
import { balloons } from "balloons-js";
import { getWeather } from "@/lib/weather";
import DateTime from "./DateTime"; // Import DateTime component

const MoodCard = ({ selectedDate }: { selectedDate: string }) => {
  const [mood, setMood] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fallbackLocation = { lat: 12.9716, lon: 77.5946 }; // Bengaluru by default
  const { location, error: geoError } = useGeolocation();

  useEffect(() => {
    const userLocation = location || fallbackLocation;
    if (userLocation) {
      getWeather(userLocation.lat, userLocation.lon)
        .then(setWeather)
        .catch(() => setError("Failed to load weather data."));
    }
  }, [location]);

  const handleMoodSelect = (mood: string) => setMood(mood);

  const handleSave = async () => {
    if (!mood || !weather) return; // Ensure that mood and weather are selected

    setIsSaving(true);
    try {
      await saveMoodEntry(mood, notes, weather, selectedDate);
      balloons(); // Show balloons animation on success
      alert("Mood saved successfully!");
    } catch (err) {
      setError("Failed to save mood. Please try again.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Determine the background color based on the mood
  const moodBackground =
    mood === "Happy"
      ? "bg-yellow-50 dark:bg-yellow-200/10"
      : mood === "Sad"
      ? "bg-blue-50 dark:bg-blue-200/10"
      : mood === "Angry"
      ? "bg-red-50 dark:bg-red-200/10"
      : "bg-white dark:bg-slate-800";

  return (
    <div
      className={`p-6 sm:p-8 rounded-3xl shadow-2xl transition-colors duration-300 
        ${moodBackground} max-w-2xl mx-auto`}
    >
      {/* Top Bar: Date + Weather */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="text-xl font-bold text-green-800 dark:text-blue-100 tracking-wide">
          <DateTime showDate={true} showTime={false} />
        </div>

        {weather && (
          <div className="flex items-center gap-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl px-4 py-2 shadow-sm">
            <img
              src={weather.icon}
              alt={weather.description}
              className="w-10 h-10"
            />
            <div className="leading-tight">
              <p className="font-medium text-blue-800 dark:text-blue-100 text-sm">
                {weather.city}
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300 capitalize">
                {weather.description} — {weather.temp}°C
              </p>
            </div>
          </div>
        )}
      </div>

      {geoError && <div className="text-red-500 text-sm mb-2">{geoError}</div>}

      {/* Mood Selector */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          How are you feeling today?
        </h2>
        <MoodSelector onSelect={handleMoodSelect} />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <NotesEditor value={notes} onChange={setNotes} />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3 px-5 bg-gradient-to-r from-green-400 to-blue-400 dark:from-blue-600 dark:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!mood || isSaving || !weather}
      >
        {isSaving ? "Saving..." : "Save Mood"}
      </button>

      {error && (
        <div className="text-red-500 text-sm mt-3 text-center">{error}</div>
      )}
    </div>
  );
};

export default MoodCard;
