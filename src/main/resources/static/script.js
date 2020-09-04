var locationElement = document.querySelector("#location");
var temperatureElement = document.querySelector(".card-title.temperature");
var descriptionElement = document.querySelector(".card-text.description");
var cloudElement = document.querySelector(".card-text.cloudCover");
var humidityElement = document.querySelector(".card-text.humidity");
var windElement = document.querySelector(".card-text.wind");
var feelsLikeElement = document.querySelector(".card-text.feels-like");
var aqiElement = document.querySelector(".card-text.aqi");
var aqiCategory = document.querySelector(".card-text.aqi_category");
var dominantPollutant = document.querySelector(".card-text.dominant_pollutant");
var health_recommendations = document.querySelector(".card-text.health_recom");

var day1desc = document.querySelector(".card-title.day1-desc");
var day1tempmax = document.querySelector(".card-text.maxtemp1");
var day1tempmin = document.querySelector(".card-text.mintemp1");
var day1wind = document.querySelector(".card-text.wind1");

var day2desc = document.querySelector(".card-title.day2-desc");
var day2tempmax = document.querySelector(".card-text.maxtemp2");
var day2tempmin = document.querySelector(".card-text.mintemp2");
var day2wind = document.querySelector(".card-text.wind2");

var day3desc = document.querySelector(".card-title.day3-desc");
var day3tempmax = document.querySelector(".card-text.maxtemp3");
var day3tempmin = document.querySelector(".card-text.mintemp3");
var day3wind = document.querySelector(".card-text.wind3");

var day4desc = document.querySelector(".card-title.day4-desc");
var day4tempmax = document.querySelector(".card-text.maxtemp4");
var day4tempmin = document.querySelector(".card-text.mintemp4");
var day4wind = document.querySelector(".card-text.wind4");

var day5desc = document.querySelector(".card-title.day5-desc");
var day5tempmax = document.querySelector(".card-text.maxtemp5");
var day5tempmin = document.querySelector(".card-text.mintemp5");
var day5wind = document.querySelector(".card-text.wind5");

var day6desc = document.querySelector(".card-title.day6-desc");
var day6tempmax = document.querySelector(".card-text.maxtemp6");
var day6tempmin = document.querySelector(".card-text.mintemp6");
var day6wind = document.querySelector(".card-text.wind6");

var day7desc = document.querySelector(".card-title.day7-desc");
var day7tempmax = document.querySelector(".card-text.maxtemp7");
var day7tempmin = document.querySelector(".card-text.mintemp7");
var day7wind = document.querySelector(".card-text.wind7");

var historic1description = document.querySelector(".card-title.historic1desc");
var htempmin1 = document.querySelector(".card-text.htempmin1");
var htempmax1 = document.querySelector(".card-text.htempmax1");
var hwind1 = document.querySelector(".card-text.hwind1");

var historic2description = document.querySelector(".card-title.historic2desc");
var htempmin2 = document.querySelector(".card-text.htempmin2");
var htempmax2 = document.querySelector(".card-text.htempmax2");
var hwind2 = document.querySelector(".card-text.hwind2");

var historic3description = document.querySelector(".card-title.historic3desc");
var htempmin3 = document.querySelector(".card-text.htempmin3");
var htempmax3 = document.querySelector(".card-text.htempmax3");
var hwind3 = document.querySelector(".card-text.hwind3");

var historic4description = document.querySelector(".card-title.historic4desc");
var htempmin4 = document.querySelector(".card-text.htempmin4");
var htempmax4 = document.querySelector(".card-text.htempmax4");
var hwind4 = document.querySelector(".card-text.hwind4");

var lati;
var longi;

var weather = {};

weather.temperature = {
    unit : "celsius"
}

var seconds = Math.floor(Date.now() / 1000);

const KELVIN = 273;
const key = "e5b3b9366e1096630bfe407e3aa15981";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
    alert("Browser doesn't support Geolocation");
}

function setPosition(position){
    let latitude = position.coords.latitude;
    lati=latitude;
    let longitude = position.coords.longitude;
    longi=longitude;
    
    getWeather(latitude,longitude);
    getPollutionData(latitude,longitude);
    get6dayforecast(latitude,longitude);
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
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.description = weather.description[0].toUpperCase() + weather.description.substring(1);
            weather.iconID = data.weather[0].icon;
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
    temperatureElement.innerHTML = weather.temperature.value+'°C';
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = weather.city;
    cloudElement.innerHTML = 'Cloud Cover : '+weather.cloud+'%';
    humidityElement.innerHTML = 'Humidity : '+weather.humidity+'%';
    feelsLikeElement.innerHTML = 'Feels Like '+weather.feelsLike+'°C';
    windElement.innerHTML = 'Wind : '+weather.wind+'km/hr';
}

