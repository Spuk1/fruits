const spawnEnemyEmby = (amount) => {
    for(i = 0; i<amount;i++) {
        enemies.push(
            new Sprite({
                id: i,
                position:{
                    x:+100 + (i*50),
                    y:+70 + (i*30)
                },
                sprites: {
                    up:embyImageSprite,
                    down:embyImageFront,
                    left:embyImageFront,
                    right:embyImageSprite
                },
                image: {
                    src: "./images/enemies/EmbyFront.png"
                },
                frames: {
                    max:4,
                    hold:8
                }
            })
        )
    }
}


const wait = async(time) => {
    ;
}

const wave1 = async(diff) => {
    time = 0;
    spawnEnemyEmby(2*diff)
    document.getElementById("wave").innerHTML = "Wave 1"
    while(time <= 60) {
        if (time %5 === 0) {
            spawnEnemyEmby(2*diff)
        }
        document.getElementById("timer").innerHTML = 60 -time;
        await new Promise(r => setTimeout(r, 1000))
        time++;
    }

    
}