const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 600;

var roundTime = 20
var currentWave = 1
var rerollcount = 0
var rerollPrice = 7
let ongoing = false
let bossfight = false
const enemies = []



//Player Image
const playerImageDown = new Image();
playerImageDown.src = "./images/test_character/playerDown.png";

const playerImageUp = new Image();
playerImageUp.src = "./images/apfel_hinten_sprite.png";

const playerImageLeft = new Image();
playerImageLeft.src = "./images/Apfel_links.png"

const playerImageRight = new Image();
playerImageRight.src = "./images/apfel_rechts.png"

const embyImageFront = new Image();
embyImageFront.src = "./images/enemies/EmbyFront.png";

const embyImageSprite = new Image();
embyImageSprite.src = "./images/enemies/EmbySprite.png";

const arenas = [new Sprite({
    position: {
        x:0,//-canvas.width /3,
        y: 0//-canvas.height
    },
    image: {
        src: "./images/map_castle.jpg"
    }
}),new Sprite({
    position: {
        x:0,//-canvas.width /3,
        y: 0//-canvas.height
    },
    image: {
        src: "./images/elven_land_map.jpg"
    }
}),
new Sprite({
    position: {
        x:0,//-canvas.width /3,
        y: 0//-canvas.height
    },
    image: {
        src: "./images/map_skylands.png"
    }
}),
new Sprite({
    position: {
        x:0,//-canvas.width /3,
        y: 0//-canvas.height
    },
    image: {
        src: "./images/map_desert.png"
    }
})]


// create player
const player = new Sprite({
    velocity: {
        x:0,
        y:0
    },
    position: {
        x:canvas.width /2 -50,
        y:canvas.height /2
    },
    image: {
        src: playerImageLeft.src
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
    attributes: {
        damage: 0,
        attackSpeed: 0,
        meleeDmg: 0,
        rangedDmg: 0,
        Speed: 24,
        lifesteal: 0,
        range: 0,
        dodge: 0,
        hpregen: 0,
        armor: 0,
    },
        hp: {
        max:20,
        current:20
    },
})

const boss_obj = new Boss({
    position:{
        x: canvas.width/2 -100,
        y: 100
    },
    sprites: {
        left:"images/hand_left.png",
        right:"images/hand_right.png"
    },
    image: {
        src: "images/hand_left.png"
    },
    frames: {
        max:4,
        hold:8
    },
    animate: false,
    hp: 1000,
    movable: false
})


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
        await new Promise(r => setTimeout(r, 1000))
        justStarted = false
    
    
    }
    
    ownedWeapons.forEach((weapon) => {
        enemies.forEach((enemy, i) => {
            weapon.getEnemyDist(enemy,i)
    })
})
}

var isDead = false
const death = () => {
    if(player.hp.current <= 0.5 && !isDead) {
        roundTime = 1000
        moving = false
        const deathHeader = document.createElement("h1")
        deathHeader.id = "deathHeader"
        deathHeader.innerHTML = "You Died!"
        document.getElementById("parent").appendChild(deathHeader)
        const playAgainButton = document.createElement("a")
        playAgainButton.innerHTML = "PlayAgain"
        playAgainButton.id = "PlayAgainButton"
        playAgainButton.href = "./game.html"
        document.getElementById("parent").appendChild(playAgainButton)
        const mainMenu = document.createElement("a")
        mainMenu.innerHTML = "Menu"
        mainMenu.id = "MainMenu"
        mainMenu.href = "./index.html"
        document.getElementById("parent").appendChild(mainMenu)
        isDead = true
        enemies.splice(0, enemies.length)
    }
}


const you_win = () => {
        roundTime = 1000
        moving = false
        const deathHeader = document.createElement("h1")
        deathHeader.id = "deathHeader"
        deathHeader.innerHTML = "You Won!"
        document.getElementById("parent").appendChild(deathHeader)
        const playAgainButton = document.createElement("a")
        playAgainButton.innerHTML = "PlayAgain"
        playAgainButton.id = "PlayAgainButton"
        playAgainButton.href = "./game.html"
        document.getElementById("parent").appendChild(playAgainButton)
        const mainMenu = document.createElement("a")
        mainMenu.innerHTML = "Menu"
        mainMenu.id = "MainMenu"
        mainMenu.href = "./index.html"
        document.getElementById("parent").appendChild(mainMenu)
        isDead = true
        enemies.splice(0, enemies.length)

}