//6-Day Forecast
var forecast = {};

forecast.temperature = {
    unit : "celsius"
}

function get6dayforecast(latitude,longitude){
    let fapi = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&%20exclude=minutely&appid='+key;
    
    fetch(fapi)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            forecast.temperaturemax1 = Math.floor(data.daily[0].temp.max - KELVIN);
            forecast.temperaturemin1 = Math.floor(data.daily[0].temp.min - KELVIN);
            forecast.description1 = data.daily[0].weather[0].main;
            forecast.description1 = forecast.description1[0].toUpperCase() + forecast.description1.substring(1);
            forecast.pop1 = Math.floor(data.daily[0].pop*100);

            forecast.temperaturemax2 = Math.floor(data.daily[1].temp.max - KELVIN);
            forecast.temperaturemin2 = Math.floor(data.daily[1].temp.min - KELVIN);
            forecast.description2 = data.daily[1].weather[0].main;
            forecast.description2 = forecast.description2[0].toUpperCase() + forecast.description2.substring(1);
            forecast.pop2 = Math.floor(data.daily[1].pop*100);

            forecast.temperaturemax3 = Math.floor(data.daily[2].temp.max - KELVIN);
            forecast.temperaturemin3 = Math.floor(data.daily[2].temp.min - KELVIN);
            forecast.description3 = data.daily[2].weather[0].main;
            forecast.description3 = forecast.description3[0].toUpperCase() + forecast.description3.substring(1);
            forecast.pop3 = Math.floor(data.daily[2].pop*100);

            forecast.temperaturemax4 = Math.floor(data.daily[3].temp.max - KELVIN);
            forecast.temperaturemin4 = Math.floor(data.daily[3].temp.min - KELVIN);
            forecast.description4 = data.daily[3].weather[0].main;
            forecast.description4 = forecast.description4[0].toUpperCase() + forecast.description4.substring(1);
            forecast.pop4 = Math.floor(data.daily[3].pop*100);

            forecast.temperaturemax5 = Math.floor(data.daily[4].temp.max - KELVIN);
            forecast.temperaturemin5 = Math.floor(data.daily[4].temp.min - KELVIN);
            forecast.description5 = data.daily[4].weather[0].main;
            forecast.description5 = forecast.description5[0].toUpperCase() + forecast.description5.substring(1);
            forecast.pop5 = Math.floor(data.daily[4].pop*100);

            forecast.temperaturemax6 = Math.floor(data.daily[5].temp.max - KELVIN);
            forecast.temperaturemin6 = Math.floor(data.daily[5].temp.min - KELVIN);
            forecast.description6 = data.daily[5].weather[0].main;
            forecast.description6 = forecast.description6[0].toUpperCase() + forecast.description6.substring(1);
            forecast.pop6 = Math.floor(data.daily[5].pop*100);

            forecast.temperaturemax7 = Math.floor(data.daily[6].temp.max - KELVIN);
            forecast.temperaturemin7 = Math.floor(data.daily[6].temp.min - KELVIN);
            forecast.description7 = data.daily[6].weather[0].main;
            forecast.description7 = forecast.description7[0].toUpperCase() + forecast.description7.substring(1);
            forecast.pop7 = Math.floor(data.daily[6].pop*100);
            
        })
        .then(function(){
            displayForecast();
        });
}

