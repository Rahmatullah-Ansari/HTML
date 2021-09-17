//Game constant
let inputDir={x:0,y:0};
const gameOver=new Audio("over.mp3");
const start=new Audio('start.wav');
const foodeat=new Audio('eat.mp3');
let speed=3;
let lastTime=0;
let score = 0;
let key_prees=0;
let snake_array=[
    {
        x:13,
        y:15
    }
];
food={
    x:6,
    y:7
};
//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastTime)/1000 < 1/speed){
        return;
    }
    lastTime=ctime;
    gameEngine();
}
function gameEngine(){
    //part 1: Updating snake array & food;
    if(isCollide(snake_array)){
        start.pause();
        gameOver.play();
        start.pause();
        inputDir={x:0,y:0};
        alert("Game over ,press any key to play again!")
        snake_array=[{x:13,y:15}];
        score=0;
        my_score.innerHTML = "score : "+score;
        key_prees=0;
        attempt.innerHTML = "Attempt to eat : "+key_prees;
    }
function isCollide(snakeArray){
    //if snake bite himself.
    for (let i = 1; i < snakeArray.length; i++) {
        if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y){
            return true;
        }
    }
    //if snake hit the wall
    if((snakeArray[0].x >=18 || snakeArray[0].x<=0) || (snakeArray[0].y >= 18 || snakeArray[0].y <= 0)){
        return true;
    }
}
//if food were eaten by snake update score and regenerate food.
if(snake_array[0].y === food.y && snake_array[0].x===food.x){
    foodeat.play();
    snake_array.unshift({x:snake_array[0].x+inputDir.x,y:snake_array[0].y+inputDir.y})
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    score += 1;
    my_score.innerHTML = "score : "+score;
    if(score >= 15){
        speed=4;
    }else if(score >= 30){
        speed=5;
    }
    else if(score >= 45){
        speed=6;
    }
    else if(score >= 60){
        speed=7;
    }
    else if(score >= 75){
        speed=8;
    }
    else if(score >= 90){
        speed=9;
    }
    else if(score >= 105){
        speed=10;
    }
    else if(score >= 120){
        speed=11;
    }
    else if(score >= 135){
        speed=12;
    }
    else if(score >= 150){
        speed=13;
    }
}
//moving the snake
for (let i = snake_array.length-2; i>=0; i--) {
    snake_array[i+1]={...snake_array[i]};
    
}
snake_array[0].x +=inputDir.x;
snake_array[0].y +=inputDir.y;
    //part 2: Display the snake and food;
    //Display snake element;
    board.innerHTML="";
    snake_array.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display food element;
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('snake_food');
    board.appendChild(foodElement);
}
btnLeft.addEventListener('click',()=>{
    inputDir.x=-1;
    inputDir.y=0;
    key_prees += 1;
    attempt.innerHTML = "Attempt to eat : "+key_prees;
});
btnRight.addEventListener('click',()=>{
    inputDir.x=1;
    inputDir.y=0;
    key_prees += 1;
    attempt.innerHTML = "Attempt to eat : "+key_prees;
});
btnUp.addEventListener('click',()=>{
    inputDir.x=0;
    inputDir.y=-1;
    key_prees += 1;
    attempt.innerHTML = "Attempt to eat : "+key_prees;
});
btnDown.addEventListener('click',()=>{
    inputDir.x=0;
    inputDir.y=1;
    key_prees += 1;
    attempt.innerHTML = "Attempt to eat : "+key_prees;
});
//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};//Game started
    start.play();
    //setTimeout(()=>{
        //start.pause();
    //},150);
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            key_prees += 1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            key_prees += 1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            key_prees += 1;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            key_prees += 1;
            break;
        default:
            break;
    }
    attempt.innerHTML = "Attempt to eat : "+key_prees;
});