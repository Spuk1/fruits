let dmgCD = false
var projectiles = []


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

class Sprite {
    constructor({
        id,
        velocity = { x: 0, y: 0 },
        position,
        image,
        frames = { max: 1, hold: 10 },
        animate = false,
        sprites,
        hp = { max: 20, current: 20 },
        money = 0,
        attributes = {
            damage: 0,
            attackSpeed: 0,
            meleeDmg: 0,
            rangedDmg: 0,
            Speed: 0,
            lifesteal: 0,
            range: 0,
            dodge: 0,
            hpregen: 0,
            armor: 0,
        },
        rotation = 0,
    }) {
        this.velocity = velocity
        this.id = id
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.animate = animate
        this.sprites = sprites
        this.hp = hp
        this.money = money
        this.attributes = attributes
        this.image = new Image()
        this.image.src = image.src
        this.opacity = 1
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.rotation = rotation
        this.index
        this.finished
    }
    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        c.rotate(this.rotation)
        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
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

    recieveDmg = async () => {
        document.getElementById("health").innerHTML = Math.floor((this.hp.current))
        await new Promise(r => setTimeout(r, 200))
        if (!dmgCD) {
            for (let i = 0; i < enemies.length; i++) {
                let enemy = enemies[i]
                if (getCollision(this, enemy) && !(enemy === enemies[0] && bossInAir)) {
                    let hurt = new Audio("audio/413175__micahlg__male_hurt10.ogg")
                    hurt.play()
                    dmgCD = true
                    if (Math.random() * 100 >= this.attributes.dodge)
                        this.hp.current -= enemy.damage * (1 + this.attributes.armor / 100)
                    gsap.to(this, {
                        opacity: 0,
                        repeat: 5,
                        yoyo: true,
                        duration: 0.08,
                        onComplete: async () => {
                            this.opacity = 1
                            await new Promise(r => setTimeout(r, 1000))
                            dmgCD = false
                            
                        }
                    }
                    );
                    break
                }
            }
            for (let i = 0; i < enemy_projectiles.length; i++) {
                let projectile = enemy_projectiles[i]
                if (getCollision(this, projectile)) {
                    let hurt = new Audio("audio/413175__micahlg__male_hurt10.ogg")
                    hurt.play()
                    dmgCD = true
                    if (Math.random() * 100 >= this.attributes.dodge) {
                        this.hp.current -= projectile.attributes.damage * (1 + this.attributes.armor / 100);

                    }
                    gsap.to(this, {
                        opacity: 0,
                        repeat: 5,
                        yoyo: true,
                        duration: 0.08,
                        onComplete: async () => {
                            this.opacity = 1
                            await new Promise(r => setTimeout(r, 1000))
                            dmgCD = false
                        }
                    }
                    );
                    break
                }
            }
        }
        death()

    }
}

class EnemyMelee extends Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        animate = true,
        sprites,
        hp = 20,
        Speed = 2,
        damage = 3,
    }) {
        super({
            position, image, animate, frames, sprites
        })
        this.hp = hp
        this.damage = damage
        this.Speed = Speed,
            this.onCooldown = false
        this.movable = true
    }
    enemyAI() {
        this.run()
    }
    run = async () => {
        await new Promise(r => setTimeout(r, 100))
        this.movable = true
        if (this.position.x + this.width / 2 <= player.position.x) {
            this.image.src = this.sprites.right
            for (let i = 0; i < enemies.length; i++) {
                let e = enemies[i]
                if (e === this) continue
                this.movable = true
                if (getCollisionX(this, e)) {
                    this.movable = false
                    this.position.x, e.position.x += this.Speed * 0.8
                    break
                    //console.log("should be false"
                }
            }
            if (this.movable) this.position.x += this.Speed
        }
        else if (this.position.x >= player.position.x + player.width / 2) {
            this.image.src = this.sprites.left
            for (let i = 0; i < enemies.length; i++) {
                let e = enemies[i]
                if (e === this) continue
                this.movable = true
                if (getCollisionX(this, e)) {
                    this.movable = false
                    this.position.x, e.position.x -= this.Speed * 0.8
                    //console.log("should be false")
                    break
                }
            }
            if (this.movable) this.position.x -= this.Speed
        }
        if (this.position.y >= player.position.y + player.height / 2) {
            for (let i = 0; i < enemies.length; i++) {
                const e = enemies[i]
                if (e === this) continue
                this.movable = true
                if (getCollisionY(this, e)) {
                    this.movable = false
                    this.position.y, e.position.y -= this.Speed * 0.8
                    //console.log("should be false")
                    break
                }
            }
            if (this.movable) this.position.y -= this.Speed * 0.8
        }
        else if (this.position.y + this.height / 2 <= player.position.y) {
            for (let i = 0; i < enemies.length; i++) {
                const e = enemies[i]
                if (e === this) continue
                this.movable = true
                if (getCollisionY(this, e)) {
                    this.movable = false
                    this.position.y, e.position.y += this.Speed * 0.8
                    //console.log("should be false")
                    break
                }
            }
            if (this.movable) this.position.y += this.Speed
        }


    }
    attack = () => {
        
        this.onCooldown = true;
        this.movable = false
        gsap.to(this, {
            opacity: 0.6,
            repeat: 2,
            yoyo: true,
            duration: 0.2,
            onComplete: () => {
                let currentPosition = this.position
                this.opacity = 1
                gsap.to(this.position, {
                    x: player.position.x + player.width / 2,
                    y: player.position.y - player.height / 2,
                    onComplete: () => {
                        gsap.to(this.position, {
                            x: currentPosition.x,
                            y: currentPosition.y,
                            onComplete: async () => {
                                await new Promise(r => setTimeout(r, 5000));
                                this.onCooldown = false;
                                this.movable = true
                            }
                        })
                    }
                })
            }
        })

    }
    getPlayerDist = (obj, i) => {
        let Distance = Math.sqrt(Math.pow((this.position.x - player.position.x), 2) + Math.pow((this.position.y - player.position.y), 2));
        if (Distance < (300) && !this.onCooldown) {
            this.attack()
        }
    }
}


