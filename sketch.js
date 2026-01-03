// Lab 6 Assignment - Interactive Class Objects

// apple variables
let apples = [];
let appleTypes = ["red", "green", "yellow"];
let appleTypeGoal;
let applesCollected = 0;
let score = 0;

// player variable
let basket;

// time variables
let spawnDelay = 2000;
let spawnTime = 0;

function preload() {
  treeImg = loadImage('/images/tree.png');
  basketImg = loadImage('/images/basket.png');
}

function setup() {
  createCanvas(700, 600);
  
  // choose a random apple type goal
  appleTypeGoal = random(appleTypes);
  
  // create the player
  imageMode(CENTER);
  basket = new Basket(basketImg);
}

function draw() {
  // background
  background(253, 233, 175);
  image(treeImg, width / 2, height / 2, width, height);
  
  // instructions and score values
  fill(0);
  noStroke();
  textStyle(BOLD);
  textSize(14);
  textAlign(LEFT);
  text("Collect 10 " + appleTypeGoal + " apples!", 50, 50);
  textSize(12);
  text("Apples Collected: " + applesCollected, 50, 80);
  text("Score: " + score, 50, 100);
  
  // display the player
  basket.display();
  
  // player controls
  if (keyIsDown(LEFT_ARROW)) {
    basket.moveLeft();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    basket.moveRight();
  }  
  
  // create 2 apples every 2 seconds
  if (millis() - spawnTime > spawnDelay ) {
    for (let i = 0; i < 2; i++) {
      apples.push(new Apple());
      spawnTime = millis();
    }
  }
  
  // core gameplay loop
  for (let i = 0; i < apples.length; i++) {
    // display an apple and make it fall
    apples[i].display();
    apples[i].fall();
    
    // check to see if an apple has been caught
    if (((apples[i].bodyX > basket.x - (basket.size / 2)) &&
       (apples[i].bodyX < basket.x + (basket.size / 2))) && 
         ((apples[i].bodyY > basket.y - (basket.size / 2)) &&
          (apples[i].bodyY < basket.y + (basket.size / 2)))) {
      
      // determine if the correct apple is caught
      if (apples[i].type == appleTypeGoal) { // increase values if correct
        applesCollected++;
        score += 10;
        apples.splice(i, 1);
      } else { // reduce score if incorrect
        apples.splice(i, 1);
        score -= 5;
      }
    }
    
    // if an apple falls off-screen, remove it
    else if (apples[i].bodyY > height + apples[i].bodySize) {
      if (apples[i].type == appleTypeGoal) { // reduce score if correct
        score -= 10;
        apples.splice(i, 1);
      } else { // leave values as is if incorrect
        apples.splice(i, 1);
      }
    }
  }
  
  // win-lose states
  if (applesCollected >= 10) { // win
    background(253, 233, 175);
    apples = [];
    textSize(14);
    textAlign(CENTER);
    text("Nice work! You collected enough " + appleTypeGoal + " apples.", 350, (height / 2) - 20);
    text("Final Score: " + score, 350, height / 2);
    text("Press SPACE to play again", 350, ((height / 2) + 30));
  } else if (score < 0) { // lose
    background(253, 233, 175);
    apples = []; 
    textAlign(CENTER);textSize(14);
    text("Oh no!", 350, (height/2) - 20);
    text("Your score dropped too low and you only collected " + applesCollected + " " + appleTypeGoal + " apples.", 350, height / 2);
    text("Press SPACE to play again", 350, ((height / 2) + 30));
  }
}

// reset
function keyPressed() {
  if (keyCode === 32) {
    apples = [];
    applesCollected = 0;     
    score = 0;
    appleTypeGoal = random(appleTypes);
    basket.x = width / 2 ;
  }
}