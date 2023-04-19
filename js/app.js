'use strict';

//dan, line6 we make a variable that takes in a string, line8 parses that string into an object. line8 will only run if there are items within our DuckArrayStorage.   We moved all the instances of Duck(all the images) inside of the if-else statement, doing this will make sure that we don't get a duplicating graph. Go to line 99 for more comments. PS: you also want to move the duckArray.push into the else statement

let duckArray = [];
let DuckArrayFromStorage = localStorage.getItem('duckArray');
if (DuckArrayFromStorage) {
  duckArray = JSON.parse(DuckArrayFromStorage);
} else {
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
}

let indexArray = [];

let myContainer = document.querySelector('section');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let viewResultBtn = document.querySelector('section ~ div')

let counter = 0;
let maxCounter = 25;

function Duck(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
}

function selectRandomDuckNumber() {
  return Math.floor(Math.random() * duckArray.length);
}

function renderDucks() {

  while (indexArray.length < 6) {
    let randomIndex = selectRandomDuckNumber();
    if (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex);
    }
    console.log(indexArray);
  }

  let imageOneIndex = indexArray.shift();
  let imageTwoIndex = indexArray.shift();
  let imageThreeIndex = indexArray.shift();

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

function handleDuckClick(event) {
  counter++;
  console.log(event.target.alt);
  let clickedDuck = event.target.alt;
  for (let i = 0; i < duckArray.length; i++) {
    if (clickedDuck === duckArray[i].name) {
      duckArray[i].votes++;
      console.log(duckArray);
    }
  }
  if (counter < maxCounter) {
    renderDucks();
  } else {
    myContainer.removeEventListener('click', handleDuckClick);
    viewResultBtn.addEventListener('click', viewResults);
  }

  //dan, lines 101 and 102 is doing something, i don't know wtf this doin, but put it in others wise no work.      with some testing I believe we need these in order keep previous values for our graph, once i commented out the lines the values have seem to be reset. <3

  let stringifiedDuckArray = JSON.stringify(duckArray);
  localStorage.setItem('duckArray', stringifiedDuckArray);
}

function viewResults() {
  renderChart();
  viewResultBtn.removeEventListener('click', viewResults);
}

function renderChart() {
  console.log(duckArray);

  const ctx = document.getElementById('myChart');

  let duckNames = [];
  let duckVotes = [];
  let duckViews = [];

  for (let i = 0; i < duckArray.length; i++) {
    console.log(duckArray[i]);

    let name = duckArray[i].name;
    duckNames.push(name);

    duckVotes.push(duckArray[i].votes);
    duckViews.push(duckArray[i].views);
  }

  console.log(duckNames);
  console.log(duckVotes);
  console.log(duckViews);

  let config = {
    type: 'bar',
    data: {
      labels: duckNames,
      datasets: [
        {
          label: '# of Votes',
          data: duckVotes,
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)'
          ]
        },
        {
          label: '# of Views',
          data: duckViews,
          borderWidth: 1,
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(255, 159, 64, 0.2)'
          // ],
          // borderColor: [
          //   'rgb(255, 99, 132)',
          //   'rgb(255, 159, 64)'
          // ]
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, config);
}

renderDucks();

myContainer.addEventListener('click', handleDuckClick);