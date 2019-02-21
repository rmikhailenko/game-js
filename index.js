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
    this.maxItemCount = 20

    // Callbacks
    this.scoreUpdatedCallback = null
    this.gameStartedCallback = null
    this.gameStoppedCallback = null
  }

  addItem (square) {
    this.Items.push(square)
  }

  moveItems () {
    for (let i = 0; i < this.Items.length; i++) {
      this.Items[i].updateY(this.MaxPosition.y)
    }
  }

  getMatchingSquareIndex (x, y) {
    for (let i = 0; i < this.Items.length; i++) {
      let element = this.Items[i]
      let matchX = element.x <= x && x <= element.x + element.side
      let matchY = element.y <= y && y <= element.y + element.side
      if (matchX && matchY) {
        return i
      }
    }
    return -1
  }

  checkClick (x, y) {
    let matchedIndex = this.getMatchingSquareIndex(x, y)

    if (matchedIndex !== -1) {
      this.Items.splice(matchedIndex, 1)
      this.increaseScore(this.Score)
    }
  }

  increaseScore () {
    this.Score += 1
    this.scoreUpdatedCallback(this.Score)
  }

  start () {
    this.InProgress = true
    this.gameStartedCallback()
  }

  stop () {
    this.InProgress = false
    this.Items = []
    this.Score = 0
    this.scoreUpdatedCallback(this.Score)
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

  isAddItemAlowed () {
  //   if (game.Items.length >= this.maxItemCount) {
  //       return 
  //     }
  }
}

class GameScreen {
  constructor () {
    this.startBtn = document.getElementById('startGame')
    this.stopBtn = document.getElementById('stopGame')
    this.scoreElement = document.getElementById('score')
    this.canvasWrapper = new CanvasWrapper(document.getElementById('canvas'))
  }

  AddStopEventListener (listener) {
    this.stopBtn.addEventListener('click', listener)
  }

  AddCanvasEventListener (listener) {
    this.canvasWrapper.canvas.addEventListener('click', (event) => {
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

  get drawingContext () {
    return this.canvasElement.getContext('2d')
  }

  drawRect (rect) {
    let ctx = this.drawingContext
    ctx.fillStyle = rect.color
    ctx.fillRect(rect.x, rect.y, rect.side, rect.side)
  }

  clear () {
    this.drawingContext.clearRect(0, 0, this.width, this.height)	
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
    let delay = Random.getNumber(1000, 2000)
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
    this.requestID = window.requestAnimationFrame(() => this.animate())
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
  let game = new GameController(
    gameScreen.canvasWrapper.width,
    gameScreen.canvasWrapper.height
  )
  let timer = new Timer()
  let animator = new Animator(() => {
    // clean game screen
    gameScreen.сanvasWrapper.clear()
    let items = game.Items
    for (let i = 0; i < items.length; i++) {
      let rect = new CanvasRect(items[i])
      gameScreen.canvasWrapper.drawRect(rect)
    }
    game.moveItems()
  })

  game.setCallback('onScoreUpdated', (value) => gameScreen.updateScoreElementValue(value))

  game.setCallback('onGameStopped', () => {
    // first step
    animator.stop()

    // second step
    timer.clear()
  })

  game.setCallback('onGameStarted', () => {
    game.addItem(new Square(game.MaxPosition.x))
    animator.start()
    timer.createInterval(() => {
      // const maxSquarecCounts = 20
      // if (game.Items.length >= maxSquarecCounts) {
      //   return 
      // }

      let maxItemReached = false
      if (!maxItemReached) {
        timer.createTimeout(() => {
          game.addItem(new Square(game.MaxPosition.x))
        })
      }
    })

  // connect game screen buttons with game controller
  gameScreen.addStartEventListener(() => game.start())
  gameScreen.addStopEventListener(() => game.stop())
  gameScreen.addClickEventListener((x, y) => game.checkClick(x, y))
}

document.body.onload = initGame
