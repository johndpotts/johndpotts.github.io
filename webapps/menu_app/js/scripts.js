
/*saving different sections as variables*/
const viewAll = document.getElementById('view-all-items');

const addItem = document.getElementById('add-an-item');

const viewSection = document.getElementById('view-section');

const addSection = document.getElementById('add-section');

const navigation = document.querySelector('.navigation');

const appetizers = document.getElementById("appetizers");

const entrees = document.getElementById("entrees");

const desserts = document.getElementById("desserts");

const drinks = document.getElementById("drinks");

const itemCategory = document.querySelector("#add-item-form #category");

const itemName = document.querySelector("#add-item-form #item");

const itemDescription = document.querySelector("#add-item-form #description");

const itemPrice = document.querySelector("#add-item-form #price");

const itemHealthy = document.querySelector("#add-item-form #healthy");

const popup = document.getElementById('js-popup-outer');

const popupInner = document.getElementById('js-popup-inner');

/* The item array - used to store the full menu */
var items = [
  {item:"Fish Tacos",
description: "yummy fish tacos with mango salsa",
price:"$5",
healthy: "yes",
category:"entrees",
id:1
},
{item:"Chips and Hummus",
description: "fresh baked pita chips with pine nut hummus",
price:"$3",
healthy: "yes",
category:"appetizers",
id:2
},
{item:"Lemon Sorbet",
description: "a light, soothing citrus explosion",
price:"$2",
healthy: "yes",
category:"dessert",
id:3
},
{item:"White Wine",
description: "a white wine; goes well with fish tacos!",
price:"$4",
healthy: "yes",
category:"drinks",
id:4
},
{item:"Deep fried grease burgers",
description: "So good that you can feel your arteries close as you eat it",
price:"$6",
healthy: "no",
category:"entrees",
id:5
},
{item:"Cheese wedge",
description: "Really just a big hunk of cheese",
price:"$4",
healthy: "no",
category:"appetizers",
id:6
},
{item:"Super Fudge Cake",
description: "One slice weighs 5 lbs. So good yet so heavy.",
price:"$10",
healthy: "no",
category:"dessert",
id:7
},
{item:"Beer",
description: "a bland and generic yet highly original craft beer. Only hipsters can taste the difference!",
price:"$3",
healthy: "no",
category:"drinks",
id:8
}
];

if (localStorage.getItem("menuAppItems") == undefined){
localStorage.setItem("menuAppItems", JSON.stringify(items));
};

/*Populate the table when the window loads */
window.onLoad= getItems();

/*using event delegation to assign click handler to section rather than individual links*/
navigation.addEventListener('click',
function(event){
  console.log(event.target);
if(!event.target.classList.contains('selected')){
viewAll.classList.toggle("selected");
addItem.classList.toggle("selected");
viewSection.classList.toggle("hidden");
addSection.classList.toggle("hidden");
getItems();
}
}
);


/*function to add a new item to the menu*/
function saveItem() {

  /*confirm required fields*/
  if (itemName.value == "") {
      alert("Please provide an item name");
      return false;
}
if (itemPrice.value == "") {
    alert("Please provide an item price");
    return false;
}
if (itemDescription.value == "") {
    alert("Please provide an item description");
    return false;
}

/* create new item from values and push to array*/
var newItem = {}
newItem.item = itemName.value;
newItem.price = itemPrice.value;
newItem.description = itemDescription.value;
newItem.healthy = itemHealthy.value;
newItem.category = itemCategory.value;
newItem.id = items.length+1;
items.push(newItem);
localStorage.setItem("menuAppItems", JSON.stringify(items));
getItems();

/*Clear form values*/
itemName.value = "";
itemDescription.value = "";
itemPrice.value = "";

viewAll.click();
alert("Your item has been added!")
  };


