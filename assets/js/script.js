const apiKey = "SvUtQt7JEcYzRFyXh0G6YoEbyWU8oaHmZvOG1S4C";

let selectEl = $(".select");
let parksContainerEl = $("#parks-container");
let parksListEl = $(".parks-list");


let stateArr = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

let stateAbrArr = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

bulmaCarousel.attach("#carousel", {
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true
});

selectEl.on("change", function(event) {
    let value = selectEl.val();

    getLocations(value);
})

let addStateDropdown = function() {
    for (i=0; i<stateArr.length; i++) {
        let optionEl = $("<option>")
            .attr("value", stateAbrArr[i])
            .text(stateArr[i]);

        selectEl.append(optionEl);
    }
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
    parksListEl.text("");

    if (parks.length === 0) {
        parksListEl.textContent = "This state has no parks.";
        return;
    }

    for (let i = 0; i < parks.length; i++) {
        let listItemEl = $("<li>")
            .addClass("box");

        // create a link element to take users to the park website
        let parkEl = $("<a>")
            .attr("href", parks[i].url)
            .attr("target", "_blank");

        // create span to hold park name
        let nameEl = $("<span>")
            .text(parks[i].fullName)
            .addClass("has-text-black");

        // append to containers
        parkEl.append(nameEl);
        listItemEl.append(parkEl)
        parksListEl.append(listItemEl);
    }
};

addStateDropdown();