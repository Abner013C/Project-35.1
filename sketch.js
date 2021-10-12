var balloon,balloonImage1,balloonImage2;
var database, position;

function preload(){
  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition= database.ref("Ballon/position");
  balloonPosition.on("value", readPosition, showError);

  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw(){
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //mover el globo aerostático en dirección hacia la izquierda
    writePosition(-6, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //mover el globo aerostático en dirección hacia la derecha
    writePosition(+6, 0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //mover el globo aerostático en dirección ascendente
    writePosition(0, -6);
    balloon.scale= balloon.scale-0.003
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //mover el globo aerostático en dirección descendente
    writePosition(0, +6);
    balloon.scale= balloon.scale+0.003
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use the arrows to move the balloon",40,40);
}

function writePosition(x,y){
  database.ref('Ballon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
