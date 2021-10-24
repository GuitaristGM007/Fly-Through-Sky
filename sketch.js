//declare variables for objects, score, groups, sounds, etc.
var player, playerImage1, playerImage2;
var land, landImage;
var rainingCloudGroup, rainingCloudImage;
var movingCloudGroup, movingCloudImage;
var birdGroup, birdImage;
var bg, backgroundImage1, backgroundImage2;
var play, playButton;
var reset, resetButton;
var invisibleWall1, invisibleWall2;
var bgSound, jumpSound, endSound;
var score = 0;
var gameState = "serve";

//function to load images, animations, sounds, etc.
function preload(){
//preload the image for background1
backgroundImage1 = loadImage("bgSky.jpg");
//preload the image for background2
backgroundImage2 = loadImage("bgSky.gif");
//preload the image for player
playerImage1 = loadImage("player.png");
//preload the image for land
landImage = loadImage("land.png");
//preload the image for play
playButton = loadImage("play.png");
//preload the image for reset
resetButton = loadImage("resetButton.jpg");
//preload the image for raining clouds
rainingCloudImage = loadImage("rainingCloud.gif");
//preload the image for moving clouds
movingCloudImage = loadImage("movingCloud.png");
//preload the image for birds
birdImage = loadImage("bird.gif");
//preload the audio track for bgSound
bgSound = loadSound("bgSound.mp3");
//preload the audio track for jumpSound
jumpSound = loadSound("jumpSound.mp3");
//preload the audio track for endSound
endSound = loadSound("endSound.mp3");
}

//function to setup the game
function setup() {
//create canvas of requires size
bg = createCanvas(500, 600);

//create player
player = createSprite(110, 305, 50, 75);
//add an image to player
player.addImage("initial", playerImage1);
//change the image of player
player.changeImage("initial");
//scale player
player.scale = 0.3;

//create land
land = createSprite(100, 500, 200, 200);
//add an image to land
land.addImage("base", landImage);
//change the image of land
land.changeImage("base");
//scale land
land.scale = 3;

//create play
play = createSprite(325, 275);
//add an image to play
play.addImage("start", playButton);
//change the image of play
play.changeImage("start");
//scale play
play.scale = 0.4;

//create reset
reset = createSprite(250, 300);
//add an image to reset
reset.addImage("restart", resetButton);
//change the image of reset
reset.changeImage("restart");
//scale reset
reset.scale = 0.12;

//create invisibleWall1
invisibleWall1 = createSprite(250, -5, 500, 10);
//set the visibility of invisibleWall1
invisibleWall1.visible = false;
//create invisibleWall2
invisibleWall2 = createSprite(250, 595, 500, 10);
//set the visibility of invisibleWall2
invisibleWall2.visible = false;

//create a group for rainingClouds
rainingCloudGroup = createGroup();
//create a group for movingClouds
movingCloudGroup = createGroup();
//create a group for birds
birdGroup = createGroup();
}

