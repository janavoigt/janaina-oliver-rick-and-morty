export function createSearchBar(onSubmit) {
  const form = document.createElement("form");
  form.classList.add("search-bar");
  form.addEventListener("submit", onSubmit);

  const inputSearch = document.createElement("input");
  inputSearch.name = "query";
  inputSearch.classList.add("search-bar__input");
  inputSearch.type = "text";
  inputSearch.placeholder = "search characters";
  inputSearch.arialLabel = "character name";

  const buttonSearch = document.createElement("button");
  buttonSearch.classList.add("search-bar__button");
  const icon = document.createElement("img");
  icon.classList.add("search-bar__icon");
  icon.src = "assets/magnifying-glass.png";
  icon.alt = "";

  buttonSearch.appendChild(icon);

  form.append(inputSearch, buttonSearch);

  return form;
}
