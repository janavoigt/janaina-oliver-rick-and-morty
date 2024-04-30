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
let maxPage = 42;
let page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    if (response.ok) {
      const data = await response.json();
      const results = data.results;

      // cardContainer.innerHTML = results
      //   .map((character) => createCharacterCard(character))
      //   .join();

      cardContainer.innerHTML = "";
      results.forEach((character) => {
        const htmlCard = createCharacterCard(character);
        cardContainer.innerHTML += htmlCard;
      });
    }
  } catch (error) {
    console.error(error);
  }
}

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    pagination.textContent = `${page} / ${maxPage}`;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    pagination.textContent = `${page} / ${maxPage}`;
    fetchCharacters();
  }
});

fetchCharacters();
pagination.textContent = `${page} / ${maxPage}`;
