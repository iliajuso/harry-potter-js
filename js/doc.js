import {data} from "./hp.js"
let main = document.querySelector("main")
function randomCard(dataEm){
    main.innerHTML = "";
    dataEm.forEach(el => createCard(el) 
        );
}
function createCard(obj) {
   let card = document.createElement("div")
   card.className = "main__wrap"
   let img =document.createElement("img")
   img.setAttribute("src", obj.image)
   let info = document.createElement("div")
   info.className = "main__wrap__info"
   let name = document.createElement("h2")
    name.textContent =  obj.name;
   let actor = document.createElement("p")
   actor.textContent = "Actor: " + obj.actor;
   let gender = document.createElement('p')
   gender.textContent ="Gneder: " + obj.gender;
   let house = document.createElement("p")
   house.textContent = "House: " +  obj.house;
   let wandCore = document.createElement("p")
   wandCore.textContent = "Wand core: " + obj.wand.core;
   let alive = document.createElement("p")
   alive.textContent = "Alive: " + ((obj.alive == true) ? "yes" : "no") ;
   info.append(img, name, actor, gender, house, wandCore, alive);
   card.append(info);
   main.append(card);
    }
    randomCard(data)
let input = document.querySelector("input");

input.addEventListener("input", (e) => {
    let filteredData = data.filter(obj => obj.name.toLowerCase().includes(e.target.value.toLowerCase()));
    randomCard(filteredData);
});