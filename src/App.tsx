import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import PageLayout from "./components/PageLayout";
import MoodCard from "./components/MoodCard";
import Calendar from "./components/Calendar";

function App() {
  const [selectedDateData, setSelectedDateData] = useState<null | object>(null);

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
                <div>
                  {selectedDateData.entries.map((entry: any, index: number) => (
                    <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm">
                      <p><strong>Mood:</strong> {entry.mood}</p>
                      <p><strong>Note:</strong> {entry.note}</p>
                      <p><strong>Weather:</strong> {entry.weather.city}</p>
                      <p><strong>Temperature:</strong> {entry.weather.temp}°C</p>
                      <p><strong>Created At:</strong> {new Date(entry.created_at).toLocaleString()}</p>
                    </div>
                  ))}
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
