import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { supabase } from '@/lib/supabaseClient';
import 'react-calendar/dist/Calendar.css';

type Props = {
  onSelectDate: (data: any) => void;
};

const MoodCalendar = ({ onSelectDate }: Props) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);

  const handleDateClick = async (value: Date) => {
    setLoading(true);
    setSelected(value);

    const formattedDate = value.toISOString().split("T")[0]; // YYYY-MM-DD

    // Convert to IST (UTC + 5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5:30 hours in milliseconds
    const istStartOfDay = new Date(value.getTime() + istOffset);
    const istEndOfDay = new Date(istStartOfDay.getTime() + 24 * 60 * 60 * 1000 - 1);

    // Convert IST to UTC for querying
    const utcStartOfDay = new Date(istStartOfDay.getTime() - istOffset).toISOString();
    const utcEndOfDay = new Date(istEndOfDay.getTime() - istOffset).toISOString();

    console.log('Formatted Date:', formattedDate);
    console.log('Start of Day (UTC):', utcStartOfDay);
    console.log('End of Day (UTC):', utcEndOfDay);

    try {
      // Query the Supabase table to get mood data for that day in UTC
      const { data, error } = await supabase
        .from('mood_entries') // Ensure this is your correct table name
        .select('id, mood, note, weather, created_at') // Ensure this matches your columns
        .gte('created_at', utcStartOfDay)  // Greater than or equal to start of the day
        .lte('created_at', utcEndOfDay);  // Less than or equal to end of the day

      if (error) {
        console.error("Error fetching mood entry:", error.message);
        onSelectDate({ error: error.message });
      } else {
        if (data && data.length > 0) {
          onSelectDate({
            date: formattedDate,
            entries: data,
          });
        } else {
          onSelectDate({
            message: "No mood data for this day.",
          });
        }
      }
    } catch (err) {
      console.error("Error fetching mood entry:", err);
      onSelectDate({ error: "Failed to fetch data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-slate-600 transition-colors duration-300">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white dark:bg-blue-900 rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-3xl font-extrabold mb-4 text-center text-blue-800 dark:text-blue-100 font-sans">
            Mood Calendar
          </h2>
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 dark:from-slate-700 dark:to-indigo-800 rounded-lg p-4 shadow-lg">
            <Calendar
              onClickDay={handleDateClick}
              value={selected}
              className="rounded-md p-2 w-full shadow-lg"
            />
          </div>
          {loading && <p className="text-sm text-center mt-2 text-gray-500">Fetching mood...</p>}
        </div>
      </div>
    </div>
  );
};

export default MoodCalendar;
