$(".buyBadge").click(purchaseBadge);
$(".refreshBadge").click(loadBadge);

let map;
let home;
let geocoder;
let userAddress;
let markers = [];

let points = 999;
let checkPurchase = 0;

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

  //selects a question
  let quesNo = questionSelector();
  //console.log("Question Number: " + quesNo);
  infoWindow.open(map);
  let noOfTries = 5;
  document.getElementById("noOfTries").innerHTML =
    "No of tries left: " + noOfTries;
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
            getData($(".displayHeader").html(), quesNo, noOfTries);
            if (noOfTries > 0) {
              noOfTries--;
            } else {
              alert("You have no tries left! Please refresh the page!");
              addPoints(0);
            }
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

//Change point value (currently 999) to final value
function purchaseBadge() {
  if (checkPurchase < 5) {
    if (points < 50) {
      alert("You have insufficient points!");
    } else if (points >= 50) {
      var r = confirm(
        "Clicking OK will purchase a badge. Are you sure you want to continue?"
      );
      if (r == true) {
        points -= 50;
        checkPurchase += 1;
        if (checkPurchase == 5) {
          alert("Congratulations you have gotten all 5 badges!");
          $(".buyBadge").css("background-color", "Gray");
          $(".buyBadge").empty();
          $(".buyBadge").append("Sold Out");
        }
      }
    }
  } else {
    alert("Congratulations you have gotten all 5 badges!");
    $(".buyBadge").css("background-color", "Gray");
    $(".buyBadge").empty();
    $(".buyBadge").append("Sold Out");
  }
}

function loadBadge() {
  $(".refreshBadge").html("Refresh Badges");
  if (checkPurchase == 0) {
    alert("You have not purchased any badges! Load Data or Play Some More!");
  } else if (checkPurchase == 1) {
    $(".badgeOne").show();
  } else if (checkPurchase == 2) {
    $(".badgeOne").show();
    $(".badgeTwo").show();
  } else if (checkPurchase == 3) {
    $(".badgeOne").show();
    $(".badgeTwo").show();
    $(".badgeThree").show();
  } else if (checkPurchase == 4) {
    $(".badgeOne").show();
    $(".badgeTwo").show();
    $(".badgeThree").show();
    $(".badgeFour").show();
  } else if (checkPurchase == 5) {
    $(".badgeOne").show();
    $(".badgeTwo").show();
    $(".badgeThree").show();
    $(".badgeFour").show();
    $(".badgeFive").show();
  }
}

function getData(country, quesNo, noOfTries) {
  $("#totalActive").empty();
  $("#totalRecovered").empty();
  $("#deaths").empty();

  if (
    country == "United States" ||
    country == "United Kingdom" ||
    country == "China" ||
    country == "Australia"
  ) {
    // add code here
    var d = new Date();

    var fromDate = d.getDate() - 2;
    var toDate = d.getDate() - 1;
    var currentMonth = d.getMonth() + 1;

    axios({
      method: "get",
      url:
        "https://api.covid19api.com/country/" +
        country +
        "?from=" +
        d.getFullYear() +
        "-" +
        currentMonth +
        "-" +
        fromDate +
        "T00:00:00Z&to=" +
        d.getFullYear() +
        "-" +
        currentMonth +
        "-" +
        toDate +
        "T00:00:00Z",
    }).then((data) => {
      var active = 0;
      var recovered = 0;
      var deaths = 0;
      var i;
      for (i = 0; i < data.data.length; i++) {
        active += data.data[i].Active;
        recovered += data.data[i].Recovered;
        deaths += data.data[i].Deaths;
      }
      //For some reason US numbers are twice the actual number
      if (country == "United States") {
        active = Math.round(active / 2);
        recovered = Math.round(recovered / 2);
        deaths = Math.round(deaths / 2);
      }

      $("#totalActive").html(active);
      $("#totalRecovered").html(recovered);
      $("#deaths").html(deaths);
      chartData = [active, recovered, deaths];
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
      game(noOfTries, quesNo, recovered, deaths, active);
    });
  } else {
    axios({
      method: "get",
      url: "https://api.covid19api.com/country/" + country,
    }).then((data) => {
      let latestData = data.data[data.data.length - 1];
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
      game(
        noOfTries,
        quesNo,
        latestData.Recovered,
        latestData.Deaths,
        latestData.Active
      );
    });
  }
  if ($("#totalActive").is(":empty")) {
    $("#totalActive").html("Unknown");
    $("#totalRecovered").html("Unknown");
    $("#deaths").html("Unknown");
  }
}

function questionSelector() {
  let quesNo = Math.floor(Math.random() * 5 + 1);
  if (quesNo == 1) {
    //Country with most recovered cases
    document.getElementById("question").innerHTML =
      "Select country with most recovered cases";
  } else if (quesNo == 2) {
    //Country with least recovered cases
    document.getElementById("question").innerHTML =
      "Select country with least recovered cases";
  } else if (quesNo == 3) {
    //Country with most deaths
    document.getElementById("question").innerHTML =
      "Select country with most deaths";
  } else if (quesNo == 4) {
    //Country with least deaths
    document.getElementById("question").innerHTML =
      "Select country with least deaths";
  } else if (quesNo == 5) {
    //Country with most overall cases
    document.getElementById("question").innerHTML =
      "Select country with most overall cases (including past deaths and recovered cases)";
  }
  return quesNo;
}

