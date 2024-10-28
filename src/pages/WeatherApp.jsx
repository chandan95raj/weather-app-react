import { useState, useEffect } from 'react';

const apiKey = 'bd5e378503939ddaee76f12ad7a97608';

function WeatherApp() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) fetchWeather(lastCity);
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeather = async (cityName) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            setWeatherData(data);
            setError(null);
            localStorage.setItem('lastCity', cityName);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    const handleSearch = () => {
        if (city) fetchWeather(city);
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-6 mx-auto weather-app ">
                    <h1 className="text-center">Weather App</h1>
                    <div className="form-group">
                        <input
                            type="text"
                            value={city}
                            onChange={handleInputChange}
                            className="form-control text-capitalize"
                            placeholder="Enter city name"
                        />
                    </div>
                    <div className="text-center">
                        <button onClick={handleSearch} className="btn btn-light btn-lg mt-3">Get Weather</button>
                    </div>
                    {error && <div className="alert alert-danger mt-4" role="alert">{error}</div>}
                    {weatherData && (
                        <div className="weather-info mt-4">
                            <h5>{weatherData.name}</h5>
                            <p>Temperature: {weatherData.main.temp} °C</p>
                            <p>Conditions: {weatherData.weather[0].description}</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                alt="Weather Icon"
                                className="weather-icon"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
