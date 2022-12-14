let lat
let lon
let country
let city
let temp
let weather
let src
let currTime
let sunRise
let sunSet

let main = document.getElementById("main")
let place = document.getElementById("location")
let value= document.getElementById("value");
let unit = document.getElementById("unit")
let weath= document.getElementById("weather")
let img = document.getElementById('im')
let togle = document.getElementById("togle")

function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
 console.log("fail")
  }
};

  getLocation();
function showPosition(position){
 lon =position.coords.longitude;
lat = position.coords.latitude;

const req = new XMLHttpRequest();
req.open("GET","https://weather-proxy.freecodecamp.rocks/api/current?lat=" + lat + "&lon=" + lon, true);
req.send();
req.onload = function(){
  const json = JSON.parse(req.responseText);
  currTime = json.dt
  sunSet = json.sys.sunset
 if (currTime > sunSet){
   main.style.backgroundImage = "url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80')"
   main.style.color="white"
 }else{
   main.style.backgroundImage = "url('https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-2381.jpg?w=2000')"
   
 }
  city= json.name
  console.log(currTime)
  country = json.sys.country
  temp = json.main.temp
  weather = json.weather[0].main
  src = json.weather[0].icon
  place.innerHTML = city + ", " + country;
  value.innerHTML = temp
  unit.innerHTML = "°C"
  unit.onclick = function(){
    if (unit.innerHTML === "°C"){
      unit.innerHTML = "°F"
      value.innerHTML = (temp * 1.8) + 32
    } else{
      unit.innerHTML = "°C"
      value.innerHTML = temp
    }
  }
  
  weath.innerHTML = weather
  img.src = src
  
};

};