$(document).ready(function(){
  var cityname;
    $('#searchbutton').click(function(){
        cityname = document.getElementById("locationData").value;
        getData();
      })

    const locationElement = document.querySelector("#location");
    const temperatureElement = document.querySelector(".card-title.temperature");
    const descriptionElement = document.querySelector(".card-text.description");
    const cloudElement = document.querySelector(".card-text.cloudCover");
    const humidityElement = document.querySelector(".card-text.humidity");
    const windElement = document.querySelector(".card-text.wind");
    const feelsLikeElement = document.querySelector(".card-text.feels-like");
    const aqiElement = document.querySelector(".card-text.aqi");
    const aqiCategory = document.querySelector(".card-text.aqi_category");
    const dominantPollutant = document.querySelector(".card-text.dominant_pollutant");
    const health_recommendations = document.querySelector(".card-text.health_recom");

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

    var latitude;
    var longitude;
    var lat;
    var lon;

      function getData(){
        let api = 'http://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid=e5b3b9366e1096630bfe407e3aa15981';
      
        fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            latitude = data.coord.lat;
            longitude = data.coord.lon;
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
        })
        .then(function(){
          get6dayforecast();
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

function get6dayforecast(){
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
          forecast.pop1 = data.daily[0].pop*100;

          forecast.temperaturemax2 = Math.floor(data.daily[1].temp.max - KELVIN);
          forecast.temperaturemin2 = Math.floor(data.daily[1].temp.min - KELVIN);
          forecast.description2 = data.daily[1].weather[0].main;
          forecast.description2 = forecast.description2[0].toUpperCase() + forecast.description2.substring(1);
          forecast.pop2 = data.daily[1].pop*100;

          forecast.temperaturemax3 = Math.floor(data.daily[2].temp.max - KELVIN);
          forecast.temperaturemin3 = Math.floor(data.daily[2].temp.min - KELVIN);
          forecast.description3 = data.daily[2].weather[0].main;
          forecast.description3 = forecast.description3[0].toUpperCase() + forecast.description3.substring(1);
          forecast.pop3 = data.daily[2].pop*100;

          forecast.temperaturemax4 = Math.floor(data.daily[3].temp.max - KELVIN);
          forecast.temperaturemin4 = Math.floor(data.daily[3].temp.min - KELVIN);
          forecast.description4 = data.daily[3].weather[0].main;
          forecast.description4 = forecast.description4[0].toUpperCase() + forecast.description4.substring(1);
          forecast.pop4 = data.daily[3].pop*100;

          forecast.temperaturemax5 = Math.floor(data.daily[4].temp.max - KELVIN);
          forecast.temperaturemin5 = Math.floor(data.daily[4].temp.min - KELVIN);
          forecast.description5 = data.daily[4].weather[0].main;
          forecast.description5 = forecast.description5[0].toUpperCase() + forecast.description5.substring(1);
          forecast.pop5 = data.daily[4].pop*100;

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
      })
      .then(function(){
        getPollutionData();
      });
}

function displayForecast(){
  // iconElement.innerHTML = '<img src="/assets/"'+weather.iconID+'".png"/>';
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

var pollution = {};

function getPollutionData(){
    let API = 'https://api.breezometer.com/air-quality/v2/current-conditions?lat='+latitude+'&lon='+longitude+'&key='+AQIkey+'&features=breezometer_aqi,health_recommendations';

    fetch(API)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            pollution.aqius = data.data.indexes.baqi.aqi;
            pollution.description = data.data.indexes.baqi.category;
            pollution.pollutant = data.data.indexes.baqi.dominant_pollutant;
            pollution.health = data.data.health_recommendations.active;
        })
        .then(function(){
            displayPollution();
        });
}

function displayPollution(){
    aqiElement.innerHTML = 'AQI : '+pollution.aqius;
    aqiCategory.innerHTML = pollution.description;
    dominantPollutant.innerHTML = 'Key Pollutant: '+ pollution.pollutant;
    health_recommendations.innerHTML = pollution.health;
}

});


