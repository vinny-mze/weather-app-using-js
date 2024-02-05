let currentCity = "Johannesburg";
let units = "metric"

let city = document.querySelector('.weather-city');
let datetime = document.querySelector('.weather-datetime');
let weatherForecast = document.querySelector('.weather-forecast');
let weatherTemperataure = document.querySelector('.weather-temperature');
let weatherIcon = document.querySelector('.weather-icon');
let minmax = document.querySelector('.weather-minmax');
let realFeel = document.querySelector('.weather-realFeel');
let humidity = document.querySelector('.weather-humidity');
let wind = document.querySelector('.weather-wind');
let pressure = document.querySelector('.weather-pressure');

document.querySelector('weather-search')
addEventListener('submit', e=>{
  let search = document.querySelector(".weather-searchForm");
  
  e.preventDefault();
  currentCity = search.value;
  getWeather();
  search.value = ""
})

document.querySelector(".weather-unitCelsius").addEventListener('click', () => {
  if(units !== "metric"){
      units = "metric"; 
      getWeather();
  }
})

document.querySelector(".weather-unitFarenheit").addEventListener('click', () => {
  if(units !== "imperial"){
      units = "imperial";
      getWeather();
  }
})


function convertCountryCode(country){
  let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
  return regionNames.of(country)
}

function convertTimeStamp(timestamp, timezone){
  const convertTimezone = timezone / 3600; // convert seconds to hours 

 const date = new Date(timestamp * 1000);
 
 const options = {
     weekday: "long",
     day: "numeric",
     month: "long",
     year: "numeric",
     hour: "numeric",
     minute: "numeric",
     timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
     hour12: true,
 }
 return date.toLocaleString("en-US", options)

}

function getWeather(){
  const API_KEY = '24db1b364321c63989c42af2f0c2186c'

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone)
    weatherForecast.innerHTML = `<p>${data.weather[0].main}</p>`
    weatherTemperataure.innerHTML = `${data.main.temp.toFixed()}&#176`
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p>
                        <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    realFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    humidity.innerHTML =  `${data.main.humidity}%`
    wind.innerHTML =  `${data.wind.speed}${units==="imperial"?"mph":"m/s"}`
    pressure.innerHTML =  `${data.main.pressure}hPa`
  })
}

document.body.addEventListener("load",getWeather());