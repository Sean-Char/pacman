const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = [] 
let score = 0

// 28 * 28 = 784

// 0 - pac-dots
// 1 - wall
// 2 = ghost lair
// 3 - power-pellet
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]


// create board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        }
    }
}
createBoard()

// starting position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

//up key - 38
// left - 37
// right - 39
// move left:   490 - 1; as long as 490 % 28 !== 0
// move right   490 + 1; as long as 490 % 28 < 28 -1
// move down:   490 + 28; as long as 490 + 28 < 28 * 28
// move up:     490 - 28; as long as 490 - 28 >= 0

// move pacman
function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch(e.keyCode) {
        case 40: // DOWN
        if (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&pacmanCurrentIndex + width < width * width) pacmanCurrentIndex += width 
        break
        case 38: // UP
        if (!squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&pacmanCurrentIndex - width >= 0) pacmanCurrentIndex -= width
        break
        case 37: // LEFT
        if (!squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&pacmanCurrentIndex % width !==0)
             pacmanCurrentIndex -= 1
             if (pacmanCurrentIndex === 364) { // appear left to right
                 pacmanCurrentIndex = 391
             }
        break
        case 39: // RIGHT
        if (!squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&pacmanCurrentIndex % width < width - 1)
             pacmanCurrentIndex += 1
             if (pacmanCurrentIndex === 391) {  // appear right to left
                 pacmanCurrentIndex = 364
             }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkForGameWon()
    checkForGameOver()
}
document.addEventListener('keyup', control)

// Eat pac dot & display score
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten() {
    // if square pacman is in contains power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        
        score += 10

        squares[pacmanCurrentIndex].classList.remove('power-pellet')

        ghosts.forEach(ghost => ghost.isScared = true)

        setTimeout(unScareGhost, 10000);
    }
}

function unScareGhost() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// Make Ghost blueprint
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

// Create Ghost
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// Draw my ghost onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

// Pass each ghost object to move function
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random()* directions.length)]
    
    ghost.timerId = setInterval(function() {
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
            
            // remove any ghost
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            // add direction to current index
            ghost.currentIndex += direction 
            // add back ghost class
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }

        // if ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        // if ghost is currently scared and pacman eats
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            
            ghost.currentIndex = ghost.startIndex
            score += 100

            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
    }, ghost.speed)
}

// check for game over
function checkForGameOver() { 
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && 
            !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        
        // stop moving the ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))

        // remove event listener
        document.removeEventListener('keyup', control)

        // display game over
        scoreDisplay.textContent = " GAME OVER"
    }
}

// check for game won
function checkForGameWon() {
    if (score === 374) {
        // stop each ghost moving 
        ghosts.forEach(ghost => clearInterval(ghost.timerId))

        // remove the eventListener for the control
        document.removeEventListener('keyup', control)

        // tell our user we have won
        scoreDisplay.textContent = " YOU WIN"
    }
}

