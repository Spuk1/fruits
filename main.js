const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 600;

const roundTime = 20
var currentWave = 1
const waves = [wave1, wave2, wave3, wave4, wave5]
var rerollcount = 0
var rerollPrice = 7


c.fillRect(0,0, canvas.width, canvas.height);



//Player Image
const playerImageDown = new Image();
playerImageDown.src = "./images/test_character/playerDown.png";

const playerImageUp = new Image();
playerImageUp.src = "./images/test_character/playerUp.png"

const playerImageLeft = new Image();
playerImageLeft.src = "./images/test_character/playerLeft.png"

const playerImageRight = new Image();
playerImageRight.src = "./images/test_character/playerRight.png"

const embyImageFront = new Image();
embyImageFront.src = "./images/enemies/EmbyFront.png";

const embyImageSprite = new Image();
embyImageSprite.src = "./images/enemies/EmbySprite.png";

const background = new Sprite({
    position: {
        x:-canvas.width /3,
        y: -canvas.height
    },
    image: {
        src: "./images/map.png"
    }
})

// create player
const player = new Sprite({
    position: {
        x:canvas.width /2 -50,
        y:canvas.height /2
    },
    image: {
        src: playerImageDown.src
    },
    frames: {
        max: 4,
        hold:8
    },
    animate: false,
    sprites: {
        up:playerImageUp,
        down: playerImageDown,
        right: playerImageRight,
        left: playerImageLeft
    },
    money: 0,
    Speed: 24,
    opacity: 1
})

//Collision detection

const getCollisionX = (obj1, obj2) => {
    return (obj1.position.x + obj1.width >= obj2.position.x &&
        obj1.position.x <= obj2.position.x + obj2.width)
}


const getCollisionY = (obj1, obj2) => {
    return (obj1.position.y <= obj2.position.y + obj2.height/2 &&
        obj1.position.y + obj1.height/2 >= obj2.position.y)
}


const getCollision =(rectangle1, rectangle2) => {
    return (
            rectangle1.position.x + rectangle1.width/1.6 >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width/1.6 &&
            rectangle1.position.y <= rectangle2.position.y + rectangle2.height/1.6 &&
            rectangle1.position.y + rectangle1.height/1.6 >= rectangle2.position.y
            )
}


//Add Event listener Movement

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    s: {
        pressed: false
    }
}

addEventListener("keydown", (event) => {
    switch(event.key) {
        case "w":
            keys.w.pressed = true;
            break;
        case 's': 
            keys.s.pressed = true; 
            break;
        case 'a': 
            keys.a.pressed = true; 
            break;
        case 'd': 
            keys.d.pressed = true; 
            break;
    }
})

addEventListener("keyup", (event) => {
    switch(event.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case 's': 
            keys.s.pressed = false; 
            break;
        case 'a': 
            keys.a.pressed = false; 
            break;
        case 'd': 
            keys.d.pressed = false; 
            break;
    }
})
var justStarted = true

const attack = async() => {
    if(justStarted){
    justStarted = false
    await new Promise(r => setTimeout(r, 1000))
    
}
    ownedWeapons.forEach((weapon,i) => {
        enemies.forEach(enemy => {
            weapon.getEnemyDist(enemy,i)
    })
});
}


const death = () => {
    if(player.hp <= 0) {
        moving = false
        const deathHeader = document.createElement("h1")
        deathHeader.id = "deathHeader"
        deathHeader.innerHTML = "You Died!"
        document.getElementById("parent").appendChild(deathHeader)
        const playAgainButton = document.createElement("button")
        playAgainButton.innerHTML = "PlayAgain"
        playAgainButton.id = "PlayAgainButton"
        document.getElementById("parent").appendChild(playAgainButton)
        const mainMenu = document.createElement("button")
        mainMenu.innerHTML = "Menu"
        mainMenu.id = "MainMenu"
        document.getElementById("parent").appendChild(mainMenu)
    }
}

const checkHealth = (obj, i) => {
    if (obj.hp <= 0){
        enemies.splice(i,1)
        player.money += 3
    }
}
const moneyEle = document.createElement("h1")
moneyEle.id = "money"

sword.buyItem()

let moving = true

const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    player.draw();
    moneyEle.innerHTML = player.money

    if(moving) {
        if (keys.w.pressed && !keys.a.pressed && !keys.d.pressed) {
            player.position.y -= player.Speed/8;
            player.image = player.sprites.up;
            player.animate = true;
            
        }
        
    
        else if (keys.s.pressed && !keys.a.pressed && !keys.d.pressed) {
            player.position.y += player.Speed/8;
            player.image = player.sprites.down;
            player.animate = true;
        }
    
        else if (keys.a.pressed && !keys.w.pressed && !keys.s.pressed) {
            player.position.x -= player.Speed /8;
            player.image = player.sprites.left;
            player.animate = true;
        }
    
        else if (keys.d.pressed && !keys.w.pressed && !keys.s.pressed) {
            player.position.x += player.Speed /8;
            player.image = player.sprites.right;
            player.animate = true;
        }
        else if (keys.d.pressed && keys.w.pressed) {
                player.position.y -= player.Speed /12;
                player.position.x += player.Speed /12;
                player.image = player.sprites.right;
                player.animate = true;
    
        }
        else if (keys.a.pressed && keys.w.pressed) {
            player.position.y -= player.Speed /12;
            player.position.x -= player.Speed /12;
            player.image = player.sprites.left;
            player.animate = true;
    
        }
        else if (keys.d.pressed && keys.s.pressed) {
        player.position.y += player.Speed /12;
        player.position.x += player.Speed /12;
        player.image = player.sprites.right;
        player.animate = true;
    
        }   
        else if (keys.a.pressed && keys.s.pressed) {
            player.position.y += player.Speed /12;
            player.position.x -= player.Speed /12;
            player.image = player.sprites.left;
            player.animate = true;
    
        }
        else  {player.animate = false;}
    }
    


    //draw Enemies
    for(let i=0;i<enemies.length;i++){
        enemies[i].draw();
        enemies[i].enemyAI();
    }
    
 
   
    for(i=0;i<ownedWeapons.length;i++){
        ownedWeapons[i].draw()
        if(ownedWeapons[i].isAttacking === false) {
            ownedWeapons[i].position = {
                x: player.position.x + 60 * Math.cos(ownedWeapons[i].slot*(360/6)),
                y: player.position.y+ 60 * Math.sin(ownedWeapons[i].slot*(360/6))
            }
        }
    }
    player.recieveDmg()
    attack()
}
wave1(1)
animate()