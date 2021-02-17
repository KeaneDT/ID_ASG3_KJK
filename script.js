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

  test();

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

  //selects a question
  let quesNo = questionSelector();
  console.log(quesNo);
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
            getData($(".displayHeader").html(), quesNo);
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

function getData(country, quesNo) {
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
      game(quesNo, latestData.Recovered, latestData.Deaths, latestData.Active);

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

function questionSelector(){
  let quesNo = Math.floor((Math.random() * 5) + 1);
  if(quesNo == 1){
    //Country with most recovered cases
    document.getElementById("question").innerHTML = "Select country with most recovered cases";
  }
  else if (quesNo == 2){
    //Country with least recovered cases
    document.getElementById("question").innerHTML = "Select country with least recovered cases";
  }
  else if (quesNo == 3){
    //Country with most deaths
    document.getElementById("question").innerHTML = "Select country with most deaths";
  }
  else if (quesNo == 4){
    //Country with least deaths
    document.getElementById("question").innerHTML = "Select country with least deaths";
  }
  else if (quesNo == 5){
    //Country with most overall cases
    document.getElementById("question").innerHTML = "Select country with most overall cases(including past deaths and recovered cases)";
  }
  return quesNo;
}

function game(test, recovered, deaths, active){
  let noOfTries = 5;
  fetch("https://api.covid19api.com/summary")
  .then((response) => response.json())
  .then((data) => {
    let countriesData = data.Countries;
    if(test == 1){
      if(noOfTries > 0){
        i = 1;
        let answerStatus = true;
        while(i < countriesData.length){
          if(recovered < countriesData[i].TotalRecovered){
            answerStatus = false;
            break;
          }
          i ++;
        }
        console.log(answerStatus);
        if(answerStatus){
          alert("orrect");
          return true;
        }
        else{
          noOfTries --;
          alert("Wrong");
        }

        console.log(noOfTries);
      }
    }
    if(test == 2){
      if(noOfTries > 0){
        i = 1;
        let answerStatus = true;
        while(i < countriesData.length){
          if(recovered > countriesData[i].TotalRecovered){
            answerStatus = false;
            noOfTries --;
            break;
          }
          i ++;
        }
        console.log(answerStatus);
        if(answerStatus){
          alert("Correct");
          return true;
        }
        else{
          noOfTries --;
          alert("Wrong");
        }
      }
    }
    if(test == 3){
      if(noOfTries > 0){
        i = 1;
        let answerStatus = true;
        while(i < countriesData.length){
          if(deaths < countriesData[i].TotalDeaths){
            answerStatus = false;
            noOfTries --;
            break;
          }
          i ++;
        }
        console.log(answerStatus);
        if(answerStatus){
          alert("Correct");
          return true;
        }
        else{
          noOfTries --;
          alert("Wrong");
        }
      }
    }
    if(test == 4){
      if(noOfTries > 0){
        i = 1;
        let answerStatus = true;
        while(i < countriesData.length){
          if(deaths > countriesData[i].TotalDeaths){
            answerStatus = false;
            noOfTries --;
            break;
          }
          i ++;
        }
        console.log(answerStatus);
        if(answerStatus){
          alert("Correct");
          return true;
        }
        else{
          noOfTries --;
          alert("Wrong");
        }
      }
    }
    if(test == 5){
      if(noOfTries > 0){
        i = 1;
        let answerStatus = true;
        let total = active + deaths + recovered;
        while(i < countriesData.length){
          if(total < countriesData[i].Totalconfirmed){
            answerStatus = false;
            noOfTries --;
            break;
          }
          i ++;
        }
        console.log(answerStatus);
        if(answerStatus){
          alert("Correct");
          return true;
        }
        else{
          noOfTries --;
          alert("Wrong");
        }
      }
    }
  })
}

//Ignore this. It is just to find out the answer for the ques
function test(){
  fetch("https://api.covid19api.com/summary")
  .then((response) => response.json())
  .then((data) => {
    let countriesData = data.Countries;
    let i = 1;
    let max = 0;
    let maxCountry = "";
    while(i < countriesData.length){
      if(countriesData[i].TotalConfirmed > max){
        max = countriesData[i].TotalRecovered;
        maxCountry = countriesData[i].Country;
      }
      i++;
    }
    console.log(max);
    console.log(maxCountry);
  })
}