function game(noOfTries, quesNo, recovered, deaths, active) {
  axios({
    method: "get",
    url: "https://api.covid19api.com/summary",
  }).then((main) => {
    let countriesData = main.data.Countries;
    if (noOfTries > 0) {
      if (quesNo == 1) {
        i = 1;
        let answerStatus = true;
        while (i < countriesData.length) {
          if (recovered < countriesData[i].TotalRecovered) {
            answerStatus = false;
            break;
          }
          i++;
        }
        if (answerStatus) {
          alert(
            "You got the answer correct! Please refresh the page for another question"
          );
          addPoints(noOfTries);
        } else {
          alert("You got the answer wrong! Please try again!");
          noOfTries--;
          document.getElementById("noOfTries").innerHTML =
            "No of tries left: " + noOfTries;
        }
      } else if (quesNo == 2) {
        i = 1;
        let answerStatus = true;
        while (i < countriesData.length) {
          if (recovered > countriesData[i].TotalRecovered) {
            answerStatus = false;
            break;
          }
          i++;
        }
        if (answerStatus) {
          alert(
            "You got the answer correct! Please refresh the page for another question"
          );
          addPoints(noOfTries);
        } else {
          alert("You got the answer wrong! Please try again!");
          noOfTries--;
          document.getElementById("noOfTries").innerHTML =
            "No of tries left: " + noOfTries;
        }
      } else if (quesNo == 3) {
        i = 1;
        let answerStatus = true;
        while (i < countriesData.length) {
          if (deaths < countriesData[i].TotalDeaths) {
            answerStatus = false;
            break;
          }
          i++;
        }
        if (answerStatus) {
          alert(
            "You got the answer correct! Please refresh the page for another question"
          );
          addPoints(noOfTries);
        } else {
          alert("You got the answer wrong! Please try again!");
          noOfTries--;
          document.getElementById("noOfTries").innerHTML =
            "No of tries left: " + noOfTries;
        }
      } else if (quesNo == 4) {
        i = 1;
        let answerStatus = true;
        while (i < countriesData.length) {
          if (deaths > countriesData[i].TotalDeaths) {
            answerStatus = false;
            break;
          }
          i++;
        }
        if (answerStatus) {
          alert(
            "You got the answer correct! Please refresh the page for another question"
          );
          addPoints(noOfTries);
        } else {
          alert("You got the answer wrong! Please try again!");
          noOfTries--;
          document.getElementById("noOfTries").innerHTML =
            "No of tries left: " + noOfTries;
        }
      } else if (quesNo == 5) {
        i = 1;
        let answerStatus = true;
        let total = active + deaths + recovered;
        while (i < countriesData.length) {
          if (total < countriesData[i].TotalConfirmed) {
            answerStatus = false;
            break;
          }
          i++;
        }
        if (answerStatus) {
          alert("You got the answer correct!");
          addPoints(noOfTries);
          $("#question").empty();
        } else {
          alert("You got the answer wrong! Please try again!");
          noOfTries--;
          document.getElementById("noOfTries").innerHTML =
            "No of tries left: " + noOfTries;
        }
      }
    }
  });
}

function addPoints(tries) {
  storedPoints = localStorage.getItem("Points");
  storedPurchase = localStorage.getItem("Purchase");

  if ("Points" in localStorage) {
    points = localStorage.getItem("Points");
    checkPurchase = localStorage.getItem("Purchase");

    points += tries * 10;
    localStorage.clear();

    localStorage.setItem("Points", points);
    localStorage.setItem("Purchase", checkPurchase);
  } else {
    points += tries * 10;
    localStorage.setItem("Points", points);
    localStorage.setItem("Purchase", checkPurchase);
  }

  // if (localStorage.points) {
  //   localStorage.points = Number(localStorage.points) + tries * 10;
  //   console.log(localStorage.points);
  // } else {
  //   localStorage.points = tries * 10;
  //   console.log(localStorage.points);
  // }
}

//Ignore this. It is just to find out the answer for the ques
function tester() {
  fetch("https://api.covid19api.com/summary")
    .then((response) => response.json())
    .then((data) => {
      let countriesData = data.Countries;
      let i = 1;
      let max = 0;
      let maxCountry = "";
      while (i < countriesData.length) {
        if (countriesData[i].TotalConfirmed > max) {
          max = countriesData[i].TotalConfirmed;
          maxCountry = countriesData[i].Country;
        }
        i++;
      }
      console.log(max);
      console.log(maxCountry);
    });
}

if ($("#question").is(":empty")) {
  $("#question").append("Please refresh the page");
}
