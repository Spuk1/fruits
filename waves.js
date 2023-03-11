const enemies = []

const spawnEnemyEmby = (amount) => {
    for(i = 0; i<amount;i++) {
        enemies.push(
            new Sprite({
                id: i,
                position:{
                    x: Math.floor(Math.random()* canvas.width),
                    y: Math.floor(Math.random()* canvas.height)
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

const spawnEnemyFruitFly = (amount) => {
    for(i = 0; i<amount;i++) {
        enemies.push(
            new Sprite({
                id: i,
                position:{
                    x: Math.floor(Math.random()* canvas.width),
                    y: Math.floor(Math.random()* canvas.height)
                },
                sprites: {
                    up:embyImageSprite,
                    down:embyImageFront,
                    left:embyImageFront,
                    right:embyImageSprite
                },
                image: {
                    src: "./images/enemies/Fruchtfliege_Left.png"
                },
                frames: {
                    max:3,
                    hold:10
                },
                animate: true
            })
        )
    }
}

const wave1 = async(diff) => {
    player.money = 1000
    document.getElementById("parent").appendChild(moneyEle)
    moneyEle.style.right = "90%"
    time = 0;
    spawnEnemyFruitFly(2*diff)
    document.getElementById("wave").innerHTML = "Wave 1"
    while(time <= roundTime) {
        if (time %5 === 0) {
            spawnEnemyFruitFly(2*diff)
        }
        document.getElementById("timer").innerHTML = roundTime -time;
        await new Promise(r => setTimeout(r, 1000))
        time++;
    }
    enemies.splice(0,enemies.length)
    randomizeShop(currentWave);
    document.getElementById("menu").style.display = "inline-block"
    currentWave += 1
}

const wave2 = async(diff) => {
    document.getElementById("parent").appendChild(moneyEle)
    moneyEle.style.right = "90%"
    document.getElementById("menu").style.display = "none"
    time = 0;
    spawnEnemyEmby(2*diff)
    document.getElementById("wave").innerHTML = "Wave" + currentWave
    while(time <= roundTime) {
        if (time %5 === 0) {
            spawnEnemyEmby(2*diff)
        }
        document.getElementById("timer").innerHTML = roundTime -time;
        await new Promise(r => setTimeout(r, 1000))
        time++;
    }
    enemies.splice(0,enemies.length)
    randomizeShop(currentWave);
    document.getElementById("menu").style.display = "inline-block"
    currentWave += 1
}
const wave3 = async(diff) => {
    document.getElementById("parent").appendChild(moneyEle)
    moneyEle.style.right = "90%"
    document.getElementById("menu").style.display = "none"
    time = 0;
    spawnEnemyEmby(2*diff)
    document.getElementById("wave").innerHTML = "Wave" + currentWave
    while(time <= roundTime) {
        if (time %5 === 0) {
            spawnEnemyEmby(2*diff)
        }
        document.getElementById("timer").innerHTML = roundTime -time;
        await new Promise(r => setTimeout(r, 1000))
        time++;
    }
    enemies.splice(0,enemies.length)
    randomizeShop(currentWave);
    document.getElementById("menu").style.display = "inline-block"
    currentWave += 1
}
const wave4 = async(diff) => {
    document.getElementById("parent").appendChild(moneyEle)
    moneyEle.style.right = "90%"
    document.getElementById("menu").style.display = "none"
    time = 0;
    spawnEnemyEmby(2*diff)
    document.getElementById("wave").innerHTML = "Wave" + currentWave
    while(time <= roundTime) {
        if (time %5 === 0) {
            spawnEnemyEmby(2*diff)
        }
        document.getElementById("timer").innerHTML = roundTime -time;
        await new Promise(r => setTimeout(r, 1000))
        time++;
    }
    enemies.splice(0,enemies.length)
    randomizeShop(currentWave);
    document.getElementById("menu").style.display = "inline-block"
    currentWave += 1
}
const wave5 = async(diff) => {
    document.getElementById("parent").appendChild(moneyEle)
    moneyEle.style.right = "90%"
    document.getElementById("menu").style.display = "none"
    time = 0;
    spawnEnemyEmby(2*diff)
    document.getElementById("wave").innerHTML = "Wave" + currentWave
    while(time <= roundTime) {
        if (time %5 === 0) {
            spawnEnemyEmby(2*diff)
        }
        document.getElementById("timer").innerHTML = roundTime -time;
        await new Promise(r => setTimeout(r, 1000))
        time++;
    }
    enemies.splice(0,enemies.length)
    randomizeShop(currentWave);
    document.getElementById("menu").style.display = "inline-block"
    currentWave += 1
}

const nextWave = () => {
    waves[currentWave-1](1)
}