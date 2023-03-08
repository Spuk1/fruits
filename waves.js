const roundTime = 10


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
    while(time <= roundTime) {
        if (time %5 === 0) {
            spawnEnemyEmby(2*diff)
        }
        document.getElementById("timer").innerHTML = roundTime -time;
        await new Promise(r => setTimeout(r, 1000))
        time++;
    }
    enemies.splice(0,enemies.length)
    document.getElementById("menu").style.display = "inline-block"
    
}

const nextWave = () => {
    console.log("next Wave")
}