class Boat {
  constructor(x,y,w,h,boatPos,boatAnimate){
    this.body = Bodies.rectangle(x,y,w,h);
    this.w = w
    this.h = h
    this.animation = boatAnimate
    this.imgbt = loadImage("../assets/boat.png")
    this.boatPos = boatPos
    World.add(world,this.body)
  }
  display(){
    var angle = this.body.angle
    var pos = this.body.position
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index],0,this.boatPos,this.w,this.h)
    pop();
  }
  remove(index){
    setTimeout(()=>{
      Matter.World.remove(world,navegar[index].body);
      delete navegar[index]
    },100)
  }
  animate (){
    this.speed+=0.05
  }
}