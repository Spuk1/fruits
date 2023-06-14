const enemies = []
let time
let bossfight = false


const spawnEnemyEmby = (amount) => {
    for(i = 0; i<amount;i++) {
        enemies.push(
            new EnemyMelee({
                id: i,
                position:{
                    x: Math.floor(Math.random()* canvas.width),
                    y: canvas.height/3 + Math.floor(Math.random()* canvas.height-canvas.height/3)
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
                    y: Math.floor(Math.random()* canvas.height-canvas.height/3) + (canvas.height/3)
                },
                sprites: {
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
                animate: true,
                onCoolDown: Math.floor(Math.random()* 3) -1,
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
                    x: Math.floor(Math.random()* (canvas.width-50)),
                    y: Math.floor(Math.random()* canvas.height/3*2) + (canvas.height/3)
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
            })
        )
    }
}

const spawnBoss = (amount) => {
    for(i = 0; i<amount;i++) {
        enemies.push(
            new Boss({
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
        )
    }
}

const lifeReg = () => {
    if((player.hp.current + player.attributes.hpregen/5) < player.hp.max){
        player.hp.current += player.attributes.hpregen /5
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
                if (time %7 === 0 || enemies.length === 0) {
                    spawnEnemyWorm(2*diff)
                };
                break
            case 2:
                if (time %7 === 0 || enemies.length === 0) {
                    spawnEnemyFruitFly(2*diff)
                };
                break
            case 3:
                if (time %7 === 0 || enemies.length === 0) {
                    spawnEnemyEmby(3*diff)
                };
                break
            case 4:
                if (time %7 === 0 || enemies.length === 0) {
                    spawnEnemyEmby(1*diff)
                    spawnEnemyFruitFly(2*diff)
                    spawnEnemyWorm(2*diff)
                };
                break
            case 5:
                roundTime = 1000
                if(enemies.length === 0 && time === 0 ){
                document.getElementById("Boss_Healthbar").style.display = "block"
                bossfight = true;
                spawnBoss(1);
                gsap.to(canvas, {
                    opacity: 0.5,
                    yoyo: true,
                    repeat: 3
                })}
                if(time === 2) {
                    bossfight = false
                    enemies[0].movable = true
                    enemies[0].animate = true
                    
                }
                if(enemies[0].hp < 500 && time % 5 === 0) {
                    spawnEnemyEmby(1*diff)
                    spawnEnemyFruitFly(1*diff)
                    spawnEnemyWorm(1*diff)
                }
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