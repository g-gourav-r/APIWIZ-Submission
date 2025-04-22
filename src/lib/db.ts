import { supabase } from "./supabaseClient";

export interface WeatherObject {
  city: string;
  temp: number;
  description: string;
  icon: string;
}

export async function saveMoodEntry(
  mood: string,
  note: string,
  weather: WeatherObject
) {
  const { data, error } = await supabase.from("mood_entries").insert([
    {
      mood,
      note,
      weather,
    },
  ]);

  if (error) {
    console.error("Error saving mood entry:", error.message);
    throw error;
  }

  return data;
}
