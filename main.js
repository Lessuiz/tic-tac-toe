const boxes = document.querySelectorAll(".box")
const header = document.querySelector(".player")
const start = document.querySelector("#start-button")
const reset = document.querySelector("#reset-button")

const board = (() => {
  const spaces = ['', '', '', '', '', '', '', '', '']
  let lastPlayer = "o"
  let currentPlayer = "x"
  const returnLastPlayer = () => {
    if (lastPlayer === "o") {
      return [lastPlayer, "Player 2"]
    }else {
      return [lastPlayer, "Player 1"]
    }
  }
  const returnCurrentPlayer = () => {
    if (currentPlayer === "x") {
      return [currentPlayer, "Player 1"]
    }else {
      return [currentPlayer, "Player 2"]
    }
  }
  const updatePlayers = () => {
    [lastPlayer, currentPlayer] = [currentPlayer, lastPlayer]
  }
  const returnBoard = () => spaces
  const updateSpace = (index) => {
    spaces[index] = currentPlayer
    updatePlayers()
  }
  const addEvents = () => {
    boxes.forEach((box) => {
    box.addEventListener('click', boxesEvent)
})
  }
  return {
    returnBoard,
    returnCurrentPlayer,
    returnLastPlayer,
    updateSpace,
    updatePlayers,
    addEvents
  }
})()

const displayController = (() => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const gameIsWon = (player) => {
    let isWon = false
    for (let i = 0; i < winConditions.length; i++) {
      if (winConditions[i].every(value => board.returnBoard()[value] == player)) {
        isWon = true
        break
      }
    }
    return isWon
  }
  const updateGame = () => {
    board.returnBoard().forEach((box, index) => {
      boxes[index].textContent = box
    })
    if (gameIsWon(board.returnLastPlayer()[0])) {
      header.textContent = `${board.returnLastPlayer()[1]} won the game`
      boxes.forEach((box) => {
        box.removeEventListener('click', boxesEvent)
      })
    }else {
      header.textContent = `${board.returnCurrentPlayer()[1]} turn`
    }
  }
  return {
    updateGame,
    gameIsWon
  }
})()

start.addEventListener('click', () => {
  board.addEvents()
  start.parentElement.hidden = true
})

const boxesEvent = (x) => {
  if (x.target.textContent == '') {
    let index = x.target.getAttribute('data-index')
    board.updateSpace(index)
    displayController.updateGame()
  }
}

