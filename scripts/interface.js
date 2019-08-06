let timer ={
    seconds : 0,
    secondsDom : document.querySelector('.seconds'),
    minutes : 0,
    minutesDom : document.querySelector('.minutes'),
    secondsToMinutes : function(){
      if(this.seconds > 59){
        this.seconds = 0
        this.minutes++
      }
    },
    secondsDisplay : function(){
      if (this.seconds<10) {
        this.secondsDom.innerHTML = "0"+this.seconds
      }
      else{
        this.secondsDom.innerHTML = this.seconds
      }
    },
    minutesDisplay : function(){
      if (this.minutes<10) {
        this.minutesDom.innerHTML = "0"+this.minutes
      }
      else{
        this.minutesDom.innerHTML = this.minutes
      }
    },
}

let timerInterval
function launchTimer(){
  timerInterval = setInterval(function () {
    timer.seconds++
    timer.secondsToMinutes()
    timer.secondsDisplay()
    timer.minutesDisplay()
  }, 1000);
}

function testWin(){
  if(playerPos[0]==tab.length-1 && playerPos[1]==tab[1].length-1){
    clearInterval(timerInterval)
    playStart = false
    setTimeout(function () {
      if (difficulty == 1) {
        easyRecordSaving()
      }
      if (difficulty == 2) {
        mediumRecordSaving()
      }
      if (difficulty == 3) {
        hardRecordSaving()
      }
    }, 10);
  }
}

let button = document.querySelectorAll(".startOverlay_container_buttonContainer a")
let startOverlay = document.querySelector('.startOverlay')
button.forEach(function(e){
  e.addEventListener('click', function(){
    startOverlay.style.top = "-100%"
    difficulty = e.getAttribute("data")
    setDifficulty()
    domTabCreation()
    tabCreation()
    startCell = tab[start[0]][start[1]]
    startCell.classList.add("startCell")
    startCell.appendChild(player)
    startAndFinishCellDeclaration()

    // Generation loop
    testFreeWay(startGeneration[1],startGeneration[0])
    nextCaseGeneration()

    let generation = setInterval(function () {
      if (historic.length == 0) {
        clearInterval(generation)
        playStart = true
        launchTimer()
      }
      else{
        testFreeWay(startGeneration[1],startGeneration[0])
        if(actualCellWayPossibility.length == 0){
          historic.pop()
          startGeneration = historic[historic.length-1]
        }
        else{
          nextCaseGeneration()
        }
      }
    }, 1);
  })
})

function easyLocalRecordDisplay(){
  let easyRecordTimeDOM = document.querySelector('.easyCounter_info_local p:nth-child(2)')
  let easyRecordNameDOM = document.querySelector('.easyCounter_info_local p:nth-child(3)')
  let tempRecord

  if (localStorage.getItem("easyRecord") == null || localStorage.getItem("easyRecord") == "[\"XXX\",999]") {
    localStorage.setItem("easyRecord",JSON.stringify(["XXX",999]))
  }
  else {
    easyRecordNameDOM.innerHTML = JSON.parse(localStorage.getItem("easyRecord"))[0]
    tempRecord = JSON.parse(localStorage.getItem("easyRecord"))[1]
    let tempRecordTab = tempRecord.split('')
    if(tempRecordTab.length < 2){
        easyRecordTimeDOM.innerHTML = "00:0"+tempRecordTab[0]
    }
    else if(tempRecordTab.length < 3){
      easyRecordTimeDOM.innerHTML = "00:"+tempRecordTab[0]+tempRecordTab[1]
    }
    else if(tempRecordTab.length < 4){
      easyRecordTimeDOM.innerHTML = "0"+tempRecordTab[0]+":"+tempRecordTab[1]+tempRecordTab[2]
    }
    else if(tempRecordTab.length < 5){
      easyRecordTimeDOM.innerHTML = tempRecordTab[0]+tempRecordTab[1]+":"+tempRecordTab[2]+tempRecordTab[3]
    }
  }
}
easyLocalRecordDisplay()

function mediumLocalRecordDisplay(){
  let mediumRecordTimeDOM = document.querySelector('.mediumCounter_info_local p:nth-child(2)')
  let mediumRecordNameDOM = document.querySelector('.mediumCounter_info_local p:nth-child(3)')
  let tempRecord

  if (localStorage.getItem("mediumRecord") == null || localStorage.getItem("mediumRecord") == "[\"XXX\",999]") {
    localStorage.setItem("mediumRecord",JSON.stringify(["XXX",999]))
  }
  else {
    mediumRecordNameDOM.innerHTML = JSON.parse(localStorage.getItem("mediumRecord"))[0]
    tempRecord = JSON.parse(localStorage.getItem("mediumRecord"))[1]
    let tempRecordTab = tempRecord.split('')
    if(tempRecordTab.length < 2){
        mediumRecordTimeDOM.innerHTML = "00:0"+tempRecordTab[0]
    }
    else if(tempRecordTab.length < 3){
      mediumRecordTimeDOM.innerHTML = "00:"+tempRecordTab[0]+tempRecordTab[1]
    }
    else if(tempRecordTab.length < 4){
      mediumRecordTimeDOM.innerHTML = "0"+tempRecordTab[0]+":"+tempRecordTab[1]+tempRecordTab[2]
    }
    else if(tempRecordTab.length < 5){
      mediumRecordTimeDOM.innerHTML = tempRecordTab[0]+tempRecordTab[1]+":"+tempRecordTab[2]+tempRecordTab[3]
    }
  }
}
mediumLocalRecordDisplay()

