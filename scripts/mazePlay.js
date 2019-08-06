// player DOM selection
const player = document.createElement('div')
player.classList.add("player")
let startCell

let playerPos = [0,0]
let zDir, sDir, qDir, dDir
let intervalTimer = 50
let playPossibility = true

// Player position DOM actualisation
function playerPosActualisation(){
  startCell.removeChild(player)
  startCell = tab[playerPos[0]][playerPos[1]]
  startCell.appendChild(player)
  testWin()
}

// ZQSD direction event
window.addEventListener('keydown', (e) => {
    if ((e.key == "z" || e.key == "ArrowUp") && playPossibility == true && playStart == true) {
      playPossibility = false
      zDir = setInterval(function () {
        if(tab[playerPos[0]][playerPos[1]].classList.contains("top")) {
          playerPos[0]--
          playerPosActualisation()
        }
      }, intervalTimer)
    }
    if ((e.key == "s" || e.key == "ArrowDown") && playPossibility == true && playStart == true) {
      playPossibility = false
      sDir = setInterval(function () {
        if(tab[playerPos[0]][playerPos[1]].classList.contains("bottom")) {
          playerPos[0]++
          playerPosActualisation()
        }
      }, intervalTimer)
    }
    if ((e.key == "q" || e.key == "ArrowLeft") && playPossibility == true && playStart == true) {
      playPossibility = false
      qDir = setInterval(function () {
        if(tab[playerPos[0]][playerPos[1]].classList.contains("left")) {
          playerPos[1]--
          playerPosActualisation()
        }
      }, intervalTimer)
    }
    if ((e.key == "d" || e.key == "ArrowRight") && playPossibility == true && playStart == true) {
      playPossibility = false
      dDir = setInterval(function () {
        if(tab[playerPos[0]][playerPos[1]].classList.contains("right")) {
          playerPos[1]++
          playerPosActualisation()
        }
      }, intervalTimer)
    }
  playerPosActualisation()
})

// ZQSD reset interval move
window.addEventListener('keyup', (e) => {
  if (e.key == "z"|| e.key == "ArrowUp") {
    clearInterval(zDir)
    playPossibility = true
  }
  if (e.key == "s"|| e.key == "ArrowDown") {
    clearInterval(sDir)
    playPossibility = true
  }
  if (e.key == "q"|| e.key == "ArrowLeft") {
    clearInterval(qDir)
    playPossibility = true
  }
  if (e.key == "d"|| e.key == "ArrowRight") {
    clearInterval(dDir)
    playPossibility = true
  }
  playerPosActualisation()
})
