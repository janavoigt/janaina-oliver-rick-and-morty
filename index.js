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

/**
 * Fetches characters from the Rick and Morty API.
 *
 * Optionally, characters are fetched based on the provided search query.
 *
 * @param {Object} searchQueryObject - The search query object containing the query parameter.
 * @returns {Promise} - A promise that resolves to an array of character cards.
 * @throws {Error} - If there is an error during the fetch request or parsing the response.
 */
async function fetchCharacters(searchQueryObject) {
  /**
   * Represents the search query string or is undefined if no search was performed.
   * @type {string | undefined}
   */
  const searchQueryString = searchQueryObject?.query;

  try {
    // Assign base url
    let url = "https://rickandmortyapi.com/api/character";

    // In case a search string is provided
    if (searchQueryString) {
      // Empty the card container
      cardContainer.innerHTML = "";
      // Concatenate base url and search string
      url += `?name=${encodeURIComponent(searchQueryString)}`;
    }

    // Get whether all characters or the searched ones
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const results = data.results;

      // Iterate over each character result
      results.forEach((result) => {
        // Create an options object with the necessary data for the character card
        const options = {
          image: result.image,
          name: result.name,
          status: result.status,
          type: result.type,
          occurrences: result.episode.length,
        };

        // Create a character card using the createCharacterCard function and append it to the card container
        cardContainer.innerHTML += createCharacterCard(options);
      });
    }
  } catch (error) {
    console.error(error);
  }
}
// Load characters on initial pageload
fetchCharacters();

// Define event listener for the search iniput form
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();

  // Extract the search query from the form data
  const formData = new FormData(e.target);
  searchQuery = Object.fromEntries(formData);

  // Pass search input object containing the query string
  fetchCharacters(searchQuery);
});
