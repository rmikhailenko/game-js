class Square {
  constructor (maxX) {
    this.x = Random.getNumber(0, maxX)
    this.y = 0
    this.side = Random.getNumber(30, 60)
    this.color = Random.getColor()
    this.speed = Random.getNumber(1, 7)
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
    this.MaxPosition = {'x': MaxX, 'y': MaxY}
  }

  addItem () {
    this.Items.push(new Square())
  }

  moveItems () {
    for (let i = 0; i < this.Items.length; i++) {
      this.items[i].updateY(this.MaxPosition.x)
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

  AddStartEventListener (listener) {
    this.startBtn.addEventListener('click', listener)
  }

  AddStopEventListener (listener) {
    this.stopBtn.addEventListener('click', listener)
  }

  AddCanvasEventListener (listener) {
    this.CanvasWrapper.canvas.addEventListener('click', (event) => {
      let x = event.pageX - this.canvasWrapper.offsetX
      let y = event.pageY - this.canvasWrapper.offsetY
      listener(x, y)
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

class Random {
  static getNumber (min, max) {
    return min + Math.floor(Math.random() * (max - min))
  }

  static getColor () {
    const getColorPart = () => {
      let hex = this.getNumber(0, 256).toString(16)
      return ('0' + String(hex)).substr(-2)
    }
    return '#' + getColorPart() + getColorPart() + getColorPart()
  }
}

class Timer {
  constructor (intervalID, timeoutID) {
    intervalID = 1000
    timeoutID = Random.getNumber(1000, 2000)
  }

  clear () {
    clearInterval(this.creatInterval())
    clearTimeout(this.createTimeout())
  }

  creatInterval (intervalID) {
    return setInterval(GameController.addItem(), intervalID)
  }

  createTimeout (timeoutID) {
    return setTimeout(GameController.addItem(), timeoutID)
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
