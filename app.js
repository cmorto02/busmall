'use strict';

var allItems = [];
var item1 = document.getElementById('item1');
var item2 = document.getElementById('item2');
var item3 = document.getElementById('item3');
var mainDiv = document.getElementById('mainDiv');
var threePics = [item1, item2, item3];
var randoArray = [];
var storedArray = [];
var testArray = [];
var voted = 0;

var itemList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

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

itemObjectMaker();

function choose3Randos(){
  randoArray = [];
  for (var j = 0; j < threePics.length; j++) {
    var random = Math.floor(Math.random() * allItems.length);
    while (testArray.includes(random)){
      random = Math.floor(Math.random() * allItems.length);
      console.log('duplicate caught');
    }
    randoArray.push(random);
    testArray.push(random);
  }
  testArray = [];
}

choose3Randos();

// function noSame() {
//   for(var m = 0; m < threePics.length; m++){
//     if(randoArray)
//   }
// }

function compare() {
  if (voted > 0) {
    for(var k = 0; k < threePics.length; k++){
      if (storedArray.includes(randoArray[k])){
        choose3Randos();
      }
    }
  }
}

compare();

function showItems(){
  for (var n = 0; n < threePics.length; n++){
    threePics[n].src = allItems[randoArray[n]].filepath;
    threePics[n].alt = allItems[randoArray[n]].name;
    threePics[n].title = allItems[randoArray[n]].name;
    allItems[randoArray[n]].views++;
  }
}

showItems();

// function views() {
//   if (voted > 0) {
//     for( var l = 0; l < threePics.length; l++){
//       itemList[storedArray[l]].views++;
//     }
//   }
// }

// views();

mainDiv.addEventListener('click', handleClick);

function handleClick(event) {
  storedArray = [];
  console.log(event.target.alt);
  for(var o = 0; o < allItems.length; o++){
    if(allItems[o].name === event.target.alt){
      allItems[o].votes++;
    }
  }
  voted++;
  storedArray.push(randoArray);
  choose3Randos();
  compare();
  showItems();
  // views();
}