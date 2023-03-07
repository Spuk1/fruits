const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 600;

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
    }
})

//spawn Enemies

const enemies = []



// Weapon

const weapons = [];
swordImagesrc = "./assets/sword.png";

const getSword = () => {
    weapons.push(
        new WeaponMelee({
            slot: weapons.length,
            image: {src: swordImagesrc},
            position: {
                x: player.position.x,
                y: player.position.y
            },
            damage: 20
        })
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



const checkHealth = (obj, i) => {
    if (obj.hp <= 0){
        enemies.splice(i,1)
        console.log(enemies)
    }
}



const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    player.draw();



    if (keys.w.pressed) {
        player.position.y -= 3;
        player.image = player.sprites.up;
        player.animate = true;
        
    }

    else if (keys.s.pressed) {
        player.position.y += 3;
        player.image = player.sprites.down;
        player.animate = true;
    }

    else if (keys.a.pressed) {
        player.position.x -= 3;
        player.image = player.sprites.left;
        player.animate = true;
    }

    else if (keys.d.pressed) {
        player.position.x += 3;
        player.image = player.sprites.right;
        player.animate = true;

    }else  {player.animate = false;}


    //draw Enemies
    for(let i=0;i<enemies.length;i++){
        enemies[i].draw();
        enemies[i].enmeyAI();
        for(let j=0;j<weapons.length;j++){
            weapons[j].getEnemyDist(enemies[i], i);
        }
        }

    //draw Weapons
    for(i=0;i<weapons.length;i++){
        weapons[i].draw()
        if(weapons[i].isAttacking === false) {
            weapons[i].position = {
                x: player.position.x + 60 * Math.cos(weapons[i].slot*(360/6)),
                y: player.position.y+ 60 * Math.sin(weapons[i].slot*(360/6))
            }
        }
    }

    
}
wave1(1)
animate();
getSword();
