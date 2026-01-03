class Basket {
   constructor(img) {
     this.img = img;
     this.x = width / 2;
     this.y = 550;
     this.size = 110;
     this.speed = 3;
   }
  
  // display the basket
  display() {
    image(this.img, this.x, this.y, this.size, this.size);
  }
  
  // move the basket to the left
  moveLeft() {
    this.x -= this.speed;
  }
  
  // move the basket to the right
  moveRight() {
    this.x += this.speed;
  }
}