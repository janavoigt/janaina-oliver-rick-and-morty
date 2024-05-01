// Import the createCharacterCard function from the card module
import { createCharacterCard } from "./components/card/card.js";

// Select DOM elements
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
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  try {
    // We can always send the page parameter even if it is page 1 and also according to the instructions
    // we can always send the searchQuery as well because the API will ignore if it is empty
    let url = `https://rickandmortyapi.com/api/character?page=${page}&name=${encodeURIComponent(
      searchQuery
    )}`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const results = data.results;

      maxPage = data.info.pages; // We can update the maxPage status directly
      pagination.textContent = `${page} / ${maxPage}`; // Then we can update the pagination here

      cardContainer.innerHTML = "";

      results.forEach((result) => {
        cardContainer.innerHTML += createCharacterCard(result);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

searchBar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  page = 1; // Reset page to 1 on new search
  searchQuery = data.query;

  await fetchCharacters();
});

prevButton.addEventListener("click", async () => {
  if (page > 1) {
    page--;
    await fetchCharacters();
  }
});

nextButton.addEventListener("click", async () => {
  if (page < maxPage) {
    page++;
    await fetchCharacters();
  }
});

fetchCharacters();