//function to draw the objects
function draw() {
//select a suitable color of background
background("lightBlue");

//game controls for gameState "serve"
if (gameState === "serve"){
//set a specific image of background
image(backgroundImage1, 0, 0, 500, 600);
//set velocityX of bg
bg.velocityX = 0;
//set the visibility of play
play.visible = true;
//set the visibility of reset
reset.visible = false;
//condition to change the gameState from "serve" to "play"
if (mousePressedOver(play)){
//command to change the gameState from "serve" to "play"
gameState = "play";
//set the visibility of play
play.visible = false;
player.velocityY = -8;
}
}

//game controls for gameState "play"
if (gameState === "play"){
//set a specific image of background
image(backgroundImage2, 0, 0, 500, 600);
//play bgSound
bgSound.play();
bgSound.setVolume(0.4);
//set the visibility of play
play.visible = false;
//set the visibility of reset
reset.visible = false;
//set velocityX of land
land.velocityX = -3;
//set lifetime of land
land.lifetime = 100;

//set the velocity of bg
bg.velocityX = -3;

//condition to increase the score
if (World.frameCount % 6 === 0){
//command to increase the score
score = score + 1;
}

//call the function to spawn game objects randomly
spawnGameObjects();

//add gravity to player
player.velocityY = player.velocityY + 0.4;

//condition to make player float
if (keyDown("space")){
//play jumpSound
jumpSound.play();
jumpSound.setVolume(0.4);
//command to make player float
player.velocityY = -6;
}

//condition to change the gameState from play to end
if (player.isTouching(rainingCloudGroup)){
//command to change the gameState from play to end
gameState = "end";
//destroy all the objects of all the groups
rainingCloudGroup.destroyEach();
movingCloudGroup.destroyEach();
birdGroup.destroyEach();
//play endSound
endSound.play();
//stop playing bgSound
bgSound.stop();
}
//condition to change the gameState from play to end
if (player.isTouching(movingCloudGroup)){
//command to change the gameState from play to end
gameState = "end";
//destroy all the objects of all the groups
rainingCloudGroup.destroyEach();
movingCloudGroup.destroyEach();
birdGroup.destroyEach();
//play endSound
endSound.play();
//stop playing bgSound
bgSound.stop();
}
//condition to change the gameState from play to end
if (player.isTouching(birdGroup)){
//command to change the gameState from play to end
gameState = "end";
//destroy all the objects of all the groups
rainingCloudGroup.destroyEach();
movingCloudGroup.destroyEach();
birdGroup.destroyEach();
//play endSound
endSound.play();
//stop playing bgSound
bgSound.stop();
}
//condition to change the gameState from play to end
if (player.isTouching(invisibleWall1)){
//command to change the gameState from play to end
gameState = "end";
//destroy all the objects of all the groups
rainingCloudGroup.destroyEach();
movingCloudGroup.destroyEach();
birdGroup.destroyEach();
//play endSound
endSound.play();
//stop playing bgSound
bgSound.stop();
}
//condition to change the gameState from play to end
if (player.isTouching(invisibleWall2)){
//command to change the gameState from play to end
gameState = "end";
//destroy all the objects of all the groups
rainingCloudGroup.destroyEach();
movingCloudGroup.destroyEach();
birdGroup.destroyEach();
//play endSound
endSound.play();
//stop playing bgSound
bgSound.stop();
}

//condition to make the background infinite
if (bg.x < 0){
//command to make the background infinite
bg.x = bg.width / 2;
}
}

//game controls for gameState "end"
if (gameState === "end"){
//set a specific image for background
image(backgroundImage1, 0, 0, 500, 600);
//set the visibility of reset
reset.visible = true;
//set the visibility of play
play.visible = false;
//set a specific velocity of player
player.velocityY = 0;
//destroy all the objects in all the group
rainingCloudGroup.destroyEach();
movingCloudGroup.destroyEach();
birdGroup.destroyEach();
//set a specific velocity of all the ojects in all the groups
rainingCloudGroup.setVelocityXEach(0);
movingCloudGroup.setVelocityXEach(0);
birdGroup.setVelocityXEach(0);
//set a specific lifetime of all the objects in all the groups
rainingCloudGroup.setLifetimeEach(-1);
movingCloudGroup.setLifetimeEach(-1);
birdGroup.setLifetimeEach(-1);
//destroy land
land.destroy();
}

//condition to restart the game
if (gameState === "end" && mousePressedOver(reset)){
//call the function to restart the game
again();
gameState = "play";
}

//command to draw the sprites
drawSprites();
//text for gameState "serve"
if (gameState === "serve"){
strokeWeight(7.5);
stroke("darkBlue");
fill("red");
textSize(60);
text("Fly Through Sky", 30, 60);
textSize(40);
text("Start The Game", 192.5, 200);
}
//text for gameState "play"
if (gameState === "play"){
strokeWeight(0);
stroke("black");
fill("black");
textSize(15);
text("Score : "+score, 375, 20)
}
//text for gameState "end"
if (gameState === "end"){
strokeWeight(7.5);
stroke("darkBlue");
fill("red");
textSize(40);
text("Restart The Game", 85, 225);
textSize(40);
}
}

//function to spawn raining clouds
function spawnRainingCloud(){
//create raining cloud
var rainingCloud = createSprite(510, Math.round(random(0, 600)), 75, 40);
//add a specific image to raining cloud
rainingCloud.addImage("rain", rainingCloudImage);
//scale raining clouds
rainingCloud.scale = 0.17;
//set a specific velocity of raining clouds
rainingCloud.velocityX = -3;
//set a specific lifetime of raining clouds
rainingCloud.lifetime = 180;
//add each and every raining cloud to its respective group
rainingCloudGroup.add(rainingCloud);
}

