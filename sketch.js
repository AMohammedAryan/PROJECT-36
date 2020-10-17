//Create variables here

var Dog, dog, happyDog, database, foodS, foodStock;
var feedButton, addFoodButton;
var fedTime, lastFed;
var foodObj;

var readGS, GS;

var bedroomIMG, gardenIMG, washroomIMG;

var CT;

function preload()
{
  //load images here
  
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

  bedroomIMG = loadImage("virtual pet images/Bed Room.png");
  gardenIMG = loadImage("virtual pet images/Garden.png");
  washroomIMG = loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readFoodStock);

  readGS = database.ref('gameState');
  readGS.on("value", (data)=>{

    GS = data.val();
  })

  console.log(readGS);
  console.log(GS);
  
  Dog = createSprite(300, 350, 50, 50);

  Dog.addImage(dog);
  Dog.scale = 0.4;

  feedButton = createButton("FEED");
  addFoodButton = createButton("ADD FOOD");

  feedButton.position(450, 50);
  addFoodButton.position(500, 50);

  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){

    lastFed = data.val();
  })
}


function draw() {  
  background(46, 139, 87);

  textSize(20);
  fill("black");
  text("Food Stock: " + foodS, 300, 30);

  foodObj.display();

  feedButton.mousePressed(feedDog);
  addFoodButton.mousePressed(addFood);

  fill(255, 255, 254);
  textSize(25);

  console.log(lastFed);

  if(lastFed >= 12){

    text("Last Feed : " + lastFed % 12 + " PM", 10, 450);
  } else if(lastFed === 0){

    text("Last Feed : 12 AM", 10, 470);
  } else{

    text("Last Feed : " + lastFed + " AM", 10, 450);
  }

  if(GS !== "hungry"){

    feedButton.hide();
    addFoodButton.hide();
    Dog.x = 900;
    Dog.y = 900;
  } else{

    Dog.x = 300;
    Dog.y = 350;
    feedButton.show();
    addFoodButton.show();
  }

  CT = hour();

  if(CT === lastFed + 1){

    foodObj.garden();

    US("playing")

  } else if(CT === lastFed + 2){

    foodObj.bedroom();

    US("sleeping");

  } else if(CT > lastFed + 2 && CT <= lastFed + 4){

    foodObj.washroom();

    US("bathing");
  } else{

    US("hungry");
  }

  drawSprites();
  //add styles here
}

function readFoodStock(data){

  foodS = data.val();
  foodObj.foodStock = foodS;
}

function feedDog(){

  foodObj.foodStock = foodObj.foodStock - 1;

  Dog.addImage(happyDog);

  database.ref('/').update({

    Food: foodObj.foodStock,
    feedTime: hour(),
    gameState: "hungry"
  })
}

function addFood(){

  foodS = foodS + 1;
  database.ref('/').update({

    Food: foodS
  })
}

function US(a){

  database.ref('/').update({

    gameState: a
  })
}
