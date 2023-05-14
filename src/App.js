import React, { useEffect, useState } from 'react';
import moment from 'moment';

const api = {
  key: "d6564e0dc223bd0343a59b2c55669928",
  base: "https://api.openweathermap.org/data/2.5/"
}

const WeatherApp = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [weather, SetWeather] = useState('');
  const [searchFind, setSearchFind] = useState(false);

  const dateBuilder = (date) => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];
    let dates = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return (`${day} ${dates} ${month} ${year}`)

  }

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
    if (e.key === 'Enter')
      setSearchFind(true);
  }

  const weatherData = async (data) => {
    await fetch(`${api.base}weather?q=${data}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        if (result?.id) {
          SetWeather(result);
        }
        else {
          alert(result?.message);
          setSearchTerm('');
          setSearchFind(false);
          SetWeather("");
        }
        console.log(result);
      })
  }

  useEffect(() => {
    if (searchTerm && searchFind) {
      weatherData(searchTerm);
      setSearchFind(false);
    }
  }, [searchTerm, searchFind])


  return (
    <div className={weather ? weather?.main !== "" ? 'app warm' : 'app' : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" placeholder='Search City...' className='search-bar' value={searchTerm} onChange={handleSearch} onKeyDown={handleSearch} />
        </div>
        {weather && weather?.main !== "" ?
          <React.Fragment>
            <div className="location-box">
              <div className="location">{weather?.name}, {weather?.sys?.country === "IN" ? "India" : weather?.sys?.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              {/* <div className='date'>{moment(new Date()).format("dddd DD MMM YYYY")}</div> */}
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather?.main?.temp)}*C</div>
              <div className='weather'>{weather?.weather?.length > 0 ? weather?.weather[0]?.description : ""}</div>
            </div>
          </React.Fragment>
          :
          <div className='intro-box'>
            {/* <div className='text'>Weather App by Prerna</div> */}
          </div>
        }
      </main>
    </div>
  );
}

export default WeatherApp;
