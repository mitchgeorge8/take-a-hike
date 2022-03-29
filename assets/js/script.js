const apiKeyLocations = "SvUtQt7JEcYzRFyXh0G6YoEbyWU8oaHmZvOG1S4C";

let selectEl = $(".select");
let parksContainerEl = $("#parks-container");
let parksHeaderEl = $(".parks-header");
let parksListEl = $(".parks-list");

let stateArr = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

let stateAbrArr = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

bulmaCarousel.attach("#carousel", {
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true
});

//weather

// function check weather for specific settings and zip code
function checkWeather() {
    var settings ={
        "async": true,
        "crossDomain": true,
        "dataType": "json",
        "url": "http://api.openweathermap.org/data/2.5/weather?zip=82190,us&appid=da25d74f97cef3d0289a4a9c43c9c6af&units=imperial",
        "method": "GET"
    };

    //run function
    $.ajax(settings)
    //console log and display response
    .done(function (response) {
        console.log(response);
        //modify specific elements in html
        $("#wind_speed").append (response.wind.speed);
        $("#main_temp").append (response.main.temp);
        $("#weather_conditions").append (response.weather[0].main);
        $("#wind_speed_unit").append (" MPH");
        $("#main_temp_unit").append (" F");
    });
  };

let addStateDropdown = function() {
    for (i=0; i<stateArr.length; i++) {
        let optionEl = $("<option>")
            .text(stateArr[i])
            .attr("value", stateAbrArr[i])
            .addClass("is-size-6");

        selectEl.append(optionEl);
    }
};

selectEl.on("change", function(event) {
    let value = selectEl.val();
    let state = $(".select :selected").text();

    getLocations(value, state);
})

let getLocations = function(abbr, state) {
    let apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + abbr + "&api_key=" + apiKeyLocations;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function
                displayParks(data.data, state);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(abbr);
                }
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

// parks
let displayParks = function(parks, state) {
    parksHeaderEl.text("Select a state from the dropdown");
    parksListEl.text("");

    if (parks.length === 0) {
        parksListEl.textContent = "This state has no parks.";
        return;
    }

    parksHeaderEl.text("National Parks in " + state);

    for (let i = 0; i < parks.length; i++) {
        let listItemEl = $("<li>")
            .addClass("box m-1 p-2");

        // create a link element to take users to the park website
        let parkEl = $("<a>")
            .attr("href", parks[i].url)
            .attr("target", "_blank");

        // create span to hold park name
        let nameEl = $("<span>")
            .text(parks[i].fullName)
            .addClass("has-text-black is-size-6");

        // append to containers
        parkEl.append(nameEl);
        listItemEl.append(parkEl)
        parksListEl.append(listItemEl);
    }
};

addStateDropdown();