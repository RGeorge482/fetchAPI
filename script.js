
const myDiv = document.getElementById("planet");
const myButton = document.getElementById("button");
const mySecondButton = document.getElementById("otherButton");

myButton.addEventListener("click", getPlanet);
mySecondButton.addEventListener("click", getPlanets);


function getPlanet(){
  const randomNum = Math.floor(Math.random() * 10) + 1;
  fetch(`https://swapi.dev/api/planets/${randomNum}/`)
    .then(data => data.json())
    .then(d => populatePlanet(d))
    .catch(err => console.log(err.message));
}

function populatePlanet(planetObj, index) {
  const { name, climate, terrain, population, orbital_period } = planetObj;

  let pop;
  if (population > 0 && population <= 1000000) {
    pop = "low";
  } else if (population > 1000000 && population <= 1000000000) {
    pop = "medium";
  } else if (population > 1000000000) {
    pop = "high";
  } else {
    pop = "unknown";
  }

  const planetDiv = `
  <div class="planet" id=${index} data-population=${pop}>
    <h1 style="text-align:center">${name}</h1>
    <p style="font-size: 20px">
      ${name} has a climate that is ${climate}. The terrain is ${terrain}, with a population
      of ${population === "unknown" ? population : parseInt(population).toLocaleString()}. The
      orbital period is ${orbital_period} days.
    </p>
  </div>
  `
  myDiv.insertAdjacentHTML("beforeend", planetDiv);
}

function getPlanets() {
  fetch(`https://swapi.dev/api/planets/`)
    .then(data => data.json())
    .then(planets => processPlanets(planets.results));
}

function processPlanets(planetsArray) {
  for (const [index, prop] of planetsArray.entries()){
    populatePlanet(prop, index);
  }
}

// unpopulated planets

const highlighter = document.getElementById("highlighter");
highlighter.addEventListener("click", showUnpopulated);

const allPlanetDivs = document.getElementsByClassName("planet");

function showUnpopulated() {
  for (const prop of allPlanetDivs) {
    if (prop.dataset.population === "unknown") {
      prop.style.backgroundColor = "yellow";
    }
  }
}

// drop down menu

const selector = document.getElementById("selector");
selector.addEventListener("change", highlight);

function highlight(e) {
  const { value } = e.target;
  for (const prop of allPlanetDivs) {
    prop.style.background = "#f6d365 ";
    if (prop.dataset.population === value) {
      prop.style.background = "#fda085";
    }
  }
}
