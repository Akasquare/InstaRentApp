 function initMap() {
  const listingCoordinates = window.listingCoordinates || { lat: 28.6139, lng: 77.2090 }; // default: Delhi

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: listingCoordinates
  });

  new google.maps.Marker({
    position: listingCoordinates,
    map: map
  });
}