function displayForecast(){
    day1desc.innerHTML = forecast.description1;
    day1tempmin.innerHTML = 'Min Temp : '+forecast.temperaturemin1+'°C';
    day1tempmax.innerHTML = 'Max Temp : '+forecast.temperaturemax1+'°C';
    day1wind.innerHTML = 'Precipitation : '+forecast.pop1+'%';

    day2desc.innerHTML = forecast.description2;
    day2tempmin.innerHTML = 'Min Temp : '+forecast.temperaturemin2+'°C';
    day2tempmax.innerHTML = 'Max Temp : '+forecast.temperaturemax2+'°C';
    day2wind.innerHTML = 'Precipitation : '+forecast.pop2+'%';

    day3desc.innerHTML = forecast.description3;
    day3tempmin.innerHTML = 'Min Temp : '+forecast.temperaturemin3+'°C';
    day3tempmax.innerHTML = 'Max Temp : '+forecast.temperaturemax3+'°C';
    day3wind.innerHTML = 'Precipitation : '+forecast.pop3+'%';

    day4desc.innerHTML = forecast.description4;
    day4tempmin.innerHTML = 'Min Temp : '+forecast.temperaturemin4+'°C';
    day4tempmax.innerHTML = 'Max Temp : '+forecast.temperaturemax4+'°C';
    day4wind.innerHTML = 'Precipitation : '+forecast.pop4+'%';

    day5desc.innerHTML = forecast.description5;
    day5tempmin.innerHTML = 'Min Temp : '+forecast.temperaturemin5+'°C';
    day5tempmax.innerHTML = 'Max Temp : '+forecast.temperaturemax5+'°C';
    day5wind.innerHTML = 'Precipitation : '+forecast.pop5+'%';

    day6desc.innerHTML = forecast.description6;
    day6tempmin.innerHTML = 'Min Temp : '+forecast.temperaturemin6+'°C';
    day6tempmax.innerHTML = 'Max Temp : '+forecast.temperaturemax6+'°C';
    day6wind.innerHTML = 'Precipitation : '+forecast.pop6+'%';

    day7desc.innerHTML = forecast.description7;
    day7tempmin.innerHTML = 'Min Temp : '+forecast.temperaturemin7+'°C';
    day7tempmax.innerHTML = 'Max Temp : '+forecast.temperaturemax7+'°C';
    day7wind.innerHTML = 'Precipitation : '+forecast.pop7+'%';
}

const AQIkey = 'ef57302fb7544a9e8bf35c65ff9046ba';

var pollution = {};

function getPollutionData(latitude,longitude){
    let API = 'https://api.breezometer.com/air-quality/v2/current-conditions?lat='+latitude+'&lon='+longitude+'&key='+AQIkey+'&features=local_aqi,health_recommendations';

    fetch(API)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            pollution.aqius = data.data.indexes.ind_cpcb.aqi;
            pollution.displayName = data.data.indexes.ind_cpcb.display_name;
            pollution.description = data.data.indexes.ind_cpcb.category;
            pollution.pollutant = data.data.indexes.ind_cpcb.dominant_pollutant;
            pollution.health = data.data.health_recommendations.active;
        })
        .then(function(){
            displayPollution();
        });
}

function displayPollution(){
    aqiElement.innerHTML = 'AQI : '+pollution.aqius+' '+pollution.displayName;
    aqiCategory.innerHTML = pollution.description;
    dominantPollutant.innerHTML = 'Key Pollutant: '+ pollution.pollutant;
    health_recommendations.innerHTML = pollution.health;
}

// var historic = {};

// historic.temperature = {
//     unit : "celsius"
// }

// function historicforecast1(latitude,longitude){
//     var date = seconds - 86400;
//     let api1 = 'http://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+latitude+'&lon='+longitude+'&dt='+date+'&appid='+key;
    
//     fetch(api1)
//         .then(function(response){
//             let data = response.json();
//             return data;
//         })
//         .then(function(data){
//             historic.temperature1 = Math.floor(data.current.temp - KELVIN);
//             historic.description1 = data.current.weather[0].main;
//             historic.description1 = historic.description1[0].toUpperCase() + historic.description1.substring(1);
//             historic.cloud1 = data.current.clouds;
//             historic.wind1 = data.current.wind_speed;
//         })
//         .then(function(){
//             displayForecast();
//         });
// }

// function displayForecast(){
//     // iconElement.innerHTML = '<img src="/assets/"'+weather.iconID+'".png"/>';
//     historic1description.innerHTML = historic.description1;
//     htempmin1.innerHTML = 'Temp : '+historic.temperature1+'°C';
//     htempmax1.innerHTML = 'Cloud Cover : '+historic.cloud1+'%';
//     day1wind.innerHTML = 'Wind : '+historic.wind1+'km/hr';
// }

// forecast.temperature = {
//     unit : "celsius"
// }

// function historicforecast2(latitude,longitude){
//     var date = seconds - 172800;
//     let api1 = 'http://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+latitude+'&lon='+longitude+'&dt='+date+'&appid='+key;
    
//     fetch(api1)
//         .then(function(response){
//             let data = response.json();
//             return data;
//         })
//         .then(function(data){
//             historic.temperature2 = Math.floor(data.current.temp - KELVIN);
//             historic.description2 = data.current.weather[0].main;
//             historic.description2 = historic.description2[0].toUpperCase() + historic.description2.substring(1);
//             historic.cloud2 = data.current.clouds;
//             historic.wind2 = data.current.wind_speed;
//         })
//         .then(function(){
//             displayForecast();
//         });
// }

