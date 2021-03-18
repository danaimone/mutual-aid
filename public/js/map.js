// Initialize and add the map
function initMap() {
  // The location of Uluru
  const bellingham = { lat: 48.7519, lng: -122.4787 };
  const happyvalley = { lat: 48.758328, lng: -122.463429 };
  const fairhaven = { lat:48.77019, lng:-122.507054};
  const westernwa = { lat: 48.73392, lng: -122.487075 };
  const bop = { lat: 48.755247, lng: -122.4788316 };
  const whatcom = { lat: 48.75654, lng: -122.479057 };
  const sunny = { lat: 48.7603278, lng: -122.470109 };
  const wagon = { lat: 48.749583, lng: -122.477269 };
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
    title:"Birchwood Mutual Aid"
  });
  const marker3 = new google.maps.Marker({
    position: westernwa,
    map: map,
    title:"Student Mutual Aid"
  });
  const marker4 = new google.maps.Marker({
    position: bop,
    map: map,
    title:"BOP Mutual Aid"
  });
  const marker5 = new google.maps.Marker({
    position: whatcom,
    map: map,
    title:"Whatcom Mutual Aid"
  });

  const marker6 = new google.maps.Marker({
    position: sunny,
    map: map,
    title:"Sunnyland Mutual Aid"
  });
  const marker7 = new google.maps.Marker({
    position: wagon,
    map: map,
    title:"Wagon Brigade"
  });

  //add onClick Listeners to re-direct to info pages
  google.maps.event.addListener(marker1, 'click', function() {window.location.href = 'https://www.instagram.com/happyvalleymutualaid';});
  google.maps.event.addListener(marker3, 'click', function() {window.location.href = 'https://www.instagram.com/whatcomstudentmutualaid';});
  google.maps.event.addListener(marker2, 'click', function() {window.location.href = 'https://www.facebook.com/groups/birchwoodsupport';});
  google.maps.event.addListener(marker4, 'click', function() {window.location.href = 'https://www.instagram.com/bopmutualaid';});
  google.maps.event.addListener(marker5, 'click', function() {window.location.href = 'https://www.facebook.com/groups/2466079660320179/';});
  google.maps.event.addListener(marker6, 'click', function() {window.location.href = 'https://sunnylandmutualaid.carrd.co/';});
  google.maps.event.addListener(marker7, 'click', function() {window.location.href = 'https://www.instagram.com/the.mawb';});
}