class EnemyRanged extends EnemyMelee {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        animate = true,
        sprites,
        hp = 20,
        Speed = 2,
        damage = 3,
        state = 0,
        onCooldown = 0,
        movable,
        isAttacking = false
    }) {
        super({
            position, image, animate, frames, sprites, hp, damage, Speed, onCooldown, movable
        })
        this.state = state
        this.coolDown = onCooldown
        this.move = true
        this.isAttacking = isAttacking
        this.damage = damage
    }
    enemyAI = () => {
        switch (this.state) {
            case 0:
                if (this.move)
                    this.run_random()
                break
            case 1:
                if (!this.isAttacking)
                    this.rAttack()
                break
        }
    }
    run_random = async () => {
        this.move = false
        if (this.coolDown >= 2) {
            this.state = 1
        }
        var velocity = {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1
        }
        var distance = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2))
        var running = true
        var counter = 0

        while (running) {
            if (this.position.x < 100) this.position.x += Math.abs(velocity.x / distance)
            else if (this.position.x > canvas.width - 100) this.position.x += Math.abs(velocity.x / distance) * -1
            else if (this.position.y < 100) this.position.y += Math.abs(velocity.y / distance)
            else if (this.position.y > canvas.height - 100) this.position.y += Math.abs(velocity.y / distance) * -1
            else {
                this.position.x += velocity.x / distance
                this.position.y += velocity.y / distance
            }
            if (velocity.x < 0) this.image.src = this.sprites.left
            else this.image.src = this.sprites.right
            counter += 1
            if (counter === 100) running = false
            await new Promise(r => setTimeout(r, 5))
        }
        await new Promise(r => setTimeout(r, 200))
        this.coolDown += 1
        this.move = true
    }
    rAttack = async () => {
        let audio = new Audio("audio/366808__gidion__owi-spit.wav")
        this.isAttacking = true
        //Attack logic here
        var shot = new Sprite({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            attributes: {
                damage: this.damage
            },
            image: { src: "images/fruitfly_shot.png" }
        }
        )
        var velocity = {
            x: (player.position.x - this.position.x),
            y: (player.position.y - this.position.y)
        }
        var Distance = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2))
        velocity = {
            x: velocity.x / Distance,
            y: velocity.y / Distance
        }

        enemy_projectiles.push(shot)
        var index = projectiles.find(element => element === shot)
        let finished = false
        let angle = -(Math.atan(velocity.x / velocity.y) - Math.PI / 2)
        if (velocity.y >= 0) angle = angle + Math.PI
        shot.rotation = angle
        while (!finished) {
            shot.position.x += velocity.x
            shot.position.y += velocity.y
            if (shot.position.x < 0 || shot.position.y < 0 || shot.position.x > canvas.width || shot.position.y > canvas.height) {
                enemy_projectiles.splice(index, 1)
                finished = true
            }
            await new Promise(r => setTimeout(r, 1))
        }

        this.isAttacking = false
        this.state = 0
        this.coolDown = 0
    }
}


