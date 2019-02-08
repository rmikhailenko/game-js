class Square {
  constructor (maxX) {
    this.x = x
    this.y = y
    this.side = 20
    this.maxX = maxX
  }

  updateY () {
  }
}

class GameController {
  constructor (MaxX, MaxY) {
    this.InProgress = false
    this.Items = []
    this.Scoore = 0
    this.MaxPositionSquare = [this.MaxX, this.MaxY]
  }
  addItems () {
    for (const item of this.Items) {
      
    }
  }
  moveItems () {
    for (let i = 0; i < this.Items.length; i++) {
    }
  }
  checkClick (pX, pY) {
    const isClickOnSquare = () => false

    const increaseScore = () => this.Score += 1
  }
}

class GameScreen {
  constructor () {
    this.startBtn = document.getElementById('startGame')
    this.stopBtn = document.getElementById('stopGame')
    this.scoreElement = document.getElementById('score')
    // this.
  }

  addStartEventListener (Listener) {
    this.startBtn.addEventListener('click', Listener)
  }
  addStopEventListener (Listener) {
    this.stopBtn.addEventListener('click', Listener)
  }
  addCanvaseventListener (Listener) {
    this.CanvasWrapper.canvas.addEventListener('click', (event) => {
      let x = event.pageX - canvas.offsetLeft
      let y = event.pageY - canvas.offsetTop
    })
  }

  updateScoreElementValue(value) {
    this.scoreElement.innerHTML = value
  }
}

class CanvasWrapper {
  constructor (ID) {
    canvasElement = this.ID
  }
}

document.body.onload = initGame

const initGame = () => {
  let gameScreen = new GameScreen()
  let game = new GameController(MaxX, MaxY)
  gameScreen.addStartEventListener(game.start)
  gameScreen.addStopEventListener(game.stop)
  gameScreen.addClickEventListener(game.checkClick)
}
