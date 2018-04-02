/* TODO:
    1. When enemy and player occupy same space player dies / respawns
    2. insert Gem on map
    3. When player reaches Gem, there is a win sequence
    4. Limit players movement to map.
*/

// Enemies our player must avoid
var Enemy = function(startingY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = startingY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // This can be changed to affect level of difficulty.
    this.x += 50 * dt;
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
    switch(keyName) {
        case 'left':
            this.x -= 25;
            break;
        case 'up':
            this.y -= 25;
            break;
        case 'right':
            this.x += 25;
            break;
        case 'down':
            this.y += 25;
            break;
    }
}

function addRandomEnemy(dt) {
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
            allEnemies.unshift(new Enemy(lane));
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
        if (comparePositions(player, enemy)) {
            player.x = 200;
            player.y = 400;
        }
    })
}

function comparePositions(first, second) {
    let xClear = Math.abs(first.x - second.x) < 65;
    let yClear = Math.abs(first.y - second.y) < 65;
    return xClear && yClear;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemyOne = new Enemy(65);
let player = new Player();

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
