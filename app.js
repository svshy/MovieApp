const API_KEY = `api_key=874160dc915f20bf507857b22f4909ea`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL_NOW_PLAYING = BASE_URL + `/movie/now_playing?` + API_KEY;
const IMG_URL = `https://image.tmdb.org/t/p/w500/`;
const movies = document.querySelectorAll(`.movie-list`);
const elementsByPage = 20;
const arrowFeaturedContent = document.querySelector(".arrow-featured-content");
const featuredContent = document.getElementById("content-container");
const featuredContentItems = document.querySelectorAll(".featured-content");
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-containter,.movie-list-item-desc,.movie-list-item-title,.toggle,.arrow"
);
const arrows = document.querySelectorAll(".arrow");

const API_URL_FANTASY_BEST =
  "https://api.themoviedb.org/3/discover/movie?api_key=874160dc915f20bf507857b22f4909ea&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=300&with_genres=14&with_original_language=en&with_watch_monetization_types=flatrate";

getMovies(API_URL_NOW_PLAYING, 0);
getMovies(API_URL_FANTASY_BEST, 1);

function getMovies(url, indexOfDiv) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results, indexOfDiv);
    });
}

function showMovies(data, indexOfDiv) {
  movies[indexOfDiv].innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;
    const movieEl = document.createElement(`div`);

    movieEl.classList.add("movie-list-item");
    movieEl.innerHTML = `
      <img
        src="${IMG_URL + poster_path}"
        alt="${title}"
        class="movie-list-item-img"
      />
      <span class="movie-list-item-title">${title}</span>
      <p class="movie-list-item-desc">
      ${overview.length >= 400 ? overview.slice(0, 400) + "..." : overview}
      </p>
      <span class="movie-list-item-vote-average">${
        vote_average === 0 ? "NR" : vote_average
      }</span>
      <button class="movie-list-item-btn">Watch!</button>
    `;
    movies[indexOfDiv].appendChild(movieEl);
  });
}

arrows.forEach((arrow, i) => {
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    clickCounter++;
    const ratio = Math.floor(window.innerWidth / 300);
    if (elementsByPage - (ratio + clickCounter) >= 0) {
      movies[i].style.transform = `translateX(${-300 * clickCounter}px)`;
    } else {
      movies[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

let clickCounter = 0;
arrowFeaturedContent.addEventListener("click", () => {
  clickCounter++;
  if (clickCounter < featuredContentItems.length) {
    featuredContent.style.transform = `translateX(-${100 * clickCounter}%)`;
  } else {
    featuredContent.style.transform = `translateX(0)`;
    clickCounter = 0;
  }
});
