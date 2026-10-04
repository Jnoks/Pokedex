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
  return `
    <section class="device">
      <div class="device-left">
        <div class="device-top">
          <div class="pokedex-lens"></div>
          <div class="pokedex-leds"><span></span><span></span><span></span></div>
        </div>
        <div class="lcd-frame">
          <div class="lcd-screen">
            <img src="${getImageUrl(pokemon.id)}" alt="${pokemon.name}" />
            <div class="lcd-data">
              <p class="lcd-name">${pokemon.name}</p>
              <p>No. ${pokemon.id}</p>
              <p>HT ${pokemon.height / 10} m</p>
              <p>WT ${pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>
        <div class="device-controls">
          <button class="dpad-button" onclick="switchDetail(-1)">&#9664;</button>
          <span class="flat-button flat-red"></span>
          <span class="flat-button flat-blue"></span>
          <button class="dpad-button" onclick="switchDetail(1)">&#9654;</button>
        </div>
      </div>
      <div class="device-right">
        <button class="device-close" onclick="closeDetail()">&#10005;</button>
        <div class="text-screen">
          <span class="type-badges">${typeBadges(pokemon)}</span>
          ${statBar("HP", pokemon.stats[0].base_stat)}
          ${statBar("ATK", pokemon.stats[1].base_stat)}
          ${statBar("DEF", pokemon.stats[2].base_stat)}
        </div>
        <div class="keypad">${keypadTemplate()}</div>
      </div>
    </section>
  `;
}

function keypadTemplate() {
  let keys = "";
  for (let keyIndex = 0; keyIndex < 10; keyIndex++) {
    keys += `<span class="key"></span>`;
  }
  return keys;
}

function statBar(label, value) {
  const width = (Math.min(value, 150) / 150) * 100;
  return `
    <div class="stat-row">
      <span class="stat-label">${label}</span>
      <div class="stat-track"><div class="stat-fill" style="width: ${width}%"></div></div>
      <span class="stat-value">${value}</span>
    </div>
  `;
}
