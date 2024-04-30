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

async function fetchCharacters(searchQueryObject) {
  const searchQueryString = searchQueryObject?.query;

  try {
    let url = "https://rickandmortyapi.com/api/character";

    if (searchQueryString) {
      url += `?name=${encodeURIComponent(searchQueryString)}`;
      if (page > 1) url += `&page=${page}`;
    } else if (page > 1) {
      url += `?page=${page}`;
    }

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const results = data.results;
      let maxPage = data.info.pages; // Get the maxPage value from the response

      let content = "";

      results.forEach((result) => {
        const options = {
          image: result.image,
          name: result.name,
          status: result.status,
          type: result.type,
          occurrences: result.episode.length,
        };
        content += createCharacterCard(options);
      });

      cardContainer.innerHTML = content; // Update the DOM only once

      // Return both the results and the maxPage value
      return { results, maxPage };
    }
  } catch (error) {
    console.error(error);
  }
}

// Update the maxPage variable after fetchCharacters() resolves
async function updateMaxPage() {
  const { maxPage } = await fetchCharacters();
  return maxPage;
}

// Update maxPage on initial pageload
updateMaxPage().then((page) => {
  maxPage = page;
  page = 1;
  pagination.textContent = `${page} / ${maxPage}`;
});

searchBar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  searchQuery = Object.fromEntries(formData);
  page = 1; // Reset page to 1 on new search
  const { maxPage: updatedMaxPage } = await fetchCharacters(searchQuery);
  maxPage = updatedMaxPage;
  pagination.textContent = `${page} / ${maxPage}`;
});

prevButton.addEventListener("click", async () => {
  if (page > 1) {
    page--;
    const { maxPage: updatedMaxPage } = await fetchCharacters({
      query: searchQuery.query,
      page,
    });
    maxPage = updatedMaxPage; // Update the global maxPage with the new value
    pagination.textContent = `${page} / ${maxPage}`;
  }
});

nextButton.addEventListener("click", async () => {
  if (page < maxPage) {
    page++;
    const { maxPage: updatedMaxPage } = await fetchCharacters({
      query: searchQuery.query,
      page,
    });
    maxPage = updatedMaxPage; // Update the global maxPage with the new value
    pagination.textContent = `${page} / ${maxPage}`;
  }
});
