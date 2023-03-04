const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
console.log(c);

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

class Sprite {
    constructor({
        position,
        image,
        frames= {max: 1, hold: 10},
        animate = false,
        sprites
    }){
        this.position = position
        this.image = image
        this.frames = {...frames, val:0, elapsed:0}
        this.animate = animate
        this.sprites = sprites
        this.image.onload = () => {
            this.width = this.image.width /this.frames.max
            this.height = this.image.height
        }
    
    }
    draw() {
        c.save()
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
            );
            c.restore()
            if (!this.animate) return

            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
    }
}
}





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


const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    player.draw();
    if (keys.w.pressed) {
        background.position.y += 3;
        player.image = player.sprites.up;
        player.animate = true;
    }

    else if (keys.s.pressed) {
        background.position.y -= 3;
        player.image = player.sprites.down;
        player.animate = true;
    }

    else if (keys.a.pressed) {
        background.position.x += 4;
        player.image = player.sprites.left;
        player.animate = true;
    }

    else if (keys.d.pressed) {
        background.position.x -= 4;
        player.image = player.sprites.right;
        player.animate = true;

    }else  {player.animate = false;}

    
}

animate();