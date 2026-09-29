const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const MAX_POKEMON = 151;

let allPokemon = [];
let listStart = 1;
let listEnd = 20;

async function init() {
  await loadPokemon();
  renderPokemon();
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

function renderPokemon() {
  const contentRef = document.getElementById("content");
  let html = "";
  for (const pokemon of allPokemon) {
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
  renderPokemon();
  buttonRef.disabled = false;
  checkLoadMoreEnd();
}

function checkLoadMoreEnd() {
  const buttonRef = document.getElementById("loadMoreButton");
  if (listEnd >= MAX_POKEMON) {
    buttonRef.style.display = "none";
  }
}

init();
