// Google Maps API Key
const API_KEY = 'AIzaSyDWxJHTi7pSWPM_2XptEtbT5VTnV-cWj7c';

// Service area locations with coordinates
const locations = [
  { name: 'Fort Myers', lat: 26.6402, lng: -81.8723 },
  { name: 'Cape Coral', lat: 26.5629, lng: -81.9496 },
  { name: 'Port Charlotte', lat: 26.9779, lng: -82.0926 },
  { name: 'Naples', lat: 26.1413, lng: -81.7944 },
  { name: 'Tampa', lat: 27.9506, lng: -82.4580 },
  { name: 'St. Petersburg', lat: 27.7676, lng: -82.6403 },
  { name: 'Pinellas County', lat: 27.8867, lng: -82.6852 },
  { name: 'Sarasota', lat: 27.3364, lng: -82.5306 },
  { name: 'Bradenton', lat: 27.4891, lng: -82.5820 },
  { name: 'Orlando Area', lat: 28.5421, lng: -81.3723 },
  { name: 'West Palm Beach', lat: 26.7153, lng: -80.0534 },
  { name: 'Fort Lauderdale', lat: 26.1224, lng: -80.1373 }
];

// Center of South Florida
const centerLat = 26.9405;
const centerLng = -82.0085;

let map;
let markers = [];

function initMap() {
  // Create the map
  map = new google.maps.Map(document.getElementById('service-map'), {
    zoom: 7,
    center: { lat: centerLat, lng: centerLng },
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#000000' }, { weight: 2 }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#1a5490' }]
      }
    ]
  });

  // Add markers for each location
  locations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name,
      icon: {
        url: 'assets/img/JGpinpoint.png',
        scaledSize: new google.maps.Size(60, 58),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(30, 58)
      }
    });

    markers.push(marker);

    // Add info window on click
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="color: #000; padding: 8px;"><strong>${location.name}</strong></div>`
    });

    marker.addListener('click', () => {
      markers.forEach(m => {
        if (m.infoWindow) m.infoWindow.close();
      });
      infoWindow.open(map, marker);
      marker.infoWindow = infoWindow;
    });
  });
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', initMap);
