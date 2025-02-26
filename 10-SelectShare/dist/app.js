var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import L from 'leaflet';
const form = document.querySelector('form');
const adressInput = document.getElementById('adress');
const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
function searchAddressHandler(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const enteredAddress = adressInput.value;
        // send this to leaflet
        console.log(enteredAddress);
        const response = yield fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${enteredAddress}`);
        const data = yield response.json();
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
        }
        else {
            alert('Address not found!');
        }
    });
}
form.addEventListener('submit', searchAddressHandler);
