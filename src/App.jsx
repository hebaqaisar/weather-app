import { useState } from 'react'
import axios from 'axios'
import background from './assets/display-bg.jpeg'
import './App.css'
import { CloudIcon, HumidityIcon, FastWindIcon, SlowWindsIcon, ArrowLeft02Icon } from "hugeicons-react";

function App() {
  const [city, setCity] = useState("")
  const [weather, setweather] = useState(null);
  const [error, setError] = useState("")
  const [showResults, setShowResults] = useState(false);
  const [searchContainer, setsearch] = useState(true)

  const api_key = "627b103d88d1cf60ce899c12e3252765"

  const handleBack = () => {
    setShowResults(false);
    setsearch(true);
    setCity("");
  };

  const getWeather = async () => {
    if (!city) {
      setError("Please enter the city name");
      return
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );

      console.log(response.data)
      setweather(response.data)
      setError("")
      setShowResults(true)
      setsearch(false)

    } catch (error) {
      setError("City not found, please try again.")
      setweather(null);
      setShowResults(false)
      setsearch(true)
    }

  };

  return (
    <div className="all">
      {searchContainer && (
        <div className='app'>
          <div className="searchContainer">
            <h1 className='heading'>Get Weather</h1>
            <div className='search'>
              <input
                type="text"
                placeholder='Enter City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button onClick={getWeather}>Get Weather</button>
            </div>
          </div>
          {error && <p className='error'>{error}</p>}
          <p className='explanation'>Enter a city name to get real-time weather updates, including temperature, wind speed, and conditions.</p>
        </div>
      )}
      {showResults && weather && (
        <div className='weatherInfo'>
          <div id='back' onClick={handleBack}><ArrowLeft02Icon/></div>
          <div className="first_heading">
            <div className='main'>
              <h2>{weather.name},{weather.sys.country}</h2>
              <p>Feels like {Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div className="temperature">
              <p>{Math.round(weather.main.temp)}</p>
              <p>°C</p>
            </div>
          </div>
          <div className="grid">
            <div className="infos">
              <p><CloudIcon size={20} color="white" /> Sky</p>
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="infos">
              <p><FastWindIcon size={20} color="white" /> Wind</p>
              <p>{weather.wind.speed} m/s</p>
            </div>
            <div className="infos">
              <p><HumidityIcon size={20} color="white" /> Humidity</p>
              <p>{weather.main.humidity} %</p>
            </div>
            <div className="infos">
              <p><SlowWindsIcon size={20} color="white" />Pressure</p>
              <p>{weather.main.pressure}</p>
            </div>
          </div>
        </div>
      )}
      <img src={background} alt="Display Background" />
    </div>
  )
}

export default App



