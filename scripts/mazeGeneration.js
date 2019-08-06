// DOM creation const & var
// const body = document.querySelector('body')
const divTable = document.querySelector('.table')
// divTable.classList.add("table")
const table = document.createElement('table')
// body.appendChild(divTable)
divTable.appendChild(table)
let cell

// Tab var
let tab = []
let temp = 0

// Initials informations
// 3 difficulties : hard : [50,80] , medium : [25,40] , easy : [12,20]
let difficulty = 1
let size
let start = [0,0]
let startGeneration
let pos

// Direction test var
let actualCell = [start[0],start[1]]

// Way generation var
let direction
let historic
let lastPosWithPossibility = []

let playStart = false

// difficulty to --> size
function setDifficulty(){
  if(difficulty==1){
    size = [12,20]
  }
  if(difficulty==2){
    size = [25,40]
  }
  if(difficulty==3){
    size = [50,80]
  }
}

// DOM tab creation
function domTabCreation(){
  for (var i = 0; i < size[0] ; i++) {
    let tr = document.createElement('tr')
    table.appendChild(tr)
    for (var j = 0; j < size[1]; j++) {
      let td = document.createElement('td')
      tr.appendChild(td)
    }
  }
  cell = document.querySelectorAll('td')
}

// Tab creation
function tabCreation(){
  for (var i = 0; i < size[0] ; i++) {
    tab.push([])
    for (var j = 0; j < size[1] ; j++) {
      tab[i].push(cell[temp])
      temp += 1
    }
  }
}

function startAndFinishCellDeclaration(){
  // Starting generation cell
  startGeneration = [tab.length-1,0] // row/col
  historic = [
    [startGeneration[0],startGeneration[1]],
  ]
  tab[startGeneration[0]][startGeneration[1]].classList.add("notClear")

  //Finishing cell
  const finishCell = document.createElement('div')
  finishCell.classList.add("finishCell")
  tab[tab.length-1][tab[1].length-1].appendChild(finishCell)
}

function testFreeWay(col,row){
  let actualCellTestWay
  actualCellWayPossibility = []

  if (typeof tab[row-1] != "undefined") {
    actualCellTestWay = tab[row-1][col].classList.contains("notClear")
    if (actualCellTestWay != true){
      actualCellWayPossibility.push("top")
    }
  }

  if (typeof tab[row+1] != "undefined") {
    actualCellTestWay = tab[row+1][col].classList.contains("notClear")
    if (actualCellTestWay != true){
      actualCellWayPossibility.push("bottom")
    }
  }

  if (typeof tab[row][col-1] != "undefined") {
    actualCellTestWay = tab[row][col-1].classList.contains("notClear")
    if (actualCellTestWay != true){
      actualCellWayPossibility.push("left")
    }
  }

  if (typeof tab[row][col+1] != "undefined") {
    actualCellTestWay = tab[row][col+1].classList.contains("notClear")
    if (actualCellTestWay != true){
      actualCellWayPossibility.push("right")
    }
  }
}


// Random direction generation

function nextCaseGeneration(){

  direction = actualCellWayPossibility[Math.floor(Math.random()*actualCellWayPossibility.length)]

  if (direction == "top") {
    tab[startGeneration[0]][startGeneration[1]].classList.add("top")
    startGeneration[0]-=1
    tab[startGeneration[0]][startGeneration[1]].classList.add("bottom")
  }
  if (direction == "bottom") {
    tab[startGeneration[0]][startGeneration[1]].classList.add("bottom")
    startGeneration[0]+=1
    tab[startGeneration[0]][startGeneration[1]].classList.add("top")
  }
  if (direction == "left") {
    tab[startGeneration[0]][startGeneration[1]].classList.add("left")
    startGeneration[1]-=1
    tab[startGeneration[0]][startGeneration[1]].classList.add("right")
  }
  if (direction == "right") {
    tab[startGeneration[0]][startGeneration[1]].classList.add("right")
    startGeneration[1]+=1
    tab[startGeneration[0]][startGeneration[1]].classList.add("left")
  }
  tab[startGeneration[0]][startGeneration[1]].classList.add("notClear")
  historic.push([startGeneration[0],startGeneration[1]])
}
