export async function createCharacterCard() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (response.ok) {
      const data = await response.json();

      const results = data.results;
      console.log(results);

      const card = document.createElement("li");
      card.classList.add("card");

      const cardDivContainer = document.createElement("div");
      cardDivContainer.classList.add("card__image-container");
      card.append(cardDivContainer);

      const cardImage = document.createElement("img");
      cardImage.classList.add("card__image");
      cardImage.setAttribute("src");
      cardDivContainer.append(cardImage);

      return card;
    }
  } catch (error) {
    console.error(error);
  }
}

createCharacterCard();