function hardLocalRecordDisplay(){
  let hardRecordTimeDOM = document.querySelector('.hardCounter_info_local p:nth-child(2)')
  let hardRecordNameDOM = document.querySelector('.hardCounter_info_local p:nth-child(3)')
  let tempRecord

  if (localStorage.getItem("hardRecord") == null || localStorage.getItem("hardRecord") == "[\"XXX\",999]") {
    localStorage.setItem("hardRecord",JSON.stringify(["XXX",999]))
  }
  else {
    hardRecordNameDOM.innerHTML = JSON.parse(localStorage.getItem("hardRecord"))[0]
    tempRecord = JSON.parse(localStorage.getItem("hardRecord"))[1]
    let tempRecordTab = tempRecord.split('')
    if(tempRecordTab.length < 2){
        hardRecordTimeDOM.innerHTML = "00:0"+tempRecordTab[0]
    }
    else if(tempRecordTab.length < 3){
      hardRecordTimeDOM.innerHTML = "00:"+tempRecordTab[0]+tempRecordTab[1]
    }
    else if(tempRecordTab.length < 4){
      hardRecordTimeDOM.innerHTML = "0"+tempRecordTab[0]+":"+tempRecordTab[1]+tempRecordTab[2]
    }
    else if(tempRecordTab.length < 5){
      hardRecordTimeDOM.innerHTML = tempRecordTab[0]+tempRecordTab[1]+":"+tempRecordTab[2]+tempRecordTab[3]
    }
  }
}
hardLocalRecordDisplay()

function easyRecordSaving(){
  let easyRecordTimeDOM = document.querySelector('.easyCounter_info_local p:nth-child(2)')
  let easyRecordNameDOM = document.querySelector('.easyCounter_info_local p:nth-child(3)')

  let time
  if(timer.seconds<10){
    time = timer.minutes +"0"+ timer.seconds
  }
  else{
    time = timer.minutes +""+ timer.seconds
  }
  let easyRecordJSON = JSON.parse(localStorage.getItem('easyRecord'))
  let easyRecord = easyRecordJSON[1]
  console.log(easyRecordJSON,easyRecord)
  let name
  let nameJSON
  if(time<easyRecord){
    do{
      name = window.prompt("Please enter your name in 3 caracters").toUpperCase()
    }while(name.length>3 || name.length<3)
    nameJSON = JSON.stringify([name,time])
    localStorage.setItem("easyRecord",nameJSON)
    if(timer.seconds<10){
      hardRecordTimeDOM.innerHTML = timer.minutes+ ":0" + timer.seconds
    }
    else{
      hardRecordTimeDOM.innerHTML = timer.minutes+ ":" + timer.seconds
    }
    easyRecordNameDOM.innerHTML = name
  }
}

function mediumRecordSaving(){
  let mediumRecordTimeDOM = document.querySelector('.mediumCounter_info_local p:nth-child(2)')
  let mediumRecordNameDOM = document.querySelector('.mediumCounter_info_local p:nth-child(3)')

  let time
  if(timer.seconds<10){
    time = timer.minutes +"0"+ timer.seconds
  }
  else{
    time = timer.minutes +""+ timer.seconds
  }
  let mediumRecordJSON = JSON.parse(localStorage.getItem('mediumRecord'))
  let mediumRecord = mediumRecordJSON[1]
  console.log(mediumRecordJSON,mediumRecord)
  let name
  let nameJSON
  if(time<mediumRecord){
    do{
      name = window.prompt("Please enter your name in 3 caracters").toUpperCase()
    }while(name.length>3 || name.length<3)
    nameJSON = JSON.stringify([name,time])
    localStorage.setItem("mediumRecord",nameJSON)
    if(timer.seconds<10){
      hardRecordTimeDOM.innerHTML = timer.minutes+ ":0" + timer.seconds
    }
    else{
      hardRecordTimeDOM.innerHTML = timer.minutes+ ":" + timer.seconds
    }
    mediumRecordNameDOM.innerHTML = name
  }
}

function hardRecordSaving(){
  let hardRecordTimeDOM = document.querySelector('.hardCounter_info_local p:nth-child(2)')
  let hardRecordNameDOM = document.querySelector('.hardCounter_info_local p:nth-child(3)')
  let time
  if(timer.seconds<10){
    time = timer.minutes +"0"+ timer.seconds
  }
  else{
    time = timer.minutes +""+ timer.seconds
  }
  let hardRecordJSON = JSON.parse(localStorage.getItem('hardRecord'))
  let hardRecord = hardRecordJSON[1]
  console.log(hardRecordJSON,hardRecord)
  let name
  let nameJSON
  if(time<hardRecord){
    do{
      name = window.prompt("Please enter your name in 3 caracters").toUpperCase()
    }while(name.length>3 || name.length<3)
    nameJSON = JSON.stringify([name,time])
    localStorage.setItem("hardRecord",nameJSON)
    if(timer.seconds<10){
      hardRecordTimeDOM.innerHTML = timer.minutes+ ":0" + timer.seconds
    }
    else{
      hardRecordTimeDOM.innerHTML = timer.minutes+ ":" + timer.seconds
    }
    hardRecordNameDOM.innerHTML = name
  }
}
