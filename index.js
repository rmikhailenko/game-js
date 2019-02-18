class Square {
  constructor (maxX) {
    this.x = 0
    this.y = 0
    this.side = 20
    this.color = 'FFFFFF'
  }

  updateY (maxY) {
    this.y += 1
    if (this.y >= maxY) {
      this.y = 0
    }
  }
}

class GameController {
  constructor (MaxX, MaxY) {
    this.InProgress = false
    this.Items = []
    this.Score = 0
    this.MaxPositionSquare = {'x': MaxX, 'y': MaxY}
  }
  addItem () {
    this.Items.push(new Square())
  }
  moveItems () {
    for (let i = 0; i < this.Items.length; i++) {
      this.items[i].updateY(this.MaxPositionSquare[1])
    }
  }

  checkClick (pX, pY) {
    if (this.isClickOnSquare(pX, pY)) {
      this.increaseScore()
    }
  }

  isClickOnSquare (pX, pY) {
    return false
  }

  increaseScore () {
    this.Score += 1
  }
}

class GameScreen {
  constructor () {
    this.startBtn = document.getElementById('startGame')
    this.stopBtn = document.getElementById('stopGame')
    this.scoreElement = document.getElementById('score')
    this.canvasWrapper = new CanvasWrapper(document.getElementById('canvas'))
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
      let y = event.pageY - this.CanvasWrapper.canvas.offsetTop
      Listener(x, y)
    })
  }

  updateScoreElementValue (value) {
    this.scoreElement.innerHTML = value
  }
}

class CanvasWrapper {
  constructor (canvas) {
    this.canvasElement = canvas
    this.offsetX = canvas.offsetLeft
    this.offsetY = canvas.offsetTop
    this.width = canvas.width
    this.height = canvas.height
  }

  get canvas () {
    return this.canvasElement
  }
}

const initGame = () => {
  let gameScreen = new GameScreen()
  let maxX = gameScreen.canvasWrapper.width
  let maxY = gameScreen.canvasWrapper.height
  let game = new GameController(maxX, maxY)
  gameScreen.addStartEventListener(game.start)
  gameScreen.addStopEventListener(game.stop)
  gameScreen.addClickEventListener(game.checkClick)
}

document.body.onload = initGame
