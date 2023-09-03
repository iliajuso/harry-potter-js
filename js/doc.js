
// This file imports the data from the `hp.js` file.
import {data} from "./hp.js"

// This variable gets the `main` element from the DOM.
let main = document.querySelector("main")

// This variable gets the `input` element from the DOM.
let input = document.querySelector("input")

// This variable gets the `select` element from the DOM.
const selectElement = document.querySelector("select")

// This variable gets the liked cards from localStorage.
let likedCards = JSON.parse(localStorage.getItem('likedCards')) || []

// This function randomly generates a card and adds it to the `main` element.
function randomCard(dataEm) {
  // Clear the `main` element.
  main.innerHTML = ""

  // Iterate over the data and create a card for each object.
  dataEm.forEach(el => createCard(el) 
        )
}

// This function calls the `randomCard()` function with the data from the `data` variable.
randomCard(data)

// This function creates a card for the given object.
function createCard(obj) {
  // Create a new `div` element and set its class to `main_wrap`.
  let card = document.createElement("div")
  card.className = "main_wrap"

  // Create a new `img` element and set its src attribute to the object's image.
  let img =document.createElement("img")
  img.className = "main_wrap_pic"
  img.setAttribute("src", obj.image)

  // Create a new `div` element and set its class to `main_wrap__info`.
  let info = document.createElement("div")
  info.className = "main_wrap__info"

  // Create a new `h2` element and set itstextContent to the object's name.
  let name = document.createElement("h2")
  name.textContent =  obj.name;

  // Create a new `p` element and set itstextContent to the object's actor.
  let actor = document.createElement("p")
  actor.textContent = "Actor: " + obj.actor;

  // Create a new `p` element and set itstextContent to the object's gender.
  let gender = document.createElement('p')
  gender.textContent ="Gender: " + obj.gender;

  // Create a new `p` element and set itstextContent to the object's house.
  let house = document.createElement("p")
  house.textContent = "House: " +  obj.house;

  // Create a new `p` element and set itstextContent to the object's wand core.
  let wandCore = document.createElement("p")
  wandCore.textContent = "Wand core: " + obj.wand.core;

  // Create a new `p` element and set itstextContent to the object's alive status.
  let alive = document.createElement("p")
  alive.textContent = "Alive: " + ((obj.alive == true) ? "yes" : "no");

  // Create a new `img` element and set its class to `heart-icon`.
  let heartIcon = document.createElement("img");
  heartIcon.className = "heart-icon";

  // Set the src attribute of the heart icon to the empty heart image if the object is not in the liked cards array, or the filled heart image if it is.
  let emptyHeartSrc = "/image/Group 2.png";
  let filledHeartSrc = "/image/Group 1.png";
  let isLiked = likedCards.some(card => card.name === obj.name);
  heartIcon.setAttribute("src", isLiked ? filledHeartSrc : emptyHeartSrc);

  // Add an event listener to the heart icon. When the user clicks on it, the icon will change and the object will be added to or removed from the liked cards array.
  heartIcon.addEventListener("click", () => {
    // Get the current src attribute of the heart icon.
    let currentSrc = heartIcon.getAttribute("src");

    // Set the new src attribute of the heart icon.
    let newSrc = currentSrc === emptyHeartSrc ? filledHeartSrc : emptyHeartSrc;
    heartIcon.setAttribute("src", newSrc);
    // If the current src attribute is empty, the object is not in the liked cards array.
// Add the object to the liked cards array and save it to localStorage.
    if (currentSrc === emptyHeartSrc) {
      likedCards.push(obj);
      localStorage.setItem('likedCards', JSON.stringify(likedCards))
    } else {
      // If the current src attribute is filled, the object is in the liked cards array.
      // Remove the object from the liked cards array and save it to localStorage.
      likedCards = likedCards.filter(card => card.name !== obj.name);
      localStorage.setItem('likedCards', JSON.stringify(likedCards))
    }
  });

  // Append the information and image elements to the card element.
  info.append( name, actor, gender, house, wandCore, alive, heartIcon);
  card.append(img,info)

  // Append the card element to the main element.
  main.append(card);
}

// This function shows the liked cards.
function randomLikedCards() {
  // Clear the main element.
  main.innerHTML = ""

  // Iterate over the liked cards array and create a card for each object.
  likedCards.forEach(card => createCard(card));

  // Add the cards to the main element.
  randomCard(likedCards)
}

// This function gets the `a` element from the DOM.
let showLikedBtn = document.querySelector("a");

// Add an event listener to the `a` element. When the user clicks on it, the `randomLikedCards()` function will be called.
showLikedBtn.addEventListener("click", randomLikedCards );

// This function gets the unique values of the `house` property from the data.
const uniqueHouses = [...new Set(data.map(item => item.house))];

// Iterate over the unique houses and create a `option` element for each house.
uniqueHouses.forEach(house => {
  // Create a new `option` element.
  const optionElement = document.createElement("option");

  // Set the value attribute of the option element to the house name.
  optionElement.value = house;

  // Set thetextContent of the option element to the house name.
  optionElement.textContent = house;

  // Append the option element to the select element.
  selectElement.append(optionElement);
});

// This function filters the data based on the input value and the selected house.
function filterData(nameValue, houseValue) {
  // Create a new array to store the filtered data.
  let filteredData = [];

  // Iterate over the data.
  for (let obj of data) {
    // If the name matches the input value and the house matches the selected house, add the object to the filtered data array.
    let nameMatch = obj.name.toLowerCase().includes(nameValue.toLowerCase());
    let houseMatch = obj.house.includes(houseValue);
    if (nameMatch && houseMatch) {
      filteredData.push(obj);
    }
  }

  // Call the `randomCard()` function with the filtered data.
  randomCard(filteredData);
}

// Add event listeners to the input and select elements.
input.addEventListener("input", (e) => {
  filterData(e.target.value, selectElement.value);
});
selectElement.addEventListener("change", (e) => {
  filterData(input.value, e.target.value);
});
//   //  let labelEl = document.createElement("label")
//   //  labelEl.className = "check"
//   //  let inputEl = document.createElement("input")
//   //  inputEl.className = "checkinput"
//   //  inputEl.setAttribute("type", "checkbox")
//   //  let spanEl = document.createElement("span")
//   //  spanEl.className = "checkbox"
//   //  labelEl.append(inputEl,spanEl)