// function displayForecast(){
//     // iconElement.innerHTML = '<img src="/assets/"'+weather.iconID+'".png"/>';
//     historic2description.innerHTML = historic.description2;
//     htempmin2.innerHTML = 'Temp : '+historic.temperature2+'°C';
//     htempmax2.innerHTML = 'Cloud Cover : '+historic.cloud2+'%';
//     day2wind.innerHTML = 'Wind : '+historic.wind2+'km/hr';
// }

// function historicforecast3(latitude,longitude){
//     var date = seconds - 259200;
//     let api1 = 'http://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+latitude+'&lon='+longitude+'&dt='+date+'&appid='+key;
    
//     fetch(api1)
//         .then(function(response){
//             let data = response.json();
//             return data;
//         })
//         .then(function(data){
//             historic.temperature3 = Math.floor(data.current.temp - KELVIN);
//             historic.description3 = data.current.weather[0].main;
//             historic.description3 = historic.description3[0].toUpperCase() + historic.description3.substring(1);
//             historic.cloud3 = data.current.clouds;
//             historic.wind3 = data.current.wind_speed;
//         })
//         .then(function(){
//             displayForecast();
//         });
// }

// function displayForecast(){
//     // iconElement.innerHTML = '<img src="/assets/"'+weather.iconID+'".png"/>';
//     historic3description.innerHTML = historic.description3;
//     htempmin3.innerHTML = 'Temp : '+historic.temperature3+'°C';
//     htempmax3.innerHTML = 'Cloud Cover : '+historic.cloud3+'%';
//     day3wind.innerHTML = 'Wind : '+historic.wind3+'km/hr';
// }

// function historicforecast4(latitude,longitude){
//     var date = seconds - 345600;
//     let api1 = 'http://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+latitude+'&lon='+longitude+'&dt='+date+'&appid='+key;
    
//     fetch(api1)
//         .then(function(response){
//             let data = response.json();
//             return data;
//         })
//         .then(function(data){
//             historic.temperature4 = Math.floor(data.current.temp - KELVIN);
//             historic.description4 = data.current.weather[0].main;
//             historic.description4 = historic.description4[0].toUpperCase() + historic.description4.substring(1);
//             historic.cloud4 = data.current.clouds;
//             historic.wind4 = data.current.wind_speed;
//         })
//         .then(function(){
//             displayForecast();
//         });
// }

// function displayForecast(){
//     // iconElement.innerHTML = '<img src="/assets/"'+weather.iconID+'".png"/>';
//     historic4description.innerHTML = historic.description4;
//     htempmin4.innerHTML = 'Temp : '+historic.temperature4+'°C';
//     htempmax4.innerHTML = 'Cloud Cover : '+historic.cloud4+'%';
//     day4wind.innerHTML = 'Wind : '+historic.wind4+'km/hr';
// }

var firebaseConfig = {
    apiKey: "AIzaSyDpqXQw0uvRgl-m2jA_nBRadQQ5xbY0Fgk",
    authDomain: "weather-283116.firebaseapp.com",
    databaseURL: "https://weather-283116.firebaseio.com",
    projectId: "weather-283116",
    storageBucket: "weather-283116.appspot.com",
    messagingSenderId: "830261752215",
    appId: "1:830261752215:web:95db64f24b95b2ddd654d2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function logout(){
	const auth = firebase.auth();
	auth.signOut();
    
	location.replace("/");
	
}


var options = {
    // Required: API key
    key: 'Rexm4cLT0Nh9IFL2Ucr7hCl2NDpoUUgr', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: lati,
    lon: longi,
    zoom: 5,
};
// Initialize Windy API
windyInit(options, windyAPI => {
    const { picker, utils, broadcast } = windyAPI;

    picker.on('pickerOpened', latLon => {
        // picker has been opened at latLon coords
        console.log(latLon);

        const { lat, lon, values, overlay } = picker.getParams();
        // -> 48.4, 14.3, [ U,V, ], 'wind'
        console.log(lat, lon, values, overlay);

        const windObject = utils.wind2obj(values);
        console.log(windObject);
    });

    picker.on('pickerMoved', latLon => {
        // picker was dragged by user to latLon coords
        console.log(latLon);
    });

    picker.on('pickerClosed', () => {
        // picker was closed
    });

    // Wait since wather is rendered
    broadcast.once('redrawFinished', () => {
        picker.open({ lat: lati, lon: longi });
        // Opening of a picker (async)
    });
});
