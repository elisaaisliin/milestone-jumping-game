
document.addEventListener('DOMContentLoaded' , () => {
    const ship = document.querySelector('.ship')
    const canvas = document.querySelector('.game-canvas')
    const ground = document.querySelector('.ground')

    let isGameover = false
    let gravity = 2
    let shipLeft = 150
    let shipBottom = 300
    let gap = 400
// places player in starting position
    function startGame() {
        ship.style.left = shipLeft + 'px'
        ship.style.bottom = shipBottom + 'px'
        shipBottom -= gravity
    }
    let timerId = setInterval(startGame, 20)

 //introduces ship jumping logic   
    function jump() {
        
        ship.style.bottom = shipBottom + 'px'
        if (shipBottom < 490) shipBottom += 50
        console.log(shipBottom)
    }
    document.addEventListener('click', jump)
    document.addEventListener('touchstart', jump)
    // document.addEventListener('keyup', jump)

    //randomly generate obstacles
   function spawnObstacle() {
    let obstacleLeft = 500
    let randomHeight = Math.random() * 70
    let obstacleBottom = randomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')

    if (!isGameover) {
        obstacle.classList.add('obstacle')
        topObstacle.classList.add('topObstacle')
    }
    canvas.appendChild(obstacle)
    canvas.appendChild(topObstacle)
    obstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.bottom = obstacleBottom + gap + 'px'

// move obstacle horizontally
    function obstacleHorizontal() {
        obstacleLeft -=2
        obstacle.style.left = obstacleLeft +'px'
        topObstacle.style.left = obstacleLeft + 'px'

        // makes obstacle disapear when off screen
        if (obstacleLeft === -60) {
            clearInterval(timerId)
            canvas.removeChild(obstacle)
            canvas.removeChild(topObstacle)
        }
        // triggering game over 
        if (
            obstacleLeft > 200 && obstacleLeft > 280 && shipLeft === 220 
            && (shipBottom < obstacleBottom + 150 ||
            shipBottom > obstacleBottom  + gap -200)||
            shipBottom === 0) {
            gameOver()
            clearInterval(timerId)
        }
    }
    let timerId = setInterval(obstacleHorizontal, 20)

   //spawns more obstacles every 3 seconds
   if (!isGameover) setTimeout(spawnObstacle, 3000)
   }
   spawnObstacle()

   function gameOver() {
    clearInterval(timerId)
    console.log('game over):')
    isGameover = true
    document.removeEventListener('click', jump)
    document.removeEventListener('touchstart', jump)
   }
})

