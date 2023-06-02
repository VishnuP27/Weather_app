const api={
    key:"",
    baseurl:"https://api.openweathermap.org/data/2.5/weather"
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}/weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      })
      .then(displayResults);
  }
function displayResults(weather) {
//   console.log(weather);
  let city=document.querySelector('.location .city');
  city.innerText= '${weather.name}, ${weather.sys.country}';
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp= document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>*c</span>`;
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerHTML= weather.weather[0].main;
  let hilow=document.querySelector('.hi-low');
  hilow.innerHTML= `${weather.main.temp_min}*c / ${weather.main.temp_max}*c`;
}
function dateBuilder(d){
 let months = ["January","February","March","April","May","June","July","August","Septamper","october","November","December"];
 let days= ["Sunday","Monday","Tuseday","Wednessday","Thursday","Friday","Saturday"]   ;
 
 let day = days [d.getDay()];
 let date= d.getDate();
 let month = months[d.getMonth()];
 let year = d.getFullYear();
 return `${day} ${date} ${month} ${year}`;
}