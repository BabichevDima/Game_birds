const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeTop.src = "images/pipeTop.png";
pipeBottom.src = "images/pipeBottom.png";

//Звуковые файлы start.
const fly = new Audio();
const score_audio = new Audio();
const game_over = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
game_over.src = "audio/game_over.mp3";
//Звуковые файлы end.

const gap = 90;
let score = 0;

// Позиция птички start.
let xPos = 10;
let yPos = 200;
let gravity = 1;
// Позиция птички end.

// При нажатии start.
const moveUp = () => {
  yPos -= 32;
  fly.play();
};
document.addEventListener("touchstart", moveUp);
// document.addEventListener("keydown", moveUp);
// document.addEventListener("click", moveUp);
// При нажатии end.

//Создание блока
let pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0,
};

const draw = () => {
  context.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    context.drawImage(pipeTop, pipe[i].x, pipe[i].y);
    context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);

    pipe[i].x--;

    // Создаем препятствия.
    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height,
      });
    }

    // Отслеживание прикосновений.
    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeTop.width &&
        (yPos <= pipe[i].y + pipeTop.height ||
          yPos + bird.height >= pipe[i].y + pipeTop.height + gap)) ||
      yPos + bird.height >= canvas.height - fg.height
    ) {
      location.reload(); //Перезапускаем страницу.
    }
    if (pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
  }

  // context.drawImage(pipeTop, 100, 0);
  // context.drawImage(pipeBottom, 100, 0 + pipeTop.height + gap);
  context.drawImage(fg, 0, canvas.height - fg.height);
  context.drawImage(bird, xPos, yPos, 30, 25);

  yPos += gravity;

  context.fillStyle = "#000";
  context.font = "24px Verdana";
  context.fillText(`Счет: ${score}`, 10, canvas.height - 20);

  requestAnimationFrame(draw);
};

pipeBottom.onload = draw;
