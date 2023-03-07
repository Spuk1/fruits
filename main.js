const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

//Background Image
const image = new Image();
image.src = "./images/map.png";

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
    image: image
})


const player = new Sprite({
    position: {
        x:canvas.width /2 -50,
        y:canvas.height /2
    },
    image: playerImageDown,
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

const emby = new Sprite({
    position:{
        x:+100,
        y:+70
    },
    sprites: {
        up:embyImageSprite,
        down:embyImageFront,
        left:embyImageFront,
        right:embyImageSprite
    },
    image:embyImageFront,
    frames: {
        max:4,
        hold:8
    }
})

const swordImage = new Image();
swordImage.src = "./assets/sword.png";

const sword = new WeaponMelee({
    image: swordImage,
    position: {
        x: player.position.x,
        y: player.position.y
    },
    damage: 20
})


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




const animate = async() => {
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

    emby.draw()
    emby.enmeyAI()
    sword.draw()
    
    if(sword.isAttacking === false) {
        sword.position = {
            x: player.position.x - 20,
            y: player.position.y - 20
        }
    }
    if(sword.onCooldown === false) {
        sword.attack()}
}

animate();