function  getItems() {
  items = JSON.parse(localStorage.getItem("menuAppItems"));
  /*clear out old values*/
appetizers.innerText = "";
entrees.innerText = "";
desserts.innerText = "";
drinks.innerText = "";

/*populate table with array of item objects*/
for (var item of items){

    const tr = document.createElement("tr");
      const tdItem = document.createElement("td");
      const tdDescription = document.createElement("td");
      const tdPrice = document.createElement("td");
      const tdHealthy = document.createElement("td");
      const tdEditDelete = document.createElement("td");

      tdItem.innerText = item.item;
      tdDescription.innerText = item.description;
      tdPrice.innerText = item.price;
      tdHealthy.innerText = item.healthy;

      /*give the buttons functionality to call the delete and edit functons with the id of each item*/
      tdEditDelete.innerHTML = '<button class = "delete"  onclick="deleteItem('+item.id+')">Delete</button> <button class = "edit"  onclick="editItem('+item.id+')">Edit</button>';

      tr.appendChild(tdItem);
      tr.appendChild(tdDescription);
      tr.appendChild(tdPrice);
      tr.appendChild(tdHealthy);
        tr.appendChild(tdEditDelete);

/*make sure each item goes to the right category*/
  if (item.category == "appetizers"){appetizers.appendChild(tr);}
    if (item.category == "entrees"){entrees.appendChild(tr);}
      if (item.category == "dessert"){desserts.appendChild(tr);}
        if (item.category == "drinks"){drinks.appendChild(tr);}
}


};

/*delete item using a filter method*/
function deleteItem(id){
  if(confirm("Do you really want to delete this item?"))
  {items = items.filter(function(a){return a.id != id;});
}
localStorage.setItem("menuAppItems", JSON.stringify(items));
  getItems();
};


/*edit triggers a popup with a pre-filled form*/
function editItem(id){
/*get the item with its ID*/
var result = items.filter(function(a){return a.id == id;});
  var item = result[0];
/*dynamically fill out the pop up form*/
  popup.classList.toggle('hidden');
  popupInner.innerHTML='<h2 class="shadow text1" >Edit Item</h2>  <form id = "edit-item-form" class = "form-style-4">    <label for="Category">Category:</label>    <select  id = "category" class="category-list"required>  <option value="appetizers">Appetizer</option>  <option value="entrees">Entree</option>  <option value="dessert">Dessert</option>  <option value="drinks">Beverage</option></select> <br/>   <label for="item">Item:</label><input type="text" name="item" id="item" value = "'+item.item+'" required><br><label for="description">Description:</label><input type="text" name="description" value = "'+item.description+'" id="description" required><br><label for="price">Price:</label><input type="text" value = '+item.price+' name="price" id="price" required><br><label for="healthy">Is this a healthy option?</label><select class = "healthy-selector" id = "healthy" required><option value="yes">Yes</option><option value="no">No</option></select><br><br><input type="button"'+
   'value="Save Item"onclick="saveEditedItem('+item.id +')"></form><a class="popup-close"onclick="popupClose()" href="#">x</a>'

/*select the right option for category selector*/
   var options = document.querySelectorAll('.category-list option');
   [].forEach.call(options, function(option) {
     if(option.value==item.category)
     {option.setAttribute('selected', '');}
   });
   /*select the right option for healthy selector*/
   var healthy = document.querySelectorAll('.healthy-selector option');
   [].forEach.call(healthy, function(healthChoice) {
     if(healthChoice.value==item.healthy)
     {healthChoice.setAttribute('selected', '');}
   });

};

function popupClose(){
    popup.classList.toggle('hidden');
};

/*pretty close to a copy of the saveItem function. Possibly redundant?*/
function saveEditedItem(id) {
  const itemCategory = document.querySelector("#edit-item-form #category");

  const itemName = document.querySelector("#edit-item-form #item");

  const itemDescription = document.querySelector("#edit-item-form #description");

  const itemPrice = document.querySelector("#edit-item-form #price");

  const itemHealthy = document.querySelector("#edit-item-form #healthy");

  if (itemName.value == "") {
      alert("Please provide an item name");
      return false;
}
if (itemPrice.value == "") {
    alert("Please provide an item price");
    return false;
}
if (itemDescription.value == "") {
    alert("Please provide an item description");
    return false;
}

items = items.filter(function(a){return a.id != id;});
var newItem = {}
newItem.item = itemName.value;
newItem.price = itemPrice.value;
newItem.description = itemDescription.value;
newItem.healthy = itemHealthy.value;
newItem.category = itemCategory.value;
newItem.id = id;

items.push(newItem);
localStorage.setItem("menuAppItems", JSON.stringify(items));
getItems();
  popup.classList.toggle('hidden');
viewAll.click();
alert("Your item has been edited!")
  };
