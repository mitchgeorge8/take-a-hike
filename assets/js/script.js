let apiKey = "SvUtQt7JEcYzRFyXh0G6YoEbyWU8oaHmZvOG1S4C";

let parksContainerEl = document.querySelector("#parks-container");
let dropDownContentEl = document.querySelector(".dropdown-content");

bulmaCarousel.attach('#carousel', {
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true
});

//DOMContentLoaded - it fires when initial HTML document has been completely loaded
document.addEventListener('DOMContentLoaded', function () {
    // querySelector - it returns the element within the document that matches the specified selector
    var dropdown = document.querySelector('.dropdown');
      
    //addEventListener - attaches an event handler to the specified element.
    dropdown.addEventListener('click', function(event) {
      
       //event.stopPropagation() - it stops the bubbling of an event to parent elements, by preventing parent event handlers from being executed
       event.stopPropagation();
        
       //classList.toggle - it toggles between adding and removing a class name from an element
       dropdown.classList.toggle('is-active');
    });
 });        

let addStateList = function() {

};

let getLocations = function(state) {
    let apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=" + apiKey;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function
                displayParks(data.data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(state);
                }
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
}

let displayParks = function(parks) {
    if (parks.length === 0) {
        parksContainerEl.textContent = "This state has no parks.";
        return;
    }

    console.log(parks);

    for (let i = 0; i < parks.length; i++) {
        console.log(parks[i]);

        // create a link element to take users to the park website
        let parkEl = document.createElement("a");
        parkEl.setAttribute("href", parks[i].url)
        parkEl.setAttribute("target", "_blank");

        // create span to hold park name
        let nameEl = document.createElement("span");
        nameEl.textContent = parks[i].fullName;

        // append to container
        parkEl.appendChild(nameEl);

        parksContainerEl.appendChild(parkEl);
    }
};

getLocations("OH");