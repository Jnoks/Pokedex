const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const MAX_POKEMON = 1025;

let allPokemon = [];
let listStart = 1;
let listEnd = 20;
let allPokemonNames = [];
let searchCache = {};
let currentList = [];
let currentIndex = 0;

async function init() {
  toggleLoading(true);
  await loadPokemonNames();
  await loadPokemon();
  renderPokemon(allPokemon);
  toggleLoading(false);
}

async function loadPokemonNames() {
  const response = await fetch(BASE_URL + "?limit=" + MAX_POKEMON);
  const data = await response.json();
  allPokemonNames = data.results;
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
  currentList = pokemonList;
  const contentRef = document.getElementById("content");
  let html = "";
  for (let index = 0; index < pokemonList.length; index++) {
    html += pokemonCard(pokemonList[index], index);
  }
  contentRef.innerHTML = html;
}

async function loadMorePokemon() {
  const buttonRef = document.getElementById("loadMoreButton");
  buttonRef.disabled = true;
  toggleLoading(true);
  listStart += 20;
  listEnd = Math.min(listEnd + 20, MAX_POKEMON);
  await loadPokemon();
  renderPokemon(allPokemon);
  toggleLoading(false);
  buttonRef.disabled = false;
  checkLoadMoreEnd();
}

function checkLoadMoreEnd() {
  const buttonRef = document.getElementById("loadMoreButton");
  if (listEnd >= MAX_POKEMON) {
    buttonRef.style.display = "none";
  }
}

async function filterPokemon() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  if (term.length < 3) {
    showAllPokemon();
    return;
  }
  const matches = await getMatchingPokemon(term);
  renderPokemon(matches);
  toggleLoadMore(false);
  showNotFound(matches.length === 0);
}

async function getMatchingPokemon(term) {
  const matchingNames = allPokemonNames.filter((entry) =>
    entry.name.includes(term),
  );
  const matches = [];
  for (const entry of matchingNames) {
    matches.push(await getOrFetchPokemon(entry.name));
  }
  return matches;
}

async function getOrFetchPokemon(name) {
  const loaded = allPokemon.find((pokemon) => pokemon.name === name);
  if (loaded) {
    return loaded;
  }
  if (!searchCache[name]) {
    searchCache[name] = await fetchPokemon(name);
  }
  return searchCache[name];
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

function toggleLoading(visible) {
  const loadingRef = document.getElementById("loadingScreen");
  if (visible) {
    loadingRef.classList.remove("d-none");
  } else {
    loadingRef.classList.add("d-none");
  }
}

function openDetail(index) {
  currentIndex = index;
  renderDetail();
  document.getElementById("detailDialog").showModal();
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  document.getElementById("detailDialog").close();
}

function unlockScroll() {
  document.body.style.overflow = "";
}

function renderDetail() {
  const pokemon = currentList[currentIndex];
  document.getElementById("detailDialog").innerHTML = detailTemplate(pokemon);
}

async function switchDetail(step) {
  currentIndex = currentIndex + step;
  if (currentIndex < 0) {
    currentIndex = currentList.length - 1;
  }
  if (currentIndex >= currentList.length) {
    await handleDetailEnd();
  }
  renderDetail();
}

async function handleDetailEnd() {
  if (currentList === allPokemon && listEnd < MAX_POKEMON) {
    await loadMorePokemon();
  } else {
    currentIndex = 0;
  }
}

init();