let bossInAir = false;

class Boss extends Sprite {
    constructor({
        position,
        name,
        image,
        frames = { max: 1, hold: 10 },
        animate = false,
        sprites,
        hp = 1000,
        Speed = 0,
        damage = 10,
        rangedDmg = 5,
        movable
    }) {
        super({
            position, image, animate, frames, sprites, movable,
        })
        this.hp = hp
        this.damage = damage
        this.Speed = Speed
        this.onCooldown = false
        this.movable = movable
        this.name = name
        this.attack_state = 0
        this.state = 0
        this.rangedDmg = rangedDmg
        this.count = 0
        this.amount = 0
        this.attack = 0
    }
    enemyAI = async() => {
        console.log(this.isAttacking, this.state)
        switch(this.state){
            case 0:
                await new Promise(r => setTimeout(r, 3000))
                this.state = 1
            case 1:
                if(!this.isAttacking) this.attack_Slam()
                this.amount = 0
            case 2:
                    this.count = 0
                    if(!this.isAttacking){
                        spit_audio.play()
                        this.ranged_Attack()
                        this.amount++
                    }
                    else this.state = 3
            case 3:
                    this.count++
                    if(this.count > 300)
                    if(this.amount <5) this.state = 2
                    else this.state = 1
                }
                    
        }
    attack_Slam = async() => {
        this.isAttacking = true
        switch (this.attack_state){
            case 0:
                let jump_audio = new Audio("audio/394416__inspectorj__bamboo-swing-a3.wav")
                jump_audio.play()
                this.animate  = false
                gsap.to(this.position, {
                    y: -100,
                    duration: 1,
                })
                await new Promise(r => setTimeout(r, 2000))
                this.attack_state = 1
               
            case 1:
                bossInAir = true
                if(!castShadow){
                    shadow.position.x = player.position.x - 50
                    shadow.position.y = player.position.y - 50
                }
                
                castShadow = true;
                if(castShadow){
                    await new Promise(r => setTimeout(r, 500))
                    this.attack_state = 2
                }
                
            case 2:
                    let crash_audio = new Audio("audio/649191__ayadrevis__explosion.ogg")
                    crash_audio.play()
                    gsap.to(this.position, {
                        x: shadow.position.x,
                        y: shadow.position.y +100,
                        duration: 0.5
                    })
                    bossInAir = false
                    await new Promise(r => setTimeout(r, 1000))
                    this.attack_state = 3
                    castShadow = false
            case 3:
                    gsap.to(this.position, {
                    x: canvas.width/2 - 100,
                    y: 100,
                    duration: 1
                })
                
                await new Promise(r => setTimeout(r, 1000))
                this.isAttacking = false
                this.attack_state = 0
                this.animate = true
                this.state = 2
                
                }
            

        }
        ranged_Attack =  async() => {
            this.isAttacking = true
            //Attack logic here
            var shots = []
            if (this.attack === 0){
                this.attack = 1
                for(let i = 0; i <= 8; i++) {
                
                shots.push(new Sprite({
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                attributes: {
                    damage: this.rangedDmg
                },
                image: { src: "images/fruitfly_shot.png" },
                velocity: {
                    x: Math.random()*2-1,
                    y: Math.random()
                }
            })
            )
        }
            }
               
            shots.forEach(shot => {
                var Distance = Math.sqrt(Math.pow(shot.velocity.x, 2) + Math.pow(shot.velocity.y, 2))
                shot.velocity.x = shot.velocity.x / Distance
                shot.velocity.y = shot.velocity.y / Distance
                enemy_projectiles.push(shot)
                this.index = projectiles.find(element => element === shot)
                shot.rotation = -(Math.atan(shot.velocity.x / shot.velocity.y) - Math.PI / 2) + Math.PI
            });

            
            while (this.isAttacking) {
                shots.forEach((shot,i) =>{
                shot.position.x += shot.velocity.x
                shot.position.y += shot.velocity.y
                if (shot.position.x < 0 || shot.position.y < 0 || shot.position.x > canvas.width || shot.position.y > canvas.height) {
                    enemy_projectiles = []
                    this.isAttacking = false
                    this.attack = 0
                }
                
                })
                await new Promise(r => setTimeout(r, 1))
            }
            
            
        }
}
let buy_sound = new Audio("audio/337500__eardeer__blub_short_2.wav")

