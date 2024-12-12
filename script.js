// Define the global array to hold planet data
let planets = [];

// Load planet data from the local JSON file
function loadPlanetData() {
    fetch('exoplanet.json') 
        .then(response => response.json()) 
        .then(data => {
            planets = data; 
            populateDropdown(); 
        })
        .catch(error => {
            console.error('Error loading planet data:', error); 
        });
}

const resultsContainer = document.getElementById("results-container");
const datalist = document.getElementById("planet-list");
const searchInput = document.getElementById("search");

// Populate the dropdown menu
function populateDropdown() {
    datalist.innerHTML ='';
    planets.forEach(planet => {
        const option = document.createElement("option");
        option.value = planet.name;
        datalist.appendChild(option);
    });
}

function showDropdown() {
    const searchInput = document.getElementById("search");
    searchInput.value = '';
    searchInput.focus();  
}

// Display search results
function searchPlanet() {
    const query = searchInput.value.toLowerCase();
    const result = planets.find(planet => planet.name.toLowerCase() === query);

    if (result) {
        resultsContainer.innerHTML = `
            <div>
                <h3>${result.name}</h3>
                <p><strong>Radius:</strong> ${result.radius} km</p>
                <p><strong>Distance:</strong> ${result.distance} light-years</p>
            </div>
            <div>
                <p><strong>Description:</strong> ${result.description}</p>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = "<p>No results found</p>";
    }
}

// Apply filters
function applyFilters() {
    const maxDistance = document.getElementById("distance").value;
    const maxRadius = document.getElementById("radius").value;

    const filteredPlanets = planets.filter(planet => 
        planet.distance <= maxDistance && planet.radius <= maxRadius
    );

    if (filteredPlanets.length > 0) {
        resultsContainer.innerHTML = filteredPlanets.map(planet => `
            <div>
                <h3>${planet.name}</h3>
                <p><strong>Radius:</strong> ${planet.radius} km</p>
                <p><strong>Distance:</strong> ${planet.distance} light-years</p>
                <p><strong>Description:</strong> ${planet.description}</p>
            </div>
        `).join("");
    } else {
        resultsContainer.innerHTML = "<p>No results found</p>";
    }
}

// Update slider value dynamically
function updateSliderValue(sliderId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(`${sliderId}-value`);
    valueDisplay.textContent = slider.value;
}

// Function to adjust slider value
function adjustSliderValue(sliderId, increment) {
    const slider = document.getElementById(sliderId);
    const newValue = Math.min(
        Math.max(Number(slider.value) + increment, slider.min),
        slider.max
    );
    slider.value = newValue;
    updateSliderValue(sliderId);
}

// Initialize the app
window.onload = () => {
    loadPlanetData();
};
