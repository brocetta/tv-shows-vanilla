const main = document.querySelector("main");
const div = document.createElement("div");
const main2 = document.querySelector(".main2");
const h3 = document.createElement("h3");
const input = document.querySelector("input");
const search = document.querySelector(".search");
const ul = document.querySelector(".ul");
const btn = document.querySelector(".heading");

const image = document.createElement("img");
const name = document.createElement("h2");
const details = document.createElement("div");
const seasons = document.createElement("div");
const cast = document.createElement("div");
const movieDetails = document.createElement("h3");
const box = document.createElement("div");

h3.innerHTML = "Popular Shows";
h3.style.color = "black";
main.prepend(h3);

btn.onclick = function () {
  window.location.href = "/index.html";
};

input.addEventListener("keyup", function () {
  const searchValue = this.value.toLowerCase();
  if (searchValue.length === 0) {
    document.querySelector("main").innerHTML = ""
    fetch("https://api.tvmaze.com/shows").then((res) =>
      res
        .json()
        .then((res) =>
          res.sort((a, b) => b.rating.average - a.rating.average).slice(0, 51)
        )
        .then((res) => {
          renderMovies(res);
        })
    );
  } else {
    const filteredMovies = Array.from(
      document.querySelectorAll(".movie")
    ).filter((movie) => {
      return movie
        .querySelector("h2")
        .textContent.toLowerCase()
        .includes(searchValue);
    });
    document.querySelector("main").innerHTML = "";
    filteredMovies.forEach((movie) => {
      document.querySelector("main").append(movie);
    });
  }
});



fetch("https://api.tvmaze.com/shows").then((res) =>
  res
    .json()
    .then((res) =>
      res.sort((a, b) => b.rating.average - a.rating.average).slice(0, 51)
    )
    .then((res) => {
      renderMovies(res);
    })
);

function renderMovies(res) {
  // for (let i = 0; i < res.length; i++) {
  res.forEach((elem) => {
    const movie = document.createElement("div");
    const name = document.createElement("h2");
    const image = document.createElement("img");
    movie.className = "col-12 col-md-6 col-lg-4 movie";
    movie.id = elem.id;
    // console.log(res);
    image.src = elem.image.medium;
    name.textContent = elem.name;
    movie.addEventListener("click", () => {
      renderSingleMovie(elem);
      fetchSeasons(elem.id);
      fetchCast(elem.id);
    });
    movie.append(image);
    movie.append(name);
    movie.addEventListener("click", () => {
      main.style.display = "none";
      main2.style.display = "block";
    });
    document.querySelector("main").append(movie);
  });
}

function renderSingleMovie(res) {
  details.className = "details";
  seasons.className = "col-lg-5 col-md-12 seasons";
  cast.className = "col-12 cast";
  image.className = "col-lg-7 col-md-12";
  box.className = "row col-12";

  // image.style.margin = "20px";
  image.style.borderRadius = "20px";
  image.style.height = "100%";
  // name.style.margin = "20px";
  cast.style.marginTop = "20px";

  // box.style.border = "1px solid red";

  image.src = res.image.medium;
  name.textContent = res.name;
  movieDetails.innerHTML = "Details";
  movieDetails.style.textAlign = "left";
  details.innerHTML = res.summary;

  box.append(image);
  main2.append(box);
  main2.prepend(name);
  main2.append(details);
  details.prepend(movieDetails);
}

function fetchCast(id) {
  fetch(` https://api.tvmaze.com/shows/${id}/cast`)
    .then((res) => res.json())
    .then((res) => {
      renderCast(res);
    });
}

function renderCast(res) {
  console.log(res);
  for (let i = 0; i < 10; i++) {
    const listItem = document.createElement("li");
    cast.append(listItem);
    listItem.innerHTML += `${res[i].person.name}`;
  }
  const movieCast = document.createElement("h3");
  movieCast.style.textAlign = "left";
  movieCast.innerHTML = `Cast`;
  // cast.style.overflow = "scroll"
  // cast.style.height = '300px'
  cast.prepend(movieCast);
  seasons.append(cast);
}

function fetchSeasons(id) {
  fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
    .then((res) => res.json())
    .then((res) => {
      let counter = 0;
      for (let i = 0; i < res.length; i++) {
        const listItem = document.createElement("li");
        seasons.append(listItem);
        listItem.innerHTML += `${res[i].premiereDate}  -  ${res[i].endDate}`;
        counter++;
      }
      const movieSeasons = document.createElement("h3");
      movieSeasons.style.textAlign = "left";
      movieSeasons.innerHTML = `Seasons (${counter})`;
      seasons.prepend(movieSeasons);
      box.append(seasons);
    });
}

input.addEventListener("keypress", (event) => {
  ul.innerHTML = "";
  fetchData(input.value);
});

function fetchData(str) {
  fetch("https://api.tvmaze.com/search/shows?q=" + str)
    .then((res) => res.json())
    .then((res) => napraviMeni(res));
}

function napraviMeni(res) {
  for (let i = 0; i < 10; i++) {
    // listItem.style.position = 'absolute';
    // listItem.style.bottom

    const listItem = document.createElement("li");

    listItem.innerHTML = res[i].show.name;
    listItem.style.backgroundColor = "grey";
    listItem.style.padding = "10px";
    ul.append(listItem);
  }
}
