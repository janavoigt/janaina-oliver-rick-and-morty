import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
let searchQuery = "";

async function fetchCharacters(searchQueryObject) {
  const searchQueryString = searchQueryObject?.query;

  try {
    let url = "https://rickandmortyapi.com/api/character";

    if (searchQueryString) {
      cardContainer.innerHTML = "";
      url += `?name=${encodeURIComponent(searchQueryString)}`;
    }

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const results = data.results;

      results.forEach((result) => {
        const options = {
          image: result.image,
          name: result.name,
          status: result.status,
          type: result.type,
          occurrences: result.episode.length,
        };

        cardContainer.innerHTML += createCharacterCard(options);
      });
    }
  } catch (error) {
    console.error(error);
  }
}
// Load characters on initial pageload
fetchCharacters();

searchBar.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  searchQuery = Object.fromEntries(formData);

  fetchCharacters(searchQuery);
});
