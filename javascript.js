let rocket = document.querySelector(".rocket");
let moveBy = 20;
let shots=0;

window.addEventListener("load", () => {
  rocket.style.position = "absolute";
  rocket.style.left = "500px";
  rocket.style.top = "550px";
  rocket.style.width = "120px";
});

let enemy = document.querySelector(".enemy");
enemy.style.position = "absolute";
enemy.style.left = "160px";
enemy.style.top = "0px";
enemy.style.width = "15%";



moveEnemy();

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

    case "ArrowUp":
      let beam = createBeam();
      beam.style.left = parseInt(rocket.style.left) + 58 + "px";
      document.body.append(beam);
      beamMove(beam);
      playBeam();
      break;
    /*case "ArrowDown":
            rocket.style.top = parseInt(rocket.style.top) + moveBy + "px";
            break;*/
  }
});

function createBeam() {
  let beam = document.createElement("div");
  beam.style.width = "4px";
  beam.style.height = "10px";
  beam.style.backgroundColor = "yellow";
  beam.style.position = "absolute";
  beam.style.top = "550px";
  return beam;
}

function beamMove(beam) {
  let beamTop = parseInt(beam.style.top);
  beam.style.top = beamTop - 10 + "px";
  if (beamTop < 0) {
    /*console.log("in if");*/
    beam.remove();
    return;
  }
    
  if(checkHit(beam)) {
    shots +=1;
    if (shots<5){
    document.getElementById("shots").innerText=shots+ "/5";
  } else  document.getElementById("shots").innerText=(" You lazy Bastard...\nSanta is dead...\n Are You Happy?");
  playDestroy();
  beam.remove();
    if (shots>4){
      totalDestructionSound();
      santaScream();
      beam.remove();
      enemy.remove(); 
      return;
    } return;   
  }

  setTimeout(() => beamMove(beam), 40);
  
}



function moveEnemy() {
  let enemyLeft = parseInt(enemy.style.left);
  enemy.style.left = enemyLeft + 2 + "px";
  if (enemyLeft > 988) {
    let enemyTop = parseInt(enemy.style.top);
    enemy.style.top = enemyTop + 50 + "px";
    enemy.style.left = "0px";
  }
  setTimeout(() => moveEnemy(), 10);
  
  
}

function checkHit(beam) {
  let beamX = parseInt(beam.style.left);
  let beamY = parseInt(beam.style.top);
  let enemyX = parseInt(enemy.style.left);
  let enemyY =parseInt(enemy.style.top)
let enemyYWithSize = enemyY + 40;
let enemyXWithSize = enemyX + 100;
if (beamX >=enemyX && beamX <=enemyXWithSize && beamY>=enemyY&&beamY<=enemyYWithSize ){
   return true; 
  }
return false;
}


function playBeam() {
  var audio = new Audio("./mixkit-sci-fi-laser-in-space-sound-2825.wav");
  audio.play();
}
function playDestroy() {
  var audio = new Audio("./mixkit-video-game-power-up-3164.wav");
  audio.play();
}

function soundtrack() {
  var audio = new Audio("./jingle-bells-SBA-300505739-preview.mp3");
  audio.play();
}

function hohoho() {
  var audio = new Audio("./male-shouts-ho-ho-ho-merry-christmas-to-everybody-SBA-300055397-preview.mp3");
  audio.play();
}

function totalDestructionSound() {
  var audio = new Audio("./mixkit-car-explosion-debris-1562.wav");
  audio.play();
}

function santaScream() {
  var audio = new Audio("./mixkit-falling-male-scream-391.wav");
  audio.play();
}



/*function santaFall() {
  let id = null;
  const enemy = document.querySelector(".enemy");   
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++; 
      enemy.style.top = pos + "px"; 
      enemy.style.left = pos + "px"; 
    }
  }
}*/
