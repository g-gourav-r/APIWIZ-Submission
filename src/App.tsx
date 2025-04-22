import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import PageLayout from "./components/PageLayout";
import MoodCard from "./components/MoodCard";
import Calendar from "./components/Calendar";
import { SmileIcon } from "@/components/ui/smile";
import { FrownIcon } from "@/components/ui/frown";
import { AngryIcon } from "@/components/ui/angry";
import { MehIcon } from "@/components/ui/meh";
import { AnnoyedIcon } from "@/components/ui/annoyed";
import { LaughIcon } from "@/components/ui/laugh";

const moodIcons = [
  { icon: <AngryIcon className="w-8 h-8 text-red-500" />, mood: "Angry" },
  { icon: <AnnoyedIcon className="w-8 h-8 text-yellow-500" />, mood: "Annoyed" },
  { icon: <FrownIcon className="w-8 h-8 text-gray-500" />, mood: "Sad" },
  { icon: <MehIcon className="w-8 h-8 text-neutral-500" />, mood: "Neutral" },
  { icon: <LaughIcon className="w-8 h-8 text-teal-500" />, mood: "Content" }, // LaughIcon, but shown as 'Content'
  { icon: <SmileIcon className="w-8 h-8 text-yellow-400" />, mood: "Happy" },
];


function App() {
  interface SelectedDateData {
    entries: {
      mood: string;
      note: string;
      weather: {
        city: string;
        temp: number;
      };
      created_at: string;
    }[];
  }

  const [selectedDateData, setSelectedDateData] = useState<SelectedDateData | null>(null);

  const handleDateSelect = (data: any) => {
    setSelectedDateData(data);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-green-50 dark:bg-slate-600 transition-colors duration-300">
        <Header />
        <PageLayout
          calendar={
            <Calendar onSelectDate={handleDateSelect} />
          }
        >
          {/* Render MoodCard for Adding Mood Entry Above */}
          <MoodCard />

          {/* Render Mood Entries Below the MoodCard */}
          {selectedDateData ? (
  <div className="text-green-800 dark:text-blue-100 p-4">
    <h2 className="text-xl font-bold mb-4">Previous Mood Entries</h2>
    {/* Check if entries exist and display them */}
    {Array.isArray(selectedDateData.entries) && selectedDateData.entries.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedDateData.entries.map((entry: any, index: number) => {
          // Find the matching icon based on the mood
          const moodIcon = moodIcons.find(iconObj => iconObj.mood === entry.mood)?.icon;

          return (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-slate-700 dark:border-gray-600">
              <div className="flex items-center mb-2">
                {moodIcon && <span className="mr-3">{moodIcon}</span>}
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{entry.mood}</p>
              </div>
              <p>✍️ {entry.note}</p>
              <p>🌍 {entry.weather.city}</p>
              <p>🌡️ {entry.weather.temp}°C</p>
              <p>⏰ {new Date(entry.created_at).toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    ) : (
      <p>No mood entries found for this date.</p>
    )}
  </div>
) : (
  <div className="text-gray-500 p-4">Select a date to view mood entries.</div>
)}

        </PageLayout>
      </div>
    </ThemeProvider>
  );
}

export default App;
