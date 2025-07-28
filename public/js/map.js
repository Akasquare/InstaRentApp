//  function initMap() {
//   const listingCoordinates = window.listingCoordinates || { lat: 28.6139, lng: 77.2090 }; // default: Delhi

//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 12,
//     center: listingCoordinates
//   });

//   new google.maps.Marker({
//     position: listingCoordinates,
//     map: map
//   });
// }
let map;

function loadMap(address, title) {
fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const location = data[0];
        const lat = location.lat;
        const lon = location.lon;

        // Example: initialize map (using Leaflet)
        const map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([lat, lon]).addTo(map)
          .bindPopup(title)
          .openPopup();
      } else {
        console.error('No results found for address:', address);
      }
    })
    .catch(error => {
      console.error('Geocoding error:', error);
    })};