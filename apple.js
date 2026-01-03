class Apple {
  constructor() {
    // spawn points and body
    let spawnPoints = [
      {x: 184, y: 275},
      {x: 410, y: 255},
      {x: 290, y: 330},
      {x: 510, y: 270},
      {x: 255, y: 200},
      {x: 440, y: 170},
      {x: 365, y: 155},
      {x: 195, y: 195},
      {x: 360, y: 300},
      {x: 230, y: 310},
      {x: 300, y: 115},
      {x: 405, y: 210},
      {x: 450, y: 275},
      {x: 305, y: 245},
      {x: 235, y: 255},
    ];
    let randomSpawnPoint = random(spawnPoints);
    this.bodyX = randomSpawnPoint.x
    this.bodyY = randomSpawnPoint.y
    this.bodySize = 30;
    
    // stem
    this.stemX1 = this.bodyX - (this.bodySize / 8);
    this.stemY1 = this.bodyY - ((this.bodySize / 2) * 1.5);
    this.stemX2 = this.bodyX;
    this.stemY2 = this.bodyY - (this.bodySize / 2);
    
    // leaf
    this.leafX = this.bodyX - (this.bodySize / 5);
    this.leafY = this.bodyY - (this.bodySize / 2);
    
    // speed
    this.speed = 6;
    
    // types
    let types = [
      {type: "red", col: color(174, 31, 29)},
      {type: "green", col: color(184, 188, 61)},
      {type: "yellow", col: color(231, 188, 50)}
    ]
    let randomType = random(types);
    this.type = randomType.type;
    this.col = randomType.col;
    
    // timing
    this.spawnTime = millis();
    this.falling = false;
  }
  
  // display the apple
  display() {
    push();
    fill(this.col);
    noStroke();
    circle(this.bodyX, this.bodyY, this.bodySize);
    stroke('brown');
    strokeWeight(4);
    line(this.stemX1, this.stemY1, this.stemX2, this.stemY2);
    noStroke();
    translate(this.leafX, this.leafY);
    rotate(radians(50));
    fill(39, 166, 21);
    ellipse(0, 0, 15, 10);
    pop();
  }
  
  // make the apple fall
  fall() {
    if (!this.falling && millis() - this.spawnTime > 4000) {
      this.falling = true;
    }
    if (this.falling) {
      this.bodyY += this.speed;
      this.stemY1 += this.speed;
      this.stemY2 += this.speed;
      this.leafY += this.speed;
    }
  }
}