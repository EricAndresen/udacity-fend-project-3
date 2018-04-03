// TODO: Make Nicholas Cage bob up and down

// Lady Bugs that try to kill you, startingY determines which lane it is in
class Enemy {
    constructor(startingY, speed = 100) {
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = startingY;
        this.speed = speed;
    }
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // Multiplying by dt keeps speed constant across computers
        this.x += this.speed * dt;
        this.checkCollisions(this, player);
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // If player and enemy collide, reset player
    checkCollisions(first, second) {
        if (comparePositions(first, second)) {
            second.x = 200;
            second.y = 400;
        }
    }
};


class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.x = 200;
        this.y = 400;
    }
    // Paint player on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    // Move player, bounded by the canvas
    handleInput(keyName) {
        if(keyName == 'left' && this.x > 0){
            this.x -= 25;
        } else if(keyName == 'up' && this.y > -25){
            this.y -= 25;
        } else if(keyName == 'right' && this.x < 400 ) {
            this.x += 25;
        } else if(keyName == 'down' && this.y < 400 ) {
            this.y += 25;
        }

        this.checkIfWon(this);
    }

    // If player and cage are in the same place, reveal win div
    checkIfWon(playerInstance, cageInstance = cage) {
        if (comparePositions(playerInstance, cageInstance, 45)) {
            let winner = document.querySelector('.winner');
            winner.style.display = "flex";
        }
    }
}


// Make nicholas cage. Kept in class, so can make multiple in the future 
class Cage {
    constructor() {
        this.sprite = "images/nicholas-cage.png";
        this.x = 225;
        this.y = 0;
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 75);
    }

}


// Adds enemies at random intervals
function addRandomEnemy() {
    // difficulty can be adjusted by changing frequency
    const frequencyConstant = 0.05;
    
    // if last created bug is far enough that it won't overlap randomly generate another
    const minDistance = 100;
    if (allEnemies[0].x > minDistance) {
        // randomly add a new enemy
        randomDecider = Math.floor(Math.random() * (1 + frequencyConstant));
        if( randomDecider == 1) {
            lane = randomLane();
            // reuse the random assignment of lane for speed
            allEnemies.unshift(new Enemy(lane, speed = lane * 0.75));
        }
    }
}


// Randomly returns lane 1-3
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


// check if first and second object overlap
function comparePositions(first, second, compareRadius = 65) {
    let xClear = Math.abs(first.x - second.x) < compareRadius;
    let yClear = Math.abs(first.y - second.y) < compareRadius;
    return xClear && yClear;
}

// Instantiate Classes

let enemyOne = new Enemy(225);
let player = new Player();
let cage = new Cage();

let allEnemies = [enemyOne]

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
