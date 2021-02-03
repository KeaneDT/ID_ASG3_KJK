let map;
let home;
let geocoder;
let userAddress;
let markers = [];

function initMap() {

    //displays a google map
    let center = new google.maps.LatLng(1.3521, 103.8198);
    map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 15,
    });
  
    //User input has autocomplete
    let input = document.getElementById('input');
    let autocomplete = new google.maps.places.Autocomplete(input);
  
    geocoder = new google.maps.Geocoder();
  
    //when user clicks on "locate", marker will be set on the location user has stated
    document.getElementById('submit').addEventListener('click',
    function getPlaces(){
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      userAddress = document.getElementById('input').value;

      geocoder.geocode({address: userAddress}, (results, status) => {
        if(status === 'OK'){
          map.setCenter(results[0].geometry.location);
          let homeMarker = new google.maps.Marker ({
            map: map,
            animation: google.maps.Animation.DROP,
            position: results[0].geometry.location,
          });
        
        }
    })
})
}