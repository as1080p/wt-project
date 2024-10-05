// OMDb API configuration
const API_KEY = 'ea050c77'; // This is your actual API key
const BASE_URL = 'https://www.omdbapi.com/';

// MovieLens dataset (sample data)
const movieLensData = [
    { title: "Toy Story", year: 1995, genre: "Animation, Adventure, Comedy", rating: 8.3 },
    { title: "Jumanji", year: 1995, genre: "Adventure, Family, Fantasy", rating: 6.9 },
    { title: "Grumpier Old Men", year: 1995, genre: "Comedy, Romance", rating: 6.6 },
    { title: "Waiting to Exhale", year: 1995, genre: "Comedy, Drama, Romance", rating: 5.7 },
    { title: "Father of the Bride Part II", year: 1995, genre: "Comedy, Family, Romance", rating: 5.9 }
];

function searchMovies() {
    const searchTerm = document.getElementById('movie-search').value;
    if (searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        
        // Create a script element
        const script = document.createElement('script');
        script.src = `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(searchTerm)}&callback=handleResponse`;
        document.body.appendChild(script);
        
        // Remove the script element after it's loaded
        script.onload = function() {
            document.body.removeChild(script);
        };
    }
}

// Callback function to handle the JSONP response
function handleResponse(data) {
    console.log('API Data:', data);
    if (data.Response === "True") {
        displayMovie(data);
    } else {
        // If OMDb API fails, search in MovieLens dataset
        const movieLensResult = searchMovieLens(document.getElementById('movie-search').value);
        if (movieLensResult) {
            displayMovieLens(movieLensResult);
        } else {
            displayError("Movie not found in OMDb or MovieLens dataset.");
        }
    }
}

function searchMovieLens(searchTerm) {
    return movieLensData.find(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function displayMovie(movie) {
    const movieContainer = document.createElement('div');
    movieContainer.className = 'movie-result';
    
    movieContainer.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450.png?text=No+Poster'}" alt="${movie.Title} Poster" class="img-fluid rounded">
            </div>
            <div class="col-md-8">
                <h2 class="mb-3">${movie.Title} <span class="text-muted">(${movie.Year})</span></h2>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>IMDb Rating:</strong> <span class="badge bg-warning text-dark">${movie.imdbRating}/10</span></p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Runtime:</strong> ${movie.Runtime}</p>
            </div>
        </div>
    `;
    
    updateResults(movieContainer);
}

function displayMovieLens(movie) {
    const movieContainer = document.createElement('div');
    movieContainer.className = 'movie-result';
    
    movieContainer.innerHTML = `
        <div class="row">
            <div class="col-md-12">
                <h2 class="mb-3">${movie.title} <span class="text-muted">(${movie.year})</span></h2>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Rating:</strong> <span class="badge bg-warning text-dark">${movie.rating}/10</span></p>
                <p class="text-muted"><em>Note: This data is from the MovieLens dataset.</em></p>
            </div>
        </div>
    `;
    
    updateResults(movieContainer);
}

function displayError(error) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message alert alert-danger';
    errorContainer.textContent = `Error: ${error}`;
    
    updateResults(errorContainer);
}

function updateResults(newContent) {
    const resultsSection = document.querySelector('.search-section');
    const existingResults = document.querySelector('.movie-result, .error-message');
    if (existingResults) {
        resultsSection.removeChild(existingResults);
    }
    resultsSection.appendChild(newContent);
}

// Background image changer
const backgroundImages = [
    'https://www.cinejosh.com/newsimg/newsmainimg/bhool-bhulaiyaa-3-teaser-hints-more-darker-forces_b_2709240348.jpg',
    'https://imgs.search.brave.com/QJbEcvIhuCDtDBX7g6mZOBmg68ZS6-mNMS-o1DnqfCY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLm1vdmlld2Vi/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMDcv/UlJSLTEtMS5qcGVn',
    'https://imgs.search.brave.com/4weoirRZ9sAy2ZrskIBzZXBiZdrvGWGRzvwkaKRYbz4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ha20t/aW1nLWEtaW4udG9z/c2h1Yi5jb20vaW5k/aWF0b2RheS9pbWFn/ZXMvc3RvcnkvMjAy/NDA5L250cnMtZmls/bS1kZXZhcmEtMTg1/ODAzNTk3LTE2eDku/anBnP1ZlcnNpb25J/ZD1Gdzg3LmJ1SU5h/VTZuVkhNbG9BTE5a/Ri5iZnJWZlRkVCZz/aXplPTY5MDozODg'
];

let currentImageIndex = 0;

function changeBackgroundImage() {
    const backgroundContainer = document.getElementById('background-container');
    backgroundContainer.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
}

// Change background image every 10 seconds
setInterval(changeBackgroundImage, 10000);

// Set initial background image
changeBackgroundImage();

// Modal functionality
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const closeBtns = document.getElementsByClassName("close");

loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

signupBtn.onclick = function() {
    signupModal.style.display = "block";
}

for (let closeBtn of closeBtns) {
    closeBtn.onclick = function() {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == loginModal || event.target == signupModal) {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
    }
}

document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();
    // Implement login functionality here
    alert("Login functionality to be implemented");
    loginModal.style.display = "none";
}

document.getElementById("signupForm").onsubmit = function(e) {
    e.preventDefault();
    // Implement sign up functionality here
    alert("Sign up functionality to be implemented");
    signupModal.style.display = "none";
}

// Add this function at the end of the script.js file
function initializeNavigation() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavigation);