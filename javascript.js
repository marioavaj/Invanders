let rocket = document.querySelector(".rocket");
let moveBy = 20;

window.addEventListener("load", () => {
  rocket.style.position = "absolute";
  rocket.style.left = "0px";
  rocket.style.top = "470px";
});

let enemy = document.querySelector(".enemy");
enemy.style.position = "absolute";
enemy.style.left = "0px";
enemy.style.top = "0px";
enemy.style.width = "7%";



moveEnemy();



window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (parseInt(rocket.style.left) > 0) {
        let rocketLeft = parseInt(rocket.style.left);
        rocket.style.left = rocketLeft - moveBy + "px";
      }
      break;
    case "ArrowRight":
      if (parseInt(rocket.style.left) < 1060) {
        let rocketRight = parseInt(rocket.style.left);
        rocket.style.left = rocketRight + moveBy + "px";
      }
      break;

    case "ArrowUp":
      let beam = createBeam();
      beam.style.left = parseInt(rocket.style.left) + 48 + "px";
      document.body.append(beam);
      beamMove(beam);
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
  beam.style.top = "450px";
  return beam;
}

function beamMove(beam) {
  let beamTop = parseInt(beam.style.top);
  beam.style.top = beamTop - 20 + "px";
  if (beamTop < 0) {
    /*console.log("in if");*/
    beam.remove();
    return;
  }

  if(checkHit(beam)) {
    enemy.remove();
    beam.remove();
    return;
  }
  
  setTimeout(() => beamMove(beam), 40);
  
}

function moveEnemy() {
  let enemyLeft = parseInt(enemy.style.left);
  enemy.style.left = enemyLeft + 5 + "px";
  if (enemyLeft > 1060) {
    let enemyTop = parseInt(enemy.style.top);
    enemy.style.top = enemyTop + 50 + "px";
    enemy.style.left = "0px";
  }
  
  setTimeout(() => moveEnemy(), 40);
  
}

function checkHit(beam) {
  let beamX = parseInt(beam.style.left);
  let beamY = parseInt(beam.style.top);
  let enemyX = parseInt(enemy.style.left);
  let enemyY =parseInt(enemy.style.top)
let enemyYWithSize = enemyY + 40;
let enemyXWithSize = enemyX + 60;
if (beamX >=enemyX && beamX <=enemyXWithSize && beamY>=enemyY&&beamY<=enemyYWithSize ){
   return true;
  
  
}
return false;
}
