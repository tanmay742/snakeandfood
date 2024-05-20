

//Game constants and Variables

let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("eat.mp3");
let gameOverSOund = new Audio("gameover.mp3");
let moveSOund = new Audio("direc.mp3");
let musicSound = new Audio('intro.mp3');
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }

]
food = { x: 6, y: 7 };

// Game Functions 

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) { return; }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if u bump in urself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if u bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) { return true; }

}

function gameEngine() {
    //part 1: updating a snake 
    if (isCollide(snakeArr)) {
        gameOverSOund.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
       
        alert("Game Over, Press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        speed = 6;
    }
    ///if you have eaten the food increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x)//jb snake ka head food k coordunate se milega tb
    {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiScore', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        speed += .4;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })//knhana khilane ka code uski length bdhegi
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };;//food ko random integer location pr daalna h a and b grid ki start and end h

    }
    //Moving the snkae

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };///????smjh nhi aaya tha ye logic

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part 2: display the snake

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {

            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);


    });

    //part 3: display the food



    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);






}













let hiscore = localStorage.getItem('hiScore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiScore', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(localStorage.getItem(hiscore));
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

//Main logic starts here.
musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//Start the game
    moveSOund.play();

    //to detect which key is pressed 
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
