import L from 'leaflet';

const form = document.querySelector('form')! as HTMLFormElement;
const adressInput = document.getElementById('adress')! as HTMLInputElement;


const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
async function searchAddressHandler(event: Event) {
  event.preventDefault();
 const enteredAddress = adressInput.value;
 // send this to leaflet
 console.log(enteredAddress);

 const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${enteredAddress}`);
 const data = await response.json();

 console.log(data);
 if (data.length > 0) {
    const { lat, lon } = data[0]; // Get latitude and longitude of the first result

    // Clear any previous markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add a marker at the searched location
    L.marker([lat, lon]).addTo(map)
      .bindPopup(`<b>Address:</b><br>${enteredAddress}`)
      .openPopup();

    // Center the map on the searched location
    map.setView([lat, lon], 13);
  } else {
    alert('Address not found!');
  }
}
form.addEventListener('submit', searchAddressHandler)