'use strict';

var allItems = [];
var item1 = document.getElementById('item1');
var item2 = document.getElementById('item2');
var item3 = document.getElementById('item3');
itemList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function SaleItem(name) {
  this.filepath = `img/${name}.jpg`;
  this.name = name;
  this.votes = 0;
  this.views = 0;
  allItems.push(this);
}

function itemObjectMaker() {
  for (var i = 0; i < itemList.length; i++){
    SaleItem(itemList[i]);
  }
}

itemObjectMaker();

