const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const MAX_POKEMON = 151;

let allPokemon = [];
let listStart = 1;
let listEnd = 20;

async function init() {
  await loadPokemon();
  renderPokemon(allPokemon);
}

async function loadPokemon() {
  const promises = [];
  for (let id = listStart; id <= listEnd; id++) {
    promises.push(fetchPokemon(id));
  }
  const newPokemon = await Promise.all(promises);
  allPokemon = allPokemon.concat(newPokemon);
}

async function fetchPokemon(id) {
  const response = await fetch(BASE_URL + id);
  return await response.json();
}

function renderPokemon(pokemonList) {
  const contentRef = document.getElementById("content");
  let html = "";
  for (const pokemon of pokemonList) {
    html += pokemonCard(pokemon);
  }
  contentRef.innerHTML = html;
}

async function loadMorePokemon() {
  const buttonRef = document.getElementById("loadMoreButton");
  buttonRef.disabled = true;
  listStart += 20;
  listEnd = Math.min(listEnd + 20, MAX_POKEMON);
  await loadPokemon();
  renderPokemon(allPokemon);
  buttonRef.disabled = false;
  checkLoadMoreEnd();
}

function checkLoadMoreEnd() {
  const buttonRef = document.getElementById("loadMoreButton");
  if (listEnd >= MAX_POKEMON) {
    buttonRef.style.display = "none";
  }
}

function filterPokemon() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  if (term.length < 3) {
    showAllPokemon();
    return;
  }
  const matches = allPokemon.filter((pokemon) => pokemon.name.includes(term));
  renderPokemon(matches);
  toggleLoadMore(false);
  showNotFound(matches.length === 0);
}

function showAllPokemon() {
  renderPokemon(allPokemon);
  toggleLoadMore(true);
  showNotFound(false);
}

function toggleLoadMore(visible) {
  const buttonRef = document.getElementById("loadMoreButton");
  if (visible && listEnd < MAX_POKEMON) {
    buttonRef.style.display = "block";
  } else {
    buttonRef.style.display = "none";
  }
}

function showNotFound(visible) {
  if (visible) {
    document.getElementById("content").innerHTML = notFoundTemplate();
  }
}

init();
