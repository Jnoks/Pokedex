function pokemonCard(pokemon) {
  const mainType = pokemon.types[0].type.name;
  return `
    <button class="card type-${mainType}" data-id="card">
      <span class="card-id">#${pokemon.id}</span>
      <img src="${getImageUrl(pokemon.id)}" alt="${pokemon.name}" data-id="card-image" />
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
  return `<p class="not-found" data-id="not-found">No Pokémon found</p>`;
}
