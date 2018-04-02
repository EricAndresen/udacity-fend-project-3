// TODO: Make Nicholas Cage bob up and down
// TODO: enemy speeds must vary

// Enemies our player must avoid
var Enemy = function(startingY, speed = 100) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = startingY;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // This can be changed to affect level of difficulty.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(dt){
    // will update this.x and this.y
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyName) {
        
    if(keyName == 'left' && player.x > 0){
        this.x -= 25;
    } else if(keyName == 'up' && player.y > -25){
        this.y -= 25;
    } else if(keyName == 'right' && player.x < 400 ) {
        this.x += 25;
    } else if(keyName == 'down' && player.y < 400 ) {
        this.y += 25;
    }
}

const Cage = function(){
    this.sprite = "images/nicholas-cage.png";
    this.x = 225;
    this.y = 40;
}

Cage.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 75);
}

Cage.prototype.update = function() {
    if (comparePositions(player, cage, compareRadius = 30)){
        console.log("win")
        let winner = document.querySelector('.winner');
        winner.style.display = "flex";
    }
}

function addRandomEnemy() {
    // difficulty can be adjusted by changing frequency
    // its better to change difficulty with speed (see Enemy.update)
    const frequencyConstant = 0.010;
    const minDistance = 100;
    
    // check if last enemy is the minimum distance from start
    if (allEnemies[0].x > minDistance) {
        // randomly add a new enemy
        randomDecider = Math.floor(Math.random() * (1 + frequencyConstant));
        if( randomDecider == 1) {
            lane = randomLane();
            // reuse the random assignment of lane for speed
            allEnemies.unshift(new Enemy(lane, speed = lane / 2));
        }
    }
}

function randomLane() {
    lane = Math.floor(Math.random() * 3) + 1;
    switch(lane){
        case 1:
            return 65;
            break;
        case 2:
            return 150;
            break;
        case 3:
            return 225;
            break;
    }
};

function checkCollisions() {
    // if player is in the same space as enemy
    // get player x / y
    // make a for each loop for enemies
    allEnemies.forEach((enemy) => {
        if (comparePositions(player, enemy, compareRadius = 65)) {
            player.x = 200;
            player.y = 400;
        }
    })
}

function comparePositions(first, second, compareRadius) {
    let xClear = Math.abs(first.x - second.x) < compareRadius;
    let yClear = Math.abs(first.y - second.y) < compareRadius;
    return xClear && yClear;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemyOne = new Enemy(225);
let player = new Player();
let cage = new Cage();

let allEnemies = [enemyOne]

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
