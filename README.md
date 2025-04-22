# Mood Tracker App

Welcome to the Mood Tracker App! This app allows users to track their daily moods, add personal notes, and view the weather for their location. The app is designed to help you keep a journal of your emotions and reflect on your day.

### Key Features:
- **Mood Tracker**: Select your mood for the day from a list of options like "Happy", "Neutral", or "Sad".
- **Notes**: Add personal notes to describe your day or why you feel a certain way.
- **Weather Info**: The app fetches the current weather data based on your location, providing insights like temperature, weather description, and city name.
- **Calendar View**: You can select a specific date on the calendar to view past mood entries for that day.
- **Add Mood Entry**: Easily add mood entries for the day, which are saved and displayed in your journal.
- **Dynamic UI**: The app adjusts the theme based on your preferences (light/dark mode).

### Tech Stack:
- **React**: For building the user interface and managing the app's state.
- **Supabase**: A backend-as-a-service to store mood entries, notes, and weather data.
- **React Calendar**: To display a calendar view and select dates.
- **Weather API**: Fetches real-time weather data based on the user's location.
- **Tailwind CSS**: For styling and building a responsive, beautiful UI.

### Why This Stack?
- **React** makes building the app’s dynamic components fast and efficient.
- **Supabase** provides a simple backend for storing and querying mood entries with ease.
- **React Calendar** is a lightweight and easy-to-use calendar component that fits perfectly for selecting dates.
- **Weather API** allows fetching up-to-date weather data for a richer user experience.
- **Tailwind CSS** ensures the app is both aesthetically pleasing and responsive without writing much custom CSS.

### How it Works:
1. The user selects a mood for the day and can add notes about how they feel.
2. Weather information is automatically fetched based on the user's location.
3. Mood entries are saved to the Supabase database and displayed in the journal.
4. Users can view previous entries by selecting dates on the calendar, and all relevant data will be shown.

Enjoy tracking your mood and reflecting on your days!