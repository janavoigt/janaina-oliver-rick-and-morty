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
let maxPage = 1; // Set initial value for maxPage
let page = 1;
let searchQuery = "";

// Function to fetch characters from the API
async function fetchCharacters(searchQueryObject) {
  const searchQueryString = searchQueryObject?.query;

  try {
    let url = "https://rickandmortyapi.com/api/character";

    if (searchQueryString) {
      cardContainer.innerHTML = "";
      url += `?name=${encodeURIComponent(searchQueryString)}`;
    }

    if (!searchQueryString && page > 1) {
      url += `?page=${page}`;
    } else if (searchQueryString && page > 1) {
      url += `&page=${page}`;
    }

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const results = data.results;
      let maxPage = data.info.pages; // Get the maxPage value from the response

      cardContainer.innerHTML = "";

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

      // Update maxPage if a search query is provided
      if (searchQueryString) {
        maxPage = maxPage;
      }

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

// Define event listener for the search input form
searchBar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  searchQuery = Object.fromEntries(formData);
  const { maxPage } = await fetchCharacters(searchQuery);
  pagination.textContent = `1 / ${maxPage}`;
});

// // Event listener for the previous button
// prevButton.addEventListener("click", async () => {
//   if (page > 1) {
//     page--;
//     pagination.textContent = `${page} / ${maxPage}`;
//     await fetchCharacters();
//   }
// });

// // Event listener for the next button
// nextButton.addEventListener("click", async () => {
//   if (page < maxPage) {
//     page++;
//     pagination.textContent = `${page} / ${maxPage}`;
//     await fetchCharacters();
//   }
// });

/////////////////////////////
/////  ⬇︎  TESTZONE  ⬇︎  /////
/////////////////////////////

// Event listener for the previous button
// prevButton.addEventListener("click", async () => {
//   if (page > 1) {
//     page--;
//     console.log("Previous Button Clicked. Page:", page);
//     pagination.textContent = `${page} / ${maxPage}`;
//     if (searchQuery) {
//       await fetchCharacters({ query: searchQuery.query, page }); // Fetch characters with search query and updated page
//     } else {
//       await fetchCharacters({ page }); // Fetch characters with updated page
//     }
//   }
// });

// // Event listener for the next button
// nextButton.addEventListener("click", async () => {
//   if (page < maxPage) {
//     page++;
//     console.log("Next Button Clicked. Page:", page);
//     pagination.textContent = `${page} / ${maxPage}`;
//     if (searchQuery) {
//       await fetchCharacters({ query: searchQuery.query, page }); // Fetch characters with search query and updated page
//     } else {
//       await fetchCharacters({ page }); // Fetch characters with updated page
//     }
//   }
// });

/////////////////////////////
/////  ⬆︎  TESTZONE  ⬆︎  /////
/////////////////////////////

/////////////////////////////
/////  ⬇︎  TESTZONE  ⬇︎  /////
/////////////////////////////

// Event listener for the previous button
prevButton.addEventListener("click", async () => {
  if (page > 1) {
    page--;
    console.log("Previous Button Clicked. Page:", page);
    pagination.textContent = `${page} / ${maxPage}`;
    console.log("Search Query:", searchQuery);

    maxPage = maxPage; 
    
    if (searchQuery) {
      await fetchCharacters({ query: searchQuery.query, page }); // Fetch characters with search query and updated page
    } else {
      await fetchCharacters({ page }); // Fetch characters with updated page
    }
  }
});

// Event listener for the next button
nextButton.addEventListener("click", async () => {
  if (page < maxPage) {
    page++;
    console.log("Next Button Clicked. Page:", page);
    pagination.textContent = `${page} / ${maxPage}`;
    console.log("Search Query:", searchQuery);

    maxPage = maxPage; 
    
    if (searchQuery) {
      await fetchCharacters({ query: searchQuery.query, page }); // Fetch characters with search query and updated page
    } else {
      await fetchCharacters({ page }); // Fetch characters with updated page
    }
  }
});

/////////////////////////////
/////  ⬆︎  TESTZONE  ⬆︎  /////
/////////////////////////////
