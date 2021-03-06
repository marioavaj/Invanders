let rocket = document.querySelector(".rocket");
let moveBy = 20;
let shots = 0;
let directionLeft;
let directionTop;
let enemyDown = false;

let enemy = document.querySelector(".enemy");
enemy.style.position = "absolute";
enemy.style.left = "-170px";
enemy.style.top = "0px";
enemy.style.width = "170px";

rocket.style.position = "absolute";
rocket.style.left = "588px";
rocket.style.top = "450px";
rocket.style.width = "120px";


/*start game ----------------------------------------------------------*/
function startGame() {
  moveEnemy();
  hohoho();
  soundtrack();

  /** pohyb lode pomocou switch */
  
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        if (parseInt(rocket.style.left) > 200) {
          let rocketLeft = parseInt(rocket.style.left);
          rocket.style.left = rocketLeft - moveBy + "px";
        }
        break;
      case "ArrowRight":
        if (parseInt(rocket.style.left) < 1000) {
          let rocketRight = parseInt(rocket.style.left);
          rocket.style.left = rocketRight + moveBy + "px";
        }
        break;
    }
  });

  /**Strelba pomocou switch */

  window.addEventListener("keyup", (shots) => {
    switch (shots.key) {
      case "ArrowUp":
        let beam = createBeam();
        beam.style.left = parseInt(rocket.style.left) + 58 + "px";
        document.body.append(beam);
        beamMove(beam);
        playBeam();
        break;
    }
  });
/*vytvorenie laser. luca (div html + style css) pomocou js*/
  function createBeam() {
    let beam = document.createElement("div");
    beam.style.width = "4px";
    beam.style.height = "10px";
    beam.style.backgroundColor = "yellow";
    beam.style.position = "absolute";
    beam.style.top = "450px";
    return beam;
  }
/*pohyb luca lasera (ak nezasiahne na konci obazovky sa vymaze*/
  function beamMove(beam) {
    let beamTop = parseInt(beam.style.top);
    beam.style.top = beamTop - 10 + "px";
    if (beamTop < 0) {
      /*console.log("in if");*/
      beam.remove();
      console.log(beamTop);
      return;
    }

    /*kontrola zasahu + pocitadlo zasahov + vypis zasahov na obrazovku*/
    if (checkHit(beam)) {
      shots += 1;
      if (shots < 5) {
        document.getElementById("shots").innerText = shots + "/5";
      } else
        document.getElementById("shots").innerText =
          " You lazy Bastard...\nSanta is dead...\n Are You Happy?";
      playDestroy();
      beam.remove();

      if (shots >= 5) {
        santaScream();
        beam.remove();
        totalDestructionSound();
        enemyColaps();
        return;
      }
      return;
    }
    setTimeout(() => beamMove(beam), 10);
  }
/*zostrelenie nepriatela*/
  function enemyColaps() {
    enemy.remove();
    enemy.style.left = "-170px";
    enemy.style.top = "0px";
    enemyDown = true;
  }
/*pohyb nepriatela do prava a hore/dole s otockou na konci pomocou premennej directionLeft directionTop */
  function moveEnemy() {
    let enemyLeft = parseInt(enemy.style.left);
    let enemyTop = parseInt(enemy.style.top);
    if (enemyLeft < -169) {
      directionLeft = 1;
      enemy.style.transform = "scaleX(1)";
    }
    if (enemyLeft > 950) {
      directionLeft = -1;
      enemy.style.transform = "scaleX(-1)";
    }
    if (enemyTop < 1) {
      directionTop = 1;
    }
    if (enemyTop > Math.floor(Math.random() * 500) + 100) {
      directionTop = -1;
    }
    enemy.style.left = enemyLeft + directionLeft * 3 + "px";
    enemy.style.top = enemyTop + directionTop * 1 + "px";
    enemyTimer();
  }
  /*Opakovanie pohybu enmy + v pripade zostrelenia zastavenie pohybu enemy */
  function enemyTimer() {
    let santaSpeed = Math.floor(Math.random() * 10);
    if (enemyDown === false) {
      let enemyTimer = setTimeout(() => moveEnemy(), santaSpeed);
      return enemyTimer;
    } else {
      clearTimeout(enemyTimer);
      return enemyTimer;
    }
  }
/*Kontrola ci sa suradnice beam a enemy zhoduju*/
  function checkHit(beam) {
    let beamX = parseInt(beam.style.left);
    let beamY = parseInt(beam.style.top);
    let enemyX = parseInt(enemy.style.left);
    let enemyY = parseInt(enemy.style.top);
    let enemyYWithSize = enemyY + 40;
    let enemyXWithSize = enemyX + 100;
    if (
      beamX >= enemyX &&
      beamX <= enemyXWithSize &&
      beamY >= enemyY &&
      beamY <= enemyYWithSize
    ) {
      return true;
    }
    return false;
  }

  /**Zvuky */
  function playBeam() {
    var audio = new Audio("./mixkit-sci-fi-laser-in-space-sound-2825.wav");
    audio.play();  }
  function playDestroy() {
    var audio = new Audio("./mixkit-video-game-power-up-3164.wav");
    audio.play();  }
  function soundtrack() {
    var audio = new Audio("./jingle-bells-SBA-300505739-preview.mp3");
    audio.play();  }
  function hohoho() {
    var audio = new Audio(
      "./Merry-Chirstmas.mp3"    );
    audio.play();  }
  function totalDestructionSound() {
    var audio = new Audio("./mixkit-car-explosion-debris-1562.wav");
    audio.play();  }
  function santaScream() {
    var audio = new Audio("./mixkit-falling-male-scream-391.wav");
    audio.play();
  }
}
