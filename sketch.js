var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostImg2 = loadImage("ghost-jumping.png")
  
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 400)
  ghost.addImage("ghost", ghostImg2)
  ghost.scale = 0.4

  doorsGroup = new Group()
  climbersGroup = new Group()
  invBlocksGroup = new Group()

  spookySound.loop()
  spookySound.setVolume(0.1)
}

function draw() {
  background(0);
if(gameState === "play"){
  ghost.addImage("ghost", ghostImg2)
  spawnDoor()
  if(keyDown("a")){
    ghost.x = ghost.x - 4
  }
  if(keyDown("d")){
    ghost.x = ghost.x + 4
  }
  if(keyDown("space")){
    ghost.velocityY = -12
  }
  ghost.velocityY = ghost.velocityY + 0.8
  
    if(tower.y > 400){
        tower.y = 300
      }
  if(ghost.isTouching(climbersGroup)){
    ghost.addImage("ghost", ghostImg)
    ghost.velocityY = 0
  }
  if(ghost.y > 600 || ghost.isTouching(invBlocksGroup)){
    gameState = "end"
  }
  
      drawSprites()
}
else if(gameState === "end"){
  fill("yellow")
  textSize(35)
text("Game Over", 200, 300)
}
}

function spawnDoor(){
if(frameCount%240 === 0){
  door = createSprite(200, -50)
  climber = createSprite(200, 10)
  invBlock = createSprite(200, 15)
  invBlock.width = climber.width
  invBlock.height = 2
  door.x = Math.round(random(100, 500))
  climber.x = door.x
  invBlock.x = door.x
door.velocityY = 1
climber.velocityY = 1
invBlock.velocityY = 1
invBlock.debug = true
door.addImage("door", doorImg)
climber.addImage("climber", climberImg)
ghost.depth = door.depth
ghost.depth += 1
doorsGroup.add(door)
  climbersGroup.add(climber)
  invBlocksGroup.add(invBlock)
}
}