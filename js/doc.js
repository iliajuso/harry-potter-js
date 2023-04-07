import {data} from "./hp.js"
let main = document.querySelector("main")
let input = document.querySelector("input");
const uniqueHouses = [...new Set(data.map(item => item.house))];
const selectElement = document.querySelector("select");
let likedCards = JSON.parse(localStorage.getItem('likedCards')) || [];
function randomCard(dataEm){
    main.innerHTML = "";
    dataEm.forEach(el => createCard(el) 
        );
}
function createCard(obj) {
   let card = document.createElement("div")
   card.className = "main_wrap"
   let img =document.createElement("img")
   img.className = "main_wrap_pic"
   img.setAttribute("src", obj.image)
   let info = document.createElement("div")
   info.className = "main_wrap__info"
   let name = document.createElement("h2")
    name.textContent =  obj.name;
   let actor = document.createElement("p")
   actor.textContent = "Actor: " + obj.actor;
   let gender = document.createElement('p')
   gender.textContent ="Gender: " + obj.gender;
   let house = document.createElement("p")
   house.textContent = "House: " +  obj.house;
   let wandCore = document.createElement("p")
   wandCore.textContent = "Wand core: " + obj.wand.core;
   let alive = document.createElement("p")
   alive.textContent = "Alive: " + ((obj.alive == true) ? "yes" : "no");
  //  let labelEl = document.createElement("label")
  //  labelEl.className = "check"
  //  let inputEl = document.createElement("input")
  //  inputEl.className = "checkinput"
  //  inputEl.setAttribute("type", "checkbox")
  //  let spanEl = document.createElement("span")
  //  spanEl.className = "checkbox"
  //  labelEl.append(inputEl,spanEl)
   
   let heartIcon = document.createElement("img");
   heartIcon.className = "heart-icon";
   let emptyHeartSrc = "/image/Group 2.png";
   let filledHeartSrc = "/image/Group 1.png";
   let isLiked = likedCards.some(card => card.name === obj.name);
   heartIcon.setAttribute("src", isLiked ? filledHeartSrc : emptyHeartSrc);
   heartIcon.addEventListener("click", () => {
     let currentSrc = heartIcon.getAttribute("src");
     let newSrc = currentSrc === emptyHeartSrc ? filledHeartSrc : emptyHeartSrc;
     heartIcon.setAttribute("src", newSrc);
     if (currentSrc === emptyHeartSrc) {
      likedCards.push(obj);
  } else {
      likedCards = likedCards.filter(card => card.name !== obj.name);
    }
  });
  info.append( name, actor, gender, house, wandCore, alive, heartIcon);
   card.append(img,info)
    main.append(card);
    }
    function randomLikedCards() {
      main.innerHTML = "";
      likedCards.forEach(card => createCard(card));
    }
    function showLikedCards() {
      randomCard(likedCards);
  }
  let showLikedBtn = document.querySelector("a");
showLikedBtn.addEventListener("click", showLikedCards);

    randomCard(data)
uniqueHouses.forEach(house => {
    const optionElement = document.createElement("option");
    optionElement.value = house;
    optionElement.textContent = house;
    selectElement.append(optionElement);
  });

function filterData(nameValue, houseValue) {
    let filteredData = data.filter(obj => {
      let nameMatch = obj.name.toLowerCase().includes(nameValue.toLowerCase());
      let houseMatch = obj.house.includes(houseValue);
      return nameMatch && houseMatch;
    });
    randomCard(filteredData);
  }
  input.addEventListener("input", (e) => {
    filterData(e.target.value, selectElement.value);
  });
  selectElement.addEventListener("change", (e) => {
    filterData(input.value, e.target.value);
  });
