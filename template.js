function pokemonCard(pokemon) {
  const mainType = pokemon.types[0].type.name;
  return `
    <button class="card type-${mainType}" data-id="card">
      <span class="card-id">#${pokemon.id}</span>
      <img src="${getImageUrl(pokemon.id)}" alt="${pokemon.name}" data-id="card-image" />
      <h2>${pokemon.name}</h2>
      <div class="type-badges">${typeBadges(pokemon)}</div>
    </button>
  `;
}

function typeBadges(pokemon) {
  let badges = "";
  for (const typeInfo of pokemon.types) {
    badges += `<span class="badge">${typeInfo.type.name}</span>`;
  }
  return badges;
}

function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${id}.png`;
}
