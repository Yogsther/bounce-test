canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");


player = {
    x: 50,
    y: 100,
    direction: 20,
    velocity: 5,
    width: 10,
    length: 10,
    color: [255, 66, 66],
    curve: .5
}

playerPositions = new Array();


function logic(){
    checkBounds();
    player.color = fadeColor(player.color[0], player.color[1], player.color[2]);
    direction = player.direction / (180/Math.PI)
    player.x += Math.cos(direction) * player.velocity;
    player.y += Math.sin(direction) * player.velocity;
    player.direction+=player.curve;
}

function checkBounds(){
    colliding = false;
    if(player.x > canvas.width - player.width) colliding = true; 
    if(player.x < 0) colliding = true;
    if(player.y > canvas.height - player.width) colliding = true;
    if(player.y < 0) colliding = true;
    if(colliding) player.direction += 90;

    playerPositions.push({x: player.x, y: player.y, color: player.color});
    while(playerPositions.length > player.length) playerPositions.splice(0, 1);
}


document.addEventListener("keypress", (e) => {

    switch(e.keyCode){
        case 119:
            player.velocity++;
            break;
        case 115: 
            player.velocity--;
            break;
        case 97: 
            player.curve-=.5;
            break;
        case 100: 
            player.curve+=.5;
            break;
        default: 
            player.direction = Math.floor(Math.random()*360);
    }
})

function draw(){

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(" + player.color[0] + ", " + player.color[1] + ", " + player.color[2] + ", 1)";
    ctx.fillRect(player.x, player.y, player.width, player.width)
    
    for(i = 0; i < playerPositions.length; i++){
        ctx.fillStyle = "rgba(" + playerPositions[i].color[0] + ", " + playerPositions[i].color[1] + ", " + playerPositions[i].color[2] + "," + ((i) / playerPositions.length) + ")";
        ctx.fillRect(playerPositions[i].x, playerPositions[i].y, player.width, player.width);
    }

    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText("velocity: " + player.velocity, canvas.width - 5, canvas.height - 25);
    ctx.fillText("curve: " + player.curve, canvas.width - 5, canvas.height - 10);
    
}



function loop(){
    logic();
    draw();
    requestAnimationFrame(loop);
}

loop();

function fadeColor(r, g, b) {
    if (r > 66 && b == 66) {
        r--;
        g++;
    }
    if (g > 66 && r == 66) {
        g--;
        b++;
    }
    if (b > 66 && g == 66) {
        r++;
        b--;
    }
    return [r, g, b];
}
