export async function createCharacterCard() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (response.ok) {
      const data = await response.json();

      const results = data.results;
      console.log(results);

      const card = document.createElement("li");
      card.classList.add("card");

      // Card images
      const cardDivContainer = document.createElement("div");
      cardDivContainer.classList.add("card__image-container");
      card.append(cardDivContainer);

      const cardImage = document.createElement("img");
      cardImage.classList.add("card__image");
      cardImage.setAttribute("src", results[0].image);
      cardDivContainer.append(cardImage);

      const cardImageGradient = document.createElement("div");
      cardImageGradient.classList.add("card__image-gradient");
      cardDivContainer.append(cardImageGradient);

      // Card content
      const cardContent = document.createElement("div");
      cardContent.classList.add("card__content");
      card.append(cardContent);

      const title = document.createElement("h2");
      title.classList.add("card__title");
      title.textContent = results[0].name;
      cardContent.append(title);

      const cardInfo = document.createElement("dl");
      cardInfo.classList.add("card__info");
      cardContent.append(cardInfo);

      const cardInfoTitle = document.createElement("dt");
      cardInfoTitle.classList.add("card__info-title");
      cardInfoTitle.textContent = "Status";
      cardInfo.append(cardInfoTitle);

      const cardInfoDescription = document.createElement("dd");
      cardInfoDescription.classList.add("card__info-description");
      cardInfoDescription.textContent = results[0].status;
      cardInfo.append(cardInfoDescription);

      const cardInfoTitle2 = document.createElement("dt");
      cardInfoTitle2.classList.add("card__info-title");
      cardInfoTitle2.textContent = "Type";
      cardInfo.append(cardInfoTitle2);

      const cardInfoDescription2 = document.createElement("dd");
      cardInfoDescription2.classList.add("card__info-description");
      cardInfoDescription2.textContent = results[0].type;
      cardInfo.append(cardInfoDescription2);

      const cardInfoTitle3 = document.createElement("dt");
      cardInfoTitle3.classList.add("card__info-title");
      cardInfoTitle3.textContent = "Occurrences";
      cardInfo.append(cardInfoTitle3);

      const cardInfoDescription3 = document.createElement("dd");
      cardInfoDescription3.classList.add("card__info-description");
      cardInfoDescription3.textContent = results[0].episode.length;
      cardInfo.append(cardInfoDescription3);

      //temporary
      document.querySelector("ul").append(card);

      return card;
    }
  } catch (error) {
    console.error(error);
  }
}

createCharacterCard();
