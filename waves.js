const enemies = []
let time
const spawnEnemyEmby = (amount) => {
    for(i = 0; i<amount;i++) {
        enemies.push(
            new EnemyMelee({
                id: i,
                position:{
                    x: Math.floor(Math.random()* canvas.width),
                    y: Math.floor(Math.random()* canvas.height)
                },
                sprites: {
                    up:embyImageSprite,
                    down:embyImageFront,
                    left:"./images/enemies/EmbyFront.png",
                    right:"./images/enemies/EmbyFront.png"
                },
                image: {
                    src: "./images/enemies/EmbyFront.png"
                },
                frames: {
                    max:4,
                    hold:8
                },
                animate:true
            })
        )
    }
}

const spawnEnemyFruitFly = (amount) => {
    for(i = 0; i<amount;i++) {
        enemies.push(
            new EnemyRanged({
                id: i,
                position:{
                    x: Math.floor(Math.random()* canvas.width),
                    y: Math.floor(Math.random()* canvas.height)
                },
                sprites: {
                    up:embyImageSprite,
                    down:embyImageFront,
                    left:"./images/enemies/Fruchtfliege_Left.png",
                    right:"./images/enemies/Fruchtfliege_right.png"
                },
                image: {
                    src: "./images/enemies/Fruchtfliege_Left.png"
                },
                frames: {
                    max:4,
                    hold:8
                },
                animate: true
            })
        )
    }
}
const spawnEnemyWorm = (amount) => {
    for(i = 0; i<amount;i++) {
        enemies.push(
            new EnemyMelee({
                id: i,
                position:{
                    x: Math.floor(Math.random()* canvas.width),
                    y: Math.floor(Math.random()* canvas.height)
                },
                sprites: {
                    left:"images/wurm links.png",
                    right:"images/wurm right.png"
                },
                image: {
                    src: "images/wurm links.png"
                },
                frames: {
                    max:4,
                    hold:8
                },
                animate: true,
                onCoolDown: Math.floor(Math.random()*-3)
            })
        )
    }
}

const lifeReg = () => {
    if((player.hp.current + player.hpregen/5) < player.hp.max){
        player.hp.current += player.hpregen /5
    } else player.hp.current = player.hp.max
}

const initWave = () => {
    moving = true
    document.getElementById("parent").appendChild(moneyEle)
    moneyEle.style.right = "90%"
    time = 0;
    if (currentWave === 1) {
    player.money = 1000
    player.hp.max = 20
    }
    player.hp.current = player.hp.max
    document.getElementById("wave").innerHTML = "Wave " + currentWave
    document.getElementById("menu").style.display = "none"
}


const wave = async(diff) => {
    initWave()
    while(time <= roundTime && !isDead) {
        switch (currentWave){
            case 1: 
                if (time === 0) {
                    spawnEnemyWorm(2*diff)
                }
                else if (time %7 === 0) {
                    spawnEnemyWorm(2*diff)
                };
                break
            case 2:
                if (time === 0) {
                    spawnEnemyFruitFly(2*diff)
                }
                else if (time %7 === 0) {
                    spawnEnemyFruitFly(2*diff)
                };
                break
            case 3:
                if (time === 0) {
                    spawnEnemyEmby(3*diff)
                }
                else if (time %7 === 0) {
                    spawnEnemyEmby(3*diff)
                };
                break
            case 4:
                if (time === 0) {
                    spawnEnemyEmby(4*diff)
                    }
                else if (time %7 === 0) {
                    spawnEnemyEmby(4*diff)
                };
                break
        }
        document.getElementById("timer").innerHTML = roundTime -time;
        lifeReg()
        await new Promise(r => setTimeout(r, 1000))
        time++;
    }
    enemies.splice(0,enemies.length)
    if(!isDead) {
        randomizeShop(currentWave);
        document.getElementById("menu").style.display = "inline-block"
        currentWave += 1
    }
}


const nextWave = () => {
    wave(1)
}