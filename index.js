let moveemoje;
let generateemoje;
function myfunction() {
  let x = document.getElementsByClassName("emoje");
  let y = document.getElementById("text");
  if (x) {
    y.style.display = "none";
    generateemoje = setInterval(() => {
      var rock = document.createElement("div");
      rock.classList.add("emoje");
      var rockleft = parseInt(
        window.getComputedStyle(rock).getPropertyValue("left")
      );
      rock.style.left = Math.floor(Math.random() * 1100) + "px";
      board.appendChild(rock);
    }, 3000);
    moveemoje = setInterval(() => {
      var emoje = document.getElementsByClassName("emoje");
      if (emoje != undefined) {
        for (var i = 0; i < emoje.length; i++) {
          var rock = emoje[i];
          var rocktop = parseInt(
            window.getComputedStyle(rock).getPropertyValue("top")
          );
          const spaceship = rock.getBoundingClientRect();
          const aeroplane = aeroplaneRocket.getBoundingClientRect();

          const dx =
            spaceship.x +
            spaceship.width / 2 -
            (aeroplane.x + aeroplane.width / 2);
          const dy =
            spaceship.y +
            spaceship.height / 2 -
            (aeroplane.y + aeroplane.height / 2);
          const collisionOffset = 10;
          const collision =
            Math.abs(dx) <
              spaceship.width / 2 + aeroplane.width / 2 - collisionOffset &&
            Math.abs(dy) <
              spaceship.height / 2 + aeroplane.height / 2 + collisionOffset;
          if (collision) {
              gameOver();
            clearInterval(moveemoje);
            clearInterval(generateemoje);
            return;
          }
          rock.style.top = rocktop + 30 + "px";
        }
      }
    }, 1500);
    function moveBullets() {
      bulletList.forEach((bullet, index) => {
        bullet.style.bottom = parseInt(bullet.style.bottom) + 15 + "px";
        if (parseInt(bullet.style.bottom) > window.innerHeight) {
          bulletList.splice(index, 1);
          bullet.remove();
        }
        var emoje = document.getElementsByClassName("emoje");
        for (var i = 0; i < emoje.length; i++) {
          var rock = emoje[i];
          if (rock != undefined) {
            var rockbound = rock.getBoundingClientRect();
            var bulletbound = bullet.getBoundingClientRect();
            if (
              bulletbound.left >= rockbound.left &&
              bulletbound.right <= rockbound.right &&
              bulletbound.top <= rockbound.top &&
              bulletbound.bottom <= rockbound.bottom
            ) {
              rock.parentElement.removeChild(rock);
            }
          }
        }
      });
      requestAnimationFrame(moveBullets);
    }
    requestAnimationFrame(moveBullets);
    const aeroplaneRocket = document.getElementById("aeroplane");
    const bulletList = [];
    window.addEventListener("keydown", (e) => {
      var left = parseInt(
        window.getComputedStyle(aeroplane).getPropertyValue("left")
      );
      var top = parseInt(
        window.getComputedStyle(aeroplane).getPropertyValue("top")
      );
      if (e.key == "ArrowLeft" && left > 0) {
        aeroplane.style.left = left - 10 + "px";
      } else if (e.key == "ArrowRight" && left <= 1110) {
        aeroplane.style.left = left + 10 + "px";
      } else if (e.key == "ArrowUp" && top > 0) {
        aeroplane.style.top = top - 10 + "px";
      } else if (e.key == "ArrowDown" && top <= 440) {
        aeroplane.style.top = top + 10 + "px";
      }
      if (e.code === "Space") {
        e.preventDefault();
        const bullet = document.createElement("div");
        bullet.classList.add("bullet");
        bullet.style.left =
          aeroplaneRocket.offsetLeft -
          8 +
          aeroplaneRocket.offsetWidth / 2 -
          bullet.offsetWidth / 2 +
          "px";
        bullet.style.bottom = aeroplaneRocket.offsetHeight + "px";
        board.appendChild(bullet);
        bulletList.push(bullet);
      }
    });
  }
  //   function gameOver() {
  //     Dell();
  //     // document.getElementsByClassName("emoje").style.display = "none"
  //   }
}
function gameOver() {
  // var www = document.getElementsByClassName("emoje");
  var del = document.getElementById("maingame");
  clearInterval(moveemoje);
  clearInterval(generateemoje);
  if ((del.style.display = "none")) {
    del.style.display = "block";
    //   www.style.display = "none";
  }
}
function restart() {
  window.location.reload();
  // myfunction()
}
