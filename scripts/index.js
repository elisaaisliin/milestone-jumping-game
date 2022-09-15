
document.addEventListener('DOMContentLoaded' , () => {
    const ship = document.querySelector('.ship')
    const canvas = document.querySelector('.game-canvas')
    const ground = document.querySelector('.ground')

    let isGameover = false
    let gravity = 2
    let shipLeft = 150
    let shipBottom = 300
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
    // document.addEventListener('touchstart', jump)
    // document.addEventListener('keyup', jump)

    //randomly generate obstacles
   function spawnObstacle() {
    let obstacleLeft = 500
    let randomHeight = Math.random() * 70
    let obstacleBottom = randomHeight
    const obstacle = document.createElement('div')
    if (!isGameover) obstacle.classList.add('obstacle')
    canvas.appendChild(obstacle)
    obstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'

// move obstacle horizontally
    function obstacleHorizontal() {
        obstacleLeft -=2
        obstacle.style.left = obstacleLeft +'px'

        // makes obstacle disapear when off screen
        if (obstacleLeft === -60) {
            clearInterval(timerId)
            canvas.removeChild(obstacle)
        }
        if (
            obstacleLeft > 200 && obstacleLeft > 280 && shipLeft === 220 
            && shipBottom < obstacleBottom + 1500||
            shipBottom === 0 ) {
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
      
    isGameover = true
    document.removeEventListener('click', control)
   }
})

