class Square {
  constructor (maxX) {
    this.x = Random.getNumber(0, maxX)
    this.y = 0
    this.side = Random.getNumber(30, 60)
    this.color = Random.getColor()
    this.speed = Random.getNumber(1, 7)
  }

  updateY (maxY) {
    this.y += this.speed
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
    this.MaxPosition = {
      'x': MaxX,
      'y': MaxY
    }

    // Callbacks
    this.scoreUpdatedCallback = null
    this.gameStartedCallback = null
    this.gameStoppedCallback = null
  }

  addItem () {
    this.Items.push(new Square())
  }

  moveItems () {
    for (let i = 0; i < this.Items.length; i++) {
      this.items[i].updateY(this.MaxPosition.y)
    }
  }

  getMatchingSquareIndex (x, y) {
    for (let i = 0; i < this.Items.length; i++) {
      let element = this.Items.i
      let matchX = element.x <= x && x <= element.x + element.side
      let matchY = element.y <= y && y <= element.y + element.side
      if (matchX && matchY) {
        return element
      } else {
        return -1
      }
    }
  }

  checkClick (x, y) {
    let deleteItem = this.getMatchingSquareIndex(x, y)
    if (deleteItem === -1) {
      break
    } else {
      this.Items.splice(deleteItem, 1)
    }
  }
  isClickOnSquare (pX, pY) {
    return false
  }

  increaseScore () {
    this.Score += 1
    this.scoreUpdatedCallback()
  }

  start () {
    this.InProgress = true
    this.gameStartedCallback()
  }

  stop () {
    this.InProgress = false
    this.Items = []
    this.Score = 0
    this.scoreUpdatedCallback()
    this.gameStoppedCallback()
  }

  setCallback (callbackName, callback) {
    switch (callbackName) {
      case 'onScoreUpdated':
        this.scoreUpdatedCallback = callback
        break
      case 'onGameStarted':
        this.gameStartedCallback = callback
        break
      case 'onGameStopped':
        this.gameStoppedCallback = callback
    }
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
  constructor () {
    this.intervalID = null
    this.timeoutID = null
  }

  clear () {
    clearInterval(this.intervalID)
    clearTimeout(this.timeoutID)
  }

  createInterval (callback) {
    let delay = 1000
    this.intervalID = setInterval(callback, delay)
  }

  createTimeout (callback) {
    let delay = Random.GetNumber(1000, 2000)
    this.timeoutID = setTimeout(callback, delay)
  }
}

class Animator {
  constructor (callback) {
    this.animateCallback = callback
    this.animationRunning = false
    this.requestID = null
  }

  animate () {
    if (!this.animationRunning) {
      window.cancelAnimationFrame(this.requestID)
      return
    }

    this.animateCallback()
    this.requestID = window.requestAnimationFrame(this.animate)
  }

  start () {
    this.animationRunning = true
    this.animate()
  }

  stop () {
    this.animationRunning = false
  }
}

class CanvasRect {
  constructor (square) {
    this.x = square.x
    this.y = square.y
    this.side = square.side
    this.color = square.color
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
