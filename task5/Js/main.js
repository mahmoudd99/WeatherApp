

// Today's Cards Variabels
let today =document.getElementById('today'),
    todayDate = document.getElementById('today-date'),
    cityLocation = document.getElementById('location'),
    todayDegree = document.getElementById('today-degree'),
    todayIcon = document.getElementById('today-icon'),
    description = document.getElementById('today-description'),
    humidty = document.getElementById('humidty'),
    wind = document.getElementById('wind'),
    compass =document.getElementById('compass'),
    searchBar= document.getElementById('search-bar'),
    responseData;
    currentlyCity ='' ;

//Next Days Variables
    let nextDay = document.getElementsByClassName('nextDay'),
        nextDayIcon = document.getElementsByClassName('nextDay-icon'),
        minDegree = document.getElementsByClassName('min-degree'),
        maxDegree = document.getElementsByClassName('max-degree'),
        nextDayDescription  = document.getElementsByClassName('nextDay-description'),
        days = ['sunday','monday','tuseday','wednesday','thursday','friday','saturday'],
        mounths = ['Jan','Feb','mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

//currentCity         

 async function getWeatherData(city)
{

  let response= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=13d1315fbdf74d5d880153108220206&q=${city}&days=3&aqi=no&alerts=no`)
   responseData = await response.json();
  
     displayTodayWeather();
     displayNaxtWeather();
}

// getWeatherData();


function displayTodayWeather()
{
          let date = new Date();
         today.innerHTML=days[date.getDay()];
         todayDate.innerHTML=`${date.getDate()}${mounths[date.getMonth()]}`;
         cityLocation.innerHTML = responseData.location.name;
         todayDegree.innerHTML=responseData.current.temp_c;
         todayIcon.setAttribute('src',` https:${responseData.current.condition.icon}`);
         description.innerHTML=responseData.location.region;
         humidty.innerHTML = responseData.current.humidity;
         wind.innerHTML = responseData.current.wind_degree;
         compass.innerHTML= responseData.current.wind_dir;

}
 

function displayNaxtWeather() {

  for(let i =0 ;  i<nextDay.length ;i++)
  {
     nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
     nextDayIcon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
     minDegree[i].innerHTML= responseData.forecast.forecastday[i+1].day.mintemp_c;
     maxDegree [i].innerHTML =  responseData.forecast.forecastday[i+1].day.maxtemp_c;
     nextDayDescription[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text;
  }

  }


  searchBar.addEventListener('keyup',function(){
    currentlyCity=searchBar.value;
    getWeatherData(currentlyCity);
    
  })














