bulmaCarousel.attach('#carousel', {
    slidesToScroll: 1,
    slidesToShow: 1
});




//weather

// const weather = {}

// weather.temperature = {
//     unit : "farenheight"
// }
const key = "29cddfeb1ce63551dd6d2d389e8b733a";

// function setPosition(position){
//     let latitude = 41.0998;
//     let longitude = 80.6495;
    

//     getWeather(latitude,longitude);
// }

// //function getWeather(position){
//     //let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;



//     function getWeather(callback) {
//         var weather = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&&APPID=${key}`;
//         $.ajax({
//           dataType: "jsonp",
//           url: weather,
//           success: callback
//         });
//         console.log(JSON.stringify(temp));

//     fetch (api)
//         .then (function(response){
//             let data =response.json();
//             return data;
//         })
//         .then(function(data){
//             weather.temperature.value=data.main.temp;
//             weather.description=data.weather[0].description;
//             weather.city=data.name
//         })
//         .then(function(){
//             displayWeather();
//         });
//         console.log(JSON.stringify(data));
// }
// function displayWeather(){
//     tempElement.innerHTML= `${weather.temperature.value}°<span>F</span>`;
//     descElement.innerHTML = weather.description;
//     locationElement.innerHTML = `${weather.city}, ${weather.country}`;
// }
let zip = 
function checkWeather() {
    var settings ={
        "async": true,
        "crossDomain": true,
        "dataType": "json",
        "url": "http://api.openweathermap.org/data/2.5/weather?zip=82190,us&appid=da25d74f97cef3d0289a4a9c43c9c6af&units=imperial",
        "method": "GET"
    };
    $.ajax(settings)

    .done(function (response) {
        console.log(response);

        $("#wind_speed").append (response.wind.speed);
        $("#main_temp").append (response.main.temp);
        $("#weather_conditions").append (response.weather[0].main);
        $("#wind_speed_unit").append (" MPH");
        $("#main_temp_unit").append (" F");
    });
}

