const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var explosao = []
var navegar = []
var boatAnimate = []
var boatSpriteData,boatSpriteSheet

var canvas, angle, tower, ground, cannon;

function preload() {
  boatSpriteData = loadJSON("assets/boat/boat.json");
  boatSpriteSheet = loadImage("assets/boat/boat.png")
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  angleMode(DEGREES)
  angle = 20;
  cannon = new Cannon(180, 110, 130, 100, angle);
  bomb = new Bomb(cannon.x,cannon.y)
  boat = new Boat(width-79,height-60,150,150,-80)
  boatFrames = boatSpriteData.frames;
  for(var i = 0;i < boatFrames.length;i++){
    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimate.push(img)
  }
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();
  
  for(var i = 0;i < explosao.length;i++){
    showbomb(explosao[i],i);
    bateu(i);
  }
  cannon.display();
  showboat();
}
function bateu(index){
  for(var i = 0;i<navegar.length;i++){
    if(explosao[index]!==undefined&&navegar[i]!==undefined){
      var collide = Matter.SAT.collides(explosao[index].body,navegar[i].body)
      if (collide.collided){
        navegar[i].remove(i)
        Matter.World.remove(world,explosao[index].body);
        delete explosao[index]
      }
    }
  }
}
function keyPressed(){
  if (keyCode===RIGHT_ARROW){
    bomb = new Bomb(cannon.x,cannon.y);
    explosao.push(bomb)
  }
}
function showbomb(bomb, i){
  if (bomb){
    bomb.display();
    if (bomb.body.position.x >= width||bomb.body.position.y >= height-50){
      bomb.remove(i);
    }
  }
}
function showboat(){
  if (navegar.length > 0){
    if (navegar[navegar.length-1]===undefined||navegar[navegar.length-1].body.position.x < width-300){
      var positions = [-40,-60,-70,-20];
      var position = random(positions);
      var boat = new Boat(width,height-100,150,150,position,boatAnimate)
      navegar.push(boat);
    }
    for(var i = 0;i<navegar.length;i++){
      if (navegar[i]){
        Matter.Body.setVelocity(navegar[i].body,{x:-0.9,y:0});
        navegar[i].display();
        navegar[i].animate();
      }
    }
  }else{
    var boat = new Boat(width,height-100,150,150,-80,boatAnimate);
    navegar.push(boat);
  }
}

function keyReleased(){
  if (keyCode===LEFT_ARROW){
    explosao[explosao.length-1].shoot();
  }
}