'use strict';

let duckArray = [];

let myContainer = document.querySelector('section');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let viewResultBtn = document.querySelector('section ~ div')

let counter = 0;
let maxCounter = 25;

function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
}

let bag = new Duck('bag');
let banana = new Duck('banana');
let bathroom = new Duck('bathroom');
let boots = new Duck('boots');
let breakfast = new Duck('breakfast');
let bubblegum = new Duck('bubblegum');
let chair = new Duck('chair');
let cthulhu = new Duck('cthulhu');
let dogDuck = new Duck('dog-duck');
let dragon = new Duck('dragon');
let pen = new Duck('pen');
let petSweep = new Duck('pet-sweep');
let scissors = new Duck('scissors');
let shark = new Duck('shark');
let sweep = new Duck('sweep', 'png');
let tauntaun = new Duck('tauntaun');
let unicorn = new Duck('unicorn');
let waterCan = new Duck('water-can');
let wineGlass = new Duck('wine-glass');

duckArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

function selectRandomDuckNumber(){
  return Math.floor(Math.random() * duckArray.length);
}

function renderDucks(){
  // let duck1 = selectRandomDuckNumber();
  // let duck2 = selectRandomDuckNumber();
  // let duck3 = selectRandomDuckNumber();
  // console.log(duck1, duck2, duck3);

  let selectedImages = [];

  while(selectedImages.length < 3){
    let randomIndex = selectRandomDuckNumber();
    if(!selectedImages.includes(randomIndex)){
      selectedImages.push(randomIndex);
    }
    console.log(selectedImages);
  }

  let imageOneIndex = selectedImages.shift();
  let imageTwoIndex = selectedImages.shift();
  let imageThreeIndex = selectedImages.shift();

  image1.src = duckArray[imageOneIndex].src;
  image1.alt = duckArray[imageOneIndex].name;
  duckArray[imageOneIndex].views++;
  image2.src = duckArray[imageTwoIndex].src;
  image2.alt = duckArray[imageTwoIndex].name;
  duckArray[imageTwoIndex].views++;
  image3.src = duckArray[imageThreeIndex].src;
  image3.alt = duckArray[imageThreeIndex].name;
  duckArray[imageThreeIndex].views++;
  }

function handleDuckClick(event){
  counter++;
  console.log(event.target.alt);
  let clickedDuck = event.target.alt;
  for(let i = 0; i < duckArray.length; i++){
    if(clickedDuck === duckArray[i].name){
      duckArray[i].votes++;
      console.log(duckArray);
    }
  }
  if(counter < maxCounter){
    renderDucks();
  }else {
    myContainer.removeEventListener('click', handleDuckClick);
    viewResultBtn.addEventListener('click', viewResults);
  }
}

function viewResults(){
  let ul = document.querySelector('ul');
  for(let i = 0; i < duckArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${duckArray[i].name} had ${duckArray[i].views} views and ${duckArray[i].votes} votes.`;
    ul.appendChild(li);
  }
}

renderDucks();

myContainer.addEventListener('click', handleDuckClick);