import React from 'react';
import './App.css';

//Get API
const api = {
  key: "1f92e6337f4dd8d7396a77a9c3dac39f",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  //initial state of weather is an object because the data we are recieving is an object
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({})

  const setMyQuery = (event) => {
    setQuery(event.target.value) 
  }

  
//make am http request
  const queryHandler = (event) => {
    if(event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => response.json())
      .then(responseData =>  {
        setQuery('')
        setWeather(responseData) // Set weather to the responsedata so you can use it
        console.log(responseData)
      })
    }
  }  


  const dateHandler = (d)=> {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] ;
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December']

    const day = days[d.getDay()] ;
    const date = d.getDate() ;
    const month = months[d.getMonth()]
    const year = d.getFullYear() ;
    
    return (`${day} ${date} ${month} ${year}`)
  }



  return (
    <div className = {(
      typeof weather.name !== 'undefined') ? (weather.main.temp > 16 ? 'App warm' : 'App') : 'App'}>
      <div className="main">
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search" 
          onKeyPress = {queryHandler}
          onChange = {setMyQuery} 
          value = {query}
          />
        </div>

        <div className="location-box">
          {weather.name !== undefined ?
          <div>
            <div className = "location">{weather.name}, {weather.sys.country} </div>
            <div className="date">{dateHandler(new Date())}</div>
            <div className="temp-box">
              <div className="temp"> {Math.round(weather.main.temp)}<i className= 'degrees' >{'\u00b0'}</i> </div>
              <div className="weather"> {weather.weather[0].main} </div>
            </div>  
          </div> : ('')}
        </div>
    </div>
  </div>
  );
}

export default App;
