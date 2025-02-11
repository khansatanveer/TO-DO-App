"use client";
import React from 'react'
// import { useState } from "react";
// interface Task {
//   id: number;
//   text: string;
//   completed: boolean;
// }
// const Home = () => {
//     const [tasks, setTasks] = useState<Task[]>([]);
//     const [newTask, setNewTask] = useState<string>("");

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const Task = () => {
//         if (newTask.trim()) {
//           setTasks([
//             ...tasks,
//             {
//               id: Date.now(),
//               text: newTask,
//               completed: false,
//             },
//           ]);
//           setNewTask("");
//         }
// }


// export default function page() {
//   return (
//     <div>
//         <div className="flex flex-wrap gap-4 mb-8 m-10 w-10 ">
//         <input
//         type="text"
//         placeholder="Search here..."
//         className="flex-grow p-4  border border-gray-300 rounded-xl  transition bg-white"
//         />
    // </div>
    {/* <div className=" px-4 py-8 flex justify-between " >
            <div className="relative mr-3">
                <div className="absolute top-3 left-3 items-center" >
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input
                    type="text"
                    className="block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-12"
                    placeholder="Search Here..."
                    
                />
            </div>
</div> */}


//     </div>
//   )
// }



// export default Home;

import { useState } from "react";

interface WeatherError {
    message: string;
    cod: string | number;
  }
  
interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  }
  weather: {
    description: string;
  }[];
}
  

const WeatherApp = () => {
    const [city, setCity] = useState<string>(""); // For the input field
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // To store weather data
    const [error, setError] = useState<string>(""); // For displaying error messages
    
  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
  
    setError(""); // Clear previous errors
    setWeatherData(null); // Reset weather data during a new search
  
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`
          );
          
      const data: WeatherData | WeatherError = await response.json();
  
      if (response.ok) {
        // Response is successful; `data` matches `WeatherData`
        setWeatherData(data as WeatherData);
        setCity(""); // Clear input after search
      } else {
        // Handle error; `data` matches `WeatherError`
        setError((data as WeatherError).message || "City not found.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Weather App
        </h1>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {weatherData && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="text-5xl font-bold text-blue-600">
              {Math.round(weatherData.main.temp)}°C
            </p>
            <p className="text-lg text-gray-600 capitalize">
              {weatherData.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