const checkHealth = async(obj, i) => {
    gsap.to(obj,{
        opacity: 0.7,
        duration:0.1,
        onComplete:()=>{
            gsap.to(obj,{
                opacity:1,
                duration:0.1
            })
        }
    })
    if (obj.hp <= 0 && enemies[i] === obj){
        enemies.splice(i,1)
        player.money += 10
    }
    await new Promise(r => setTimeout(r, 100))
}
const moneyEle = document.createElement("h1")
moneyEle.id = "money"

var enemy_projectiles = []

let castShadow = false;
let shadow = new Sprite({
    image:{src: "images/shadow.png"},
    opacity:0.7,
    position: {
        x : player.position.x,
        y : player.position.y},
})

let moving = true
let background = arenas[Math.floor(Math.random()*arenas.length)]

var background_audio = new Audio("audio/X2Download.app - Power Punch by 2050 - Powerful (320 kbps).mp3")
background_audio.volume = 0.4

const animate = async() => {
    window.requestAnimationFrame(animate);
    background.draw();
    if(currentWave === 5) {
        document.getElementById("Boss_Health").style.width = boss_obj.hp/1000*100 + "%";
        if(boss_obj.hp <= 0) you_win()
        if(castShadow){
            shadow.draw()
        }
    }
    player.draw();
    moneyEle.innerHTML = player.money

    if(moving) {

        if(keys.w.pressed && !(player.position.y < canvas.height/3)) player.velocity.y = -1
        else if(keys.s.pressed && !(player.position.y > canvas.height -90)) player.velocity.y = 1;
        else player.velocity.y = 0;
        if(keys.a.pressed && !(player.position.x <= 0)) player.velocity.x = -1;
        else if(keys.d.pressed && !(player.position.x >= canvas.width - player.width)) player.velocity.x = 1;
        else player.velocity.x = 0
        let velocity_normalized = Math.sqrt(Math.pow(player.velocity.x,2) + Math.pow(player.velocity.y, 2))
        if(player.velocity.x != 0 || player.velocity.y != 0){
            player.animate = true;
            player.position.x += player.velocity.x / velocity_normalized * player.attributes.Speed / 8;
            player.position.y += player.velocity.y / velocity_normalized * player.attributes.Speed / 8;
        }
        else player.animate = false;
        
        if(player.velocity.x < 0){
            player.image = player.sprites.left;
        }
        else if(player.velocity.x > 0) {
            player.image = player.sprites.right;
        }
        else if(player.velocity.y < 0) {
            player.image = player.sprites.up;
        }

    }
    //draw Enemies
    if(ongoing){
    for(let i=0;i<enemies.length;i++){
        enemies[i].draw();
        enemies[i].enemyAI();
    }
    }
 
   
    for(i=0;i<ownedWeapons.length;i++){
        ownedWeapons[i].draw()
        if(ownedWeapons[i].isAttacking === false || ownedWeapons[i].type === "weapon-ranged") {
            ownedWeapons[i].position = {
                x: player.position.x + 60 * Math.cos((i+1)*(360/6)),
                y: player.position.y + 60 * Math.sin((i+1)*(360/6))
            }
        }
    }
   
    
    //draw projectiles
    projectiles.forEach((sprite) => {
        sprite.draw()
        if(sprite.frames.val === sprite.frames.max -1) sprite.animate = false;
    })
    enemy_projectiles.forEach((sprite) => {
        sprite.draw()
        if(sprite.frames.val === sprite.frames.max -1) sprite.animate = false;
    })
    player.recieveDmg()
    if(!bossfight){
        moving = true;
    if(!bossInAir)
        attack();
}else if (isDead || bossfight){
    moving = false
    
}

}
get_starter_Item()
animate()