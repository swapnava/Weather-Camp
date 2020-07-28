const city = document.getElementById("city");
const desc = document.getElementById("desc");
const temp = document.getElementById("temp");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feels-like");
const cloud = document.getElementById("cloud");
const aqius = document.getElementById("aqius");
const aqidesc = document.getElementById("aqidescription");
const icon = document.getElementById("icon");

var weather = {};

weather.temperature = {
    unit : "celsius"
}

const AQIkey = '704bbf7dc7d740459179ecfe143e0cd2';

var pollution = {};

const KELVIN = 273;
const key = "e5b3b9366e1096630bfe407e3aa15981";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
    alert("Browser doesn't support Geolocation");
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude,longitude);
    getPollutionData(latitude,longitude);
}

function showError(error){
    console.log("Error occured!");
}

function getWeather(latitude,longitude){
    let api = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+key;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.iconid = data.weather[0].icon;
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.pressure = data.main.pressure;
            weather.description = data.weather[0].description;
            weather.description = weather.description[0].toUpperCase() + weather.description.substring(1);
            weather.city = data.name;
            weather.cloud = data.clouds.all;
            weather.humidity = data.main.humidity;
            weather.feelsLike = Math.floor(data.main.feels_like-KELVIN);
            weather.wind = data.wind.speed;
            
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    icon.innerHTML = '<img src="/assets/'+weather.iconid+'.png" alt="" style="height:65px;width:65px;">';
    temp.innerHTML = 'Temperature: '+weather.temperature.value+'°C';
    desc.innerHTML = weather.description;
    city.innerHTML = weather.city;
    cloud.innerHTML = 'Cloud Cover : '+weather.cloud+'%';
    humidity.innerHTML = 'Humidity : '+weather.humidity+'%';
    feelsLike.innerHTML = 'Feels Like '+weather.feelsLike+'°C';
    wind.innerHTML = 'Wind : '+weather.wind+'km/hr';
    pressure.innerHTML = 'Pressure : '+weather.pressure+' atm';
}

function getPollutionData(latitude,longitude){
    let API = 'https://api.breezometer.com/air-quality/v2/current-conditions?lat='+latitude+'&lon='+longitude+'&key='+AQIkey;

    fetch(API)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            pollution.aqius = data.data.indexes.baqi.aqi;
            pollution.description = data.data.indexes.baqi.category;
        })
        .then(function(){
            displayPollution();
        });
}

function displayPollution(){
    aqius.innerHTML = 'AQI : '+pollution.aqius+' (US EPA)';
    aqidesc.innerHTML = pollution.description;
}