//function to spawn moving clouds
function spawnMovingCloud(){
//create movingCloud
var movingCloud = createSprite(510, Math.round(random(0, 600)), 75, 40);
//add a specific image to moving cloud
movingCloud.addImage("justMove", movingCloudImage);
//scale movingClouds
movingCloud.scale = 0.09;
//set a specific velocity of moving clouds
movingCloud.velocityX = -3;
//set a specific lifetime of moving clouds
movingCloud.lifetime = 180;
//add each and every moving cloud to its respective group
movingCloudGroup.add(movingCloud);
}

//function to spawn birds
function spawnBird(){
//create bird
var bird = createSprite(510, Math.round(random(0, 600)), 75, 40);
//add a specific image to bird
bird.addImage("flying", birdImage);
//scale bird
bird.scale = 0.06;
//set a specific velocity of bird
bird.velocityX = -3;
//set a specific lifetime of bird
bird.lifetime = 180;
//add each and every bird to its respective group
birdGroup.add(bird);
}

//function to spawn game objects randomly
function spawnGameObjects(){
//set a specific frameCount to spawn gameObjects
if (World.frameCount % Math.round(random(47, 59)) === 0){
//create a sample sprite
var rand = Math.round(random(1, 22));
//switch rand
switch (rand){
//define case 1
case 1 : spawnRainingCloud();
         spawnRainingCloud();
         spawnRainingCloud();
//break statement
break;
//define case 2
case 2 : spawnRainingCloud();
         spawnRainingCloud();
         spawnMovingCloud();
//break statement
break;
//define case 3 
case 3 : spawnRainingCloud();
         spawnMovingCloud();
         spawnRainingCloud();
//break statement
break;
//define case 4 
case 4 : spawnMovingCloud();
         spawnRainingCloud();
         spawnRainingCloud();
//break statement
break;
//define case 5 
case 5 : spawnRainingCloud();
         spawnMovingCloud();
         spawnMovingCloud();
//break statement
break;
//define case 6 
case 6 : spawnMovingCloud();
         spawnMovingCloud();
         spawnRainingCloud();
//define break
break;
//define case 7 
case 7 : spawnMovingCloud();
         spawnRainingCloud();
         spawnMovingCloud();
//break statement
break;
//define case 8 
case 8 : spawnMovingCloud();
         spawnMovingCloud();
         spawnMovingCloud();
//break statement
break;
//define case 9
case 9 : spawnRainingCloud();
         spawnBird();
         spawnBird();
//break statement
break;
//define case 10 
case 10 : spawnBird();
          spawnBird();
          spawnRainingCloud();
//break statement
break;
//define case 11
case 11 : spawnBird();
          spawnRainingCloud();
          spawnBird();
//break statement
break;
//define case 12
case 12 : spawnBird();
          spawnBird();
          spawnBird();
//break statement
break;
//define case 13
case 13 : spawnBird();
          spawnMovingCloud();
          spawnMovingCloud();
//break statement
break;
//define case 14
case 14 : spawnMovingCloud();
          spawnBird();
          spawnMovingCloud();
//break statement
break;
//define case 15 
case 15 : spawnMovingCloud();
          spawnMovingCloud();
          spawnBird();
//break statement
break;
//define case 16
case 16 : spawnRainingCloud();
          spawnRainingCloud();
          spawnBird();
//break statement
break;
//define case 17
case 17 : spawnBird();
          spawnRainingCloud();
          spawnRainingCloud();
//break statement
break;
//define case 18
case 18 : spawnRainingCloud();
          spawnBird();
          spawnRainingCloud();
//break statement
break;
//define case 19
case 19 : spawnMovingCloud();
          spawnBird();
          spawnBird();
//break statement
break;
//define case 20
case 20 : spawnBird();
          spawnBird();
          spawnMovingCloud();
//break statement
break;
//define case 21
case 21 : spawnBird();
          spawnMovingCloud();
          spawnBird();
//break statement
break;
//define case 22
case 22 : spawnGameObjects();
          spawnMovingCloud();
          spawnBird();
//break statement
break;
//default statement
default : break;
}
}
}

//function to restart the game
function again(){
//reset the score
score = 0;
//set the visibility of reset 
reset.visible = false;
//destroy al the objects in all the groups
rainingCloudGroup.destroyEach();
movingCloudGroup.destroyEach();
birdGroup.destroyEach();
//set a specific 'y' position of player
player.y = 237.5;
}