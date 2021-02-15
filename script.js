let map;
let home;
let geocoder;
let userAddress;
let markers = [];

$(document).ready(initMap());

function initMap() {
  //displays a google map
  let center = new google.maps.LatLng(50, 0);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 1.8,
  });

  if ($(".displayHeader").is(":empty")) {
    defaultCountry = geoplugin_countryName();
    $(".displayHeader").empty();
    $(".displayHeader").append(defaultCountry);
    getData(geoplugin_countryName());
  }

  let infoWindow = new google.maps.InfoWindow({
    content: "Click on the Map!",
    position: center,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });

    var inputLocation = JSON.parse(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );

    const KEY = "AIzaSyAcG8TMTSzobajQabIp6fheJT0QBfQNj9w";
    const LAT = inputLocation.lat;
    const LNG = inputLocation.lng;

    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      LAT +
      "," +
      LNG +
      "&key=" +
      KEY;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        checkValid = 0;
        let inputAddress = data.results[0].address_components;
        inputAddress.forEach((inputAddress) => {
          if (inputAddress.types.includes("country")) {
            checkValid = 1;
            infoWindow.setContent(inputAddress.long_name);
            $(".displayHeader").empty();
            $(".displayHeader").html(inputAddress.long_name);
            chart1.destroy();
            getData($(".displayHeader").html());
          }
        });
        if (checkValid == 0) {
          infoWindow.setContent("Invalid Location!");
        }
      })
      .catch((err) => console.warn(err.message));

    infoWindow.open(map);
  });

  //User input has autocomplete
  let input = document.getElementById("input");
  let autocomplete = new google.maps.places.Autocomplete(input);

  geocoder = new google.maps.Geocoder();

  //when user clicks on "locate", marker will be set on the location user has stated
  document
    .getElementById("submit")
    .addEventListener("click", function getPlaces() {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      userAddress = document.getElementById("input").value;

      geocoder.geocode({ address: userAddress }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
          let homeMarker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: results[0].geometry.location,
          });
        }
      });
    });
}

function getData(country) {
  var url = "https://api.covid19api.com/country/" + country;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Add code (foreach) for China & US to calculate provinces cases and add them to a variable
      let latestData = data[data.length - 1];
      $("#totalActive").empty();
      $("#totalRecovered").empty();
      $("#deaths").empty();
      $("#totalActive").html(latestData.Active);
      $("#totalRecovered").html(latestData.Recovered);
      $("#deaths").html(latestData.Deaths);

      chartData = [latestData.Active, latestData.Recovered, latestData.Deaths];
      chartLabels = ["Active", "Recovered", "Deaths"];

      var ctx = document.getElementById("covidChart").getContext("2d");
      chart1 = new Chart(ctx, {
        // Doughnut chart for the categories
        type: "doughnut",
        // The data for our dataset
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "Categories",
              backgroundColor: ["#5DA5DA", "#77dd77", "#ff6961"],
              data: chartData,
            },
          ],
        },
        // Configuration options go here
        options: {
          responsive: true,
        },
      });
    });
}
