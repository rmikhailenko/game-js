class Square {
  constructor (maxX) {
    this.x = 0
    this.y = 0
    this.side = 20
  }

  updateY () {
    this.y += 1
    if (this.y >= this.CanvasWrapper.canvas.height) {
      this.y = 0
    }
  }
}
class GameController {
  constructor (MaxX, MaxY) {
    this.InProgress = false
    this.Items = []
    this.Score = 0
    this.MaxPositionSquare = [this.MaxX, this.MaxY]
  }
  addItem () {
    for (const item of this.Items) {
      
    }
  }
  moveItems () {
    for (let i = 0; i < this.Items.length; i++) {
    }
  }
  checkClick (pX, pY) {
  }

  isClickOnSquare() {
    return false
  }
  increaseScore() {
    this.Score += 1
  }
}

class GameScreen {
  constructor () {
    this.startBtn = document.getElementById('startGame')
    this.stopBtn = document.getElementById('stopGame')
    this.scoreElement = document.getElementById('score')
    this.CanvasWrapper = new CanvasWrapper(document.getElementById('canvas'))
  }

  AddStartEventListener (Listener) {
    this.startBtn.addEventListener('click', Listener)
  }
  AddStopEventListener (Listener) {
    this.stopBtn.addEventListener('click', Listener)
  }
  AddCanvasEventListener (Listener) {
    this.CanvasWrapper.canvas.addEventListener('click', (event) => {
      let x = event.pageX - this.CanvasWrapper.canvas.offsetLeft
      let y = event.pageY - this.CanvasWrapper.canvas.offsetLeft
      Listener(x, y)
    })
  }

  updateScoreElementValue(value) {
    this.scoreElement.innerHTML = value
  }
}

class CanvasWrapper {
  constructor (canvas) {
    this.canvasElement = canvas
  }
}

const initGame = () => {
  let gameScreen = new GameScreen()
  let maxX = gameScreen.canvasWrapper.canvas.width
  let maxY = gameScreen.canvasWrapper.canvas.height
  let game = new GameController(maxX, maxY)
  gameScreen.addStartEventListener(game.start)
  gameScreen.addStopEventListener(game.stop)
  gameScreen.addClickEventListener(game.checkClick)
}

document.body.onload = initGame