class Item {
    constructor({
        name,
        projectile,
        frames = {max:1, hold:8},
        attributes = {
            damage: 0,
            attackSpeed: 0,
            meleeDmg: 0,
            rangedDmg: 0,
            Speed: 0,
            hp: 0,
            lifesteal: 0,
            range: 200,
            dodge: 0,
            hpregen: 0,
            armor: 0,
        },
        image,
        type,
        price,
        position = { x: 0, y: 0 },
        isAttacking = false,
        onCooldown = false,
        audio
    }) {
        this.frames = frames
        this.projectile = projectile
        this.attributes = attributes
        this.name = name
        this.image = new Image()
        this.image.src = image.src
        this.type = type
        this.price = price
        this.position = position
        this.isAttacking = isAttacking
        this.onCooldown = onCooldown
        this.audio = audio
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
    getEnemyDist = (obj, i) => {
        let enemyDistance = Math.sqrt(Math.pow((player.position.x - obj.position.x), 2) + Math.pow((player.position.y - obj.position.y), 2));
        if (enemyDistance < this.attributes.range && !this.onCooldown) {
            if (this.type === "weapon-melee")
                this.attack_melee(obj, i)
            else if (this.type === "weapon-ranged")
                this.attack_ranged(obj, i)
        }
    }
    attack_melee = (obj, i) => {
        let shot_audio = new Audio(this.audio)
        shot_audio.play()
        this.onCooldown = true;
        this.isAttacking = true;
        gsap.to(this.position, {
            x: obj.position.x + obj.width / 2,
            y: obj.position.y + obj.height / 2,
            onComplete: () => {
                // Enemy gets hit
                obj.hp -= this.attributes.damage + player.attributes.meleeDmg
                if (!(player.hp.current + player.attributes.lifesteal > player.hp.max))
                    player.hp.current += player.attributes.lifesteal
                checkHealth(obj, i)
                gsap.to(this.position, {
                    x: player.position.x + 50 * Math.cos((i + 1) * (360 / 6)),
                    y: player.position.y + 50 * Math.sin((i + 1) * (360 / 6)),
                    onComplete: async () => {
                        this.isAttacking = false;
                        await new Promise(r => setTimeout(r, this.attributes.attackSpeed));
                        this.onCooldown = false;
                    }
                })
            }
        })
    }
    attack_ranged = (obj, i) => {
        let shot_audio = new Audio(this.audio)
        if (this.name === "Slingshot") shot_audio.volume = 0.5
        shot_audio.play()
        this.onCooldown = true;
        this.isAttacking = true;
        var projectile = new Sprite({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            image: { src: this.projectile },
            animate: true,
            frames: { max: this.frames.max, hold: this.frames.hold }
        })
        var velocity = {
            x: obj.position.x - this.position.x,
            y: obj.position.y - this.position.y
        }
        let angle = -(Math.atan(velocity.x / velocity.y) - Math.PI / 2)
        if (velocity.y <= 0) angle = angle + Math.PI
        projectile.rotation = angle

        projectiles.push(projectile)
        var index = projectiles.find(element => element === projectile)
        
        gsap.to(projectile.position, {
            x: obj.position.x,
            y: obj.position.y,
            onComplete: async () => {
                // Enemy gets hit
                projectiles.splice(index, 1);
                obj.hp -= this.attributes.damage + player.attributes.rangedDmg
                if (!(player.hp.current + player.attributes.lifesteal > player.hp.max))
                    player.hp.current += player.attributes.lifesteal;
                checkHealth(obj, i)
                this.isAttacking = false;

                await new Promise(r => setTimeout(r, this.attributes.attackSpeed));
                this.onCooldown = false;
            }
        })
    }
    buyItem = () => {
        buy_sound.play()
        player.money -= this.price
        if (this.type === "weapon-melee" || this.type === "weapon-ranged") {
            if (ownedWeapons.length < 6) {
                ownedWeapons.push(this)
                let img = document.createElement("img");
                img.src = this.image.src;
                img.className = "inv-images"
                document.getElementById("weapons").appendChild(img)
            }
        } else {
            inventory.push(self);
            let img = document.createElement("img");
            img.src = this.image.src;
            img.className = "inv-images"
            document.getElementById("inventory").appendChild(img)

        }
        applyStats(this)

        displayPlayerStats()
    }
}



const applyStats = (obj) => {
    if (obj.attributes.hp)
        player.hp.max += obj.attributes.hp
    for (let key in obj.attributes) {
        if (key != "hp" && key != "attackSpeed" && obj.attributes[key] && key != "range")
            player.attributes[key] += obj.attributes[key]
    }
    if (player.attributes.armor > 30) {
        player.attributes.armor = 30
    }
    if (player.attributes.dodge > 60) {
        player.attributes.dodge = 60
    }
}