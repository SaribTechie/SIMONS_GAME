let gameSeq = [];
let userSeq = [];
let music = document.querySelector('audio');
let over = document.querySelector('#over');
let btns = ["red", "yellow", "blue", "purple"];
let started = false;
let overText = document.querySelector("#h2");
let over1 = document.querySelector("#overText");
let level = 0;

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    console.log("Game started");
    levelUp();
  }
});

document.addEventListener("touchstart", function () {
  if (!started) {
    started = true;
    console.log("Game started");
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 500);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 100);
}

function levelUp() {
  userSeq = [];
  level++;
  overText.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(`Game`);
  console.log(gameSeq);
  console.log(randIdx);
  console.log(randColor);
  btnFlash(randBtn);
}

function check(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    console.log(overText);
    overText.innerHTML = `Game Over!! Your score was ${level} Press any key to start`;
    let a = document.querySelector('body');
    a.style.backgroundColor = "red";
    setTimeout(function () {
      a.style.backgroundColor = "rgb(40, 37, 41)";
      if (over) {
        over.play();
      }
    }, 100);
    reset();
  }
}

function btnPress() {
  let btn = this;
  if (music) {
    music.play();
  }
  userFlash(btn);
  let color = btn.getAttribute("id");
  console.log(color);
  userSeq.push(color);
  check(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
  btn.addEventListener("touchstart", btnPress); // Added touchstart for mobile
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}
