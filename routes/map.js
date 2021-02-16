// Initialize and add the map
function initMap() {
  // The location of Uluru
  const bellingham = { lat: 48.7519, lng: -122.4787 };
  const happyvalley = { lat: 48.758328, lng: -122.463429 };
  const fairhaven = { lat: 48.71749713, lng: -122.504164 };
  const westernwa = { lat: 48.73392, lng: -122.487075 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: bellingham,
  });
  const marker1 = new google.maps.Marker({
  position: happyvalley,
  map: map,
  title:"Happy Valley Mutual Aid"
});
const marker2 = new google.maps.Marker({
  position: fairhaven,
  map: map,
  title:"Fairhaven Mutual Aid"
});
const marker3 = new google.maps.Marker({
  position: westernwa,
  map: map,
  title:"Student Mutual Aid"
});
}
