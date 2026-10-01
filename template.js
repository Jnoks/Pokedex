function pokemonCard(pokemon, index) {
  const mainType = pokemon.types[0].type.name;
  return `
    <button class="card type-${mainType}" onclick="openDetail(${index})">
      <span class="card-id">#${pokemon.id}</span>
      <img src="${getImageUrl(pokemon.id)}" alt="${pokemon.name}" />
      <span class="card-name">${pokemon.name}</span>
      <span class="type-badges">${typeBadges(pokemon)}</span>
    </button>
  `;
}

function typeBadges(pokemon) {
  let badges = "";
  for (const typeInfo of pokemon.types) {
    const typeName = typeInfo.type.name;
    badges += `<span class="badge"><img class="type-${typeName}" src="./assets/icons/types/${typeName}.svg" alt="" />${typeName}</span>`;
  }
  return badges;
}

function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${id}.png`;
}

function notFoundTemplate() {
  return `<p class="not-found">No Pokémon found</p>`;
}

function detailTemplate(pokemon) {
  const mainType = pokemon.types[0].type.name;
  return `
    <section class="device">
      <span class="card-id">#${pokemon.id}</span>
      <div class="device-screen">
        <img src="${getImageUrl(pokemon.id)}" alt="${pokemon.name}" />
      </div>
      ${detailInfoTemplate(pokemon, mainType)}
    </section>
  `;
}

function detailInfoTemplate(pokemon, mainType) {
  return `
    <div class="device-info">
      <h2>${pokemon.name}</h2>
      <span class="type-badges">${typeBadges(pokemon)}</span>
      ${statBar("HP", pokemon.stats[0].base_stat, mainType)}
      ${statBar("Attack", pokemon.stats[1].base_stat, mainType)}
      ${statBar("Defense", pokemon.stats[2].base_stat, mainType)}
      <div class="device-nav">
        <button onclick="switchDetail(-1)">&#9664;</button>
        <button onclick="closeDetail()">Close</button>
        <button onclick="switchDetail(1)">&#9654;</button>
      </div>
    </div>
  `;
}

function statBar(label, value, mainType) {
  const width = (Math.min(value, 150) / 150) * 100;
  return `
    <div class="stat-row">
      <span class="stat-label">${label}</span>
      <div class="stat-track"><div class="stat-fill type-${mainType}" style="width: ${width}%"></div></div>
      <span class="stat-value">${value}</span>
    </div>
  `;
}
