// Import the createCharacterCard function from the card module
import { createCharacterCard } from "./components/card/card.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";

// Select DOM elements
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');

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
    } else {
      cardContainer.innerHTML = `<li class="card">
      <div class="card__image-container">
        <img
          class="card__image"
          src="./assets/rick-and-morty-icon.jpg"
          alt=""
        />
        <div class="card__image-gradient"></div>
      </div>
      <div class="card__content">
        <h2 class="card__title">TRY AGAIN</h2>
        <dl class="card__info">
          <dt class="card__info-title">Status</dt>
          <dd class="card__info-description">Not Found</dd>
          <dt class="card__info-title">Type</dt>
          <dd class="card__info-description">Crazy</dd>
          <dt class="card__info-title">Occurrences</dt>
          <dd class="card__info-description">000</dd>
        </dl>
      </div>
    </li>
    `;
      pagination.textContent = `${(page = 0)} / ${(maxPage = 0)}`;
    }
  } catch (error) {
    console.error(error);
  }
}

const prevButton = createButton("previous", async () => {
  if (page > 1) {
    page--;
    await fetchCharacters();
  }
});

const nextButton = createButton("next", async () => {
  if (page < maxPage) {
    page++;
    await fetchCharacters();
  }
});

const pagination = createPagination(page, maxPage);

const searchBar = createSearchBar(async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  page = 1; // Reset page to 1 on new search
  searchQuery = data.query;

  await fetchCharacters();
});

navigation.append(prevButton, pagination, nextButton);

searchBarContainer.append(searchBar);

fetchCharacters();
