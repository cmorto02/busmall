'use strict';

var allItems = [];
var item1 = document.getElementById('item1');
var item2 = document.getElementById('item2');
var item3 = document.getElementById('item3');
var mainDiv = document.getElementById('mainDiv');
var itemTable = document.getElementById('itemTable');
var itemChart = document.getElementById('itemChart');
var threePics = [item1, item2, item3];
var randoArray = [];
var storedArray = [];
var testArray = [];
var voted = 0;
var chartVotes = [];
var itemChart2;
var itemList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var descriptList = ['R2D2 bag', 'banana slicer', 'ipad stand', 'boots', 'all-in-one breakfast', 'meatball bubblegum', 'redchair', 'cthulhu', 'doggie duck bill', 'dragon meat', 'uPENcils', 'pet sweeper', 'pizza scissors', 'shark sleeping bag', 'baby sweeper onsie', 'tauntaun blankie', 'unicorn meat', 'tentacle usb', 'useless watering can', 'useless wine glass'];
var data = {
  labels: descriptList,
  datasets: [{
    label: 'votes',
    data: chartVotes,
    backgroundColor: ['darkgray'
    ],
  }],
};
var options = {
  scaleShowValues: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
    xAxes: [{
      ticks: {
        autoSkip: false,
      },
    }],
  },
};
var retrieved = JSON.parse(localStorage.getItem('listOfAllItems'));



function SaleItem(name) {
  this.filepath = `img/${name}.jpg`;
  this.name = name;
  this.votes = 0;
  this.views = 0;
  allItems.push(this);
}

function itemObjectMaker() {
  for (var i = 0; i < itemList.length; i++){
    new SaleItem(itemList[i]);
  }
}

function choose3Randos(){
  randoArray = [];
  for (var j = 0; j < threePics.length; j++) {
    var random = Math.floor(Math.random() * allItems.length);
    while (testArray.includes(random)){
      random = Math.floor(Math.random() * allItems.length);
    }
    randoArray.push(random);
    testArray.push(random);
  }
  testArray = [];
  compare();
}

function compare() {
  if (voted > 0) {
    for(var k = 0; k < threePics.length; k++){
      if (storedArray.includes(randoArray[k])){
        choose3Randos();
      }
    }
  }
}

function showItems(){
  for (var n = 0; n < threePics.length; n++){
    threePics[n].src = allItems[randoArray[n]].filepath;
    threePics[n].alt = allItems[randoArray[n]].name;
    threePics[n].title = allItems[randoArray[n]].name;
    allItems[randoArray[n]].views++;
  }
}

function updateVoteArray(){
  for (var q = 0; q < descriptList.length; q++){
    chartVotes.push(allItems[q].votes);
  }
}

function drawChart(){
  var ctx = document.getElementById('itemChart').getContext('2d');
  itemChart2 = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options,
  });
}

function renderList() {
  itemTable.textContent = '';
  var li = document.createElement('li');
  for (var p = 0; p < itemList.length; p++){
    li = document.createElement('li');
    li.textContent = allItems[p].votes + ' votes for the ' + descriptList[p] + '.';
    itemTable.appendChild(li);
  }
}

function getItemsFromLocal(){
  if (retrieved === null){
    itemObjectMaker();
    choose3Randos();
    compare();
    showItems();
  } else {
    allItems = retrieved;
    choose3Randos();
    compare();
    showItems();
  }
}

function handleClick(event) {
  storedArray = [];
  for(var o = 0; o < allItems.length; o++){
    if(allItems[o].name === event.target.alt){
      allItems[o].votes++;
    }
  }
  voted++;
  storedArray = randoArray;
  choose3Randos();
  compare();
  showItems();
  if(voted > 25){
    mainDiv.removeEventListener('click', handleClick);
    // renderList();
    updateVoteArray();
    drawChart();
    var allItemsStringified = JSON.stringify(allItems);
    localStorage.listOfAllItems = allItemsStringified;
  }
}

getItemsFromLocal();

// itemObjectMaker();
// choose3Randos();
// compare();
// showItems();


mainDiv.addEventListener('click', handleClick);