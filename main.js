function setup() {
  //crie o canvas
  canvas = createCanvas(400, 400);
  //defina o parent dele para o canvas

  canvas.parent("canvas");
  //capture a imagem de vídeo
  video = createCapture(VIDEO);
  //defina o parent dele para o video

  video.parent("video");
  video.size(400,400)
  //crie o robôzinho do ml5 poseNet para detectar a pose
  sla = ml5.poseNet(video, modelRealy);
  //mande detectar a pose
  sla.on("pose", gotR);

  raquete = createSprite(20, 200, 20, 100);
  raquete.shapeColor = 'red'
  raquete2 = createSprite(380, 200, 20, 100);
  parede1 = createSprite(200, 0, 400, 1);
  parede2 = createSprite(200, 400, 400, 1);

  bola = createSprite(200, 200, 20, 20);
}

var pontos = 0;

//crie uma variável para guardar a posiçao do pulso no eixo Y
var pY = 50;

var p = 0;
function modelRealy() {
  console.log("O modelo está pronto!");
}
//crie a function gotResult e
//mande guardar a posição do pulso na variável
function gotR(r) {
  if (r.length > 0) {
    console.log(r);
    pY = r[0].pose.rightWrist.y
    p = r[0].pose.keypoints[10].score;
  }
}

function draw() {
  background("white");

  //se a posição do pulso for menor que 350 e maior que 50, mude a posição da raquete para que seja a mesma do pulso
  if (p > 0.2 && pY < 350 && pY > 50) {
    raquete.y = pY;
  }
  textSize(30);
  text(pontos, 50, 50);
  start();
  if (bola.isTouching(raquete)) {
    pontos++;
  }
  if (bola.x > 400 || bola.x < 0) {
    reiniciar();
  }

  bola.bounceOff(raquete);
  bola.bounceOff(raquete2);
  bola.bounceOff(parede1);
  bola.bounceOff(parede2);

  raquete2.bounceOff(parede1);
  raquete2.bounceOff(parede2);

  raquete.collide(parede1);
  raquete.collide(parede2);

  drawSprites();
}

function reiniciar() {
  raquete2.velocityY = 0;
  raquete2.y = 200;
  bola.velocityX = 0;
  bola.velocityY = 0;
  bola.x = 200;
  bola.y = 200;
}
function start(){
  if(keyDown("space")){
  raquete2.velocityY = 2;
  bola.velocityX = 2;
  bola.velocityY = 2;
  }
}
/* CRIE UMA FUNÇÃO PARA INICIAR O JOGO */
/*ELA DEFINE A VELOCIDADE DA BOLA E DA RAQUETE PARA 2 */
