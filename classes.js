class Sprite {
    constructor({
        id,
        position,
        image,
        frames= {max: 1, hold: 10},
        animate = false,
        sprites,
        hp = 20,
        money = 0,
        meleeDmg = 0,
        rangedDmg = 0,
        Speed = 0,
        lifesteal = 0
    }){
        this.id = id
        this.position = position
        this.image = image
        this.frames = {...frames, val:0, elapsed:0}
        this.animate = animate
        this.sprites = sprites
        this.hp = hp
        this.money = money,
        this.meleeDmg = meleeDmg
        this.rangedDmg = rangedDmg
        this. Speed = Speed
        this.lifesteal = lifesteal
        this.image = new Image()
        this.image.src = image.src
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
    enemyAI = async() =>{   
        await new Promise(r => setTimeout(r, 100))
                var movable = true
                if(this.position.x + this.width -10 <= player.position.x){
                    for(let i=0;i<enemies.length;i++){
                        let e = enemies[i]
                        if(e === this) continue
                        movable = true
                        if(getCollisionX(this,e)){
                            movable = false
                            this.position.x, e.position.x += 1.75
                            break
                            //console.log("should be false"
                        }
                    }
                      if(movable)  this.position.x += 2.5
                } 
                else if(this.position.x >= player.position.x +player.width-10){
                    for(let i=0;i<enemies.length;i++){
                        let e = enemies[i]
                        if(e === this) continue
                        movable = true
                        if(getCollisionX(this, e)){
                            movable = false
                            this.position.x, e.position.x -= 1.75
                            //console.log("should be false")
                            break
                        }
                } 
                if(movable) this.position.x -=2.5
            }
                if(this.position.y >= player.position.y + player.height) {
                    for(let i=0;i<enemies.length;i++){
                        const e = enemies[i]
                        if(e === this) continue
                        movable=true
                        if(getCollisionY(this, e)){
                            movable = false
                            this.position.y, e.position.y -= 1.75
                            //console.log("should be false")
                            break
                        }}
                    if(movable) this.position.y -=1.5
                }
                else if(this.position.y + this.height/2 <= player.position.y) {
                    for(let i=0;i<enemies.length;i++){
                        const e = enemies[i]
                        if(e === this) continue
                        movable = true
                        if(getCollisionY(this,e)){
                            movable = false
                            this.position.y, e.position.y += 1.75
                            //console.log("should be false")
                            break
                        }}
                    if(movable) this.position.y +=2.5
                }
            
                    
}
    recieveDmg = async() => {
        await new Promise(r => setTimeout(r, 200))
        document.getElementById("health").innerHTML = this.hp
        enemies.forEach((enemy, i) => {
            if(getCollision(this, enemy)) {
                console.log("aaa")
                this.hp -= 4
                
        }
    })
    await new Promise(r => setTimeout(r, 500))
}
}

const getCollisionX = (obj1, obj2) => {
    return (obj1.position.x + obj1.width >= obj2.position.x &&
        obj1.position.x <= obj2.position.x + obj2.width)
}


const getCollisionY = (obj1, obj2) => {
    return (obj1.position.y <= obj2.position.y + obj2.height &&
        obj1.position.y + obj1.height >= obj2.position.y)
}


const getCollision =({rectangle1, rectangle2}) => {
    return (
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
            )
}
class WeaponMelee {
    constructor({
        position = player.position,
        slot,
        damage,
        attackSpeed = 3000,
        image,
        isAttacking = false,
        onCooldown = false,
        meleeDmg,
        rangedDmg,
        Speed,
        hp,
        lifesteal
    }){
    this.position = position
    this.slot = slot
    this.damage = damage
    this.attackSpeed = attackSpeed
    this.image = new Image()
    this.isAttacking = isAttacking
    this.onCooldown = onCooldown
    this.image.src = image.src
    this.meleeDmg = meleeDmg
    this.rangedDmg = rangedDmg
    this. Speed = Speed
    this.hp = hp
    this.lifesteal = lifesteal
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    }
    getEnemyDist = (obj, i) => {
        let enemyDistance = Math.sqrt(Math.pow((player.position.x - obj.position.x),2) + Math.pow((player.position.y - obj.position.x),2));
        if(enemyDistance < 200 && !this.onCooldown) {
            this.attack(obj, i)
        }
    }
    attack = (obj, i) => {
            this.onCooldown = true;
            this.isAttacking = true;
            gsap.to(this.position, {
                x: obj.position.x + 50,
                y: obj.position.y + 50,
                onComplete: () => {
                     // Enemy gets hit
                    obj.hp -= this.damage + this.meleeDmg
                    checkHealth(obj, i)
                    gsap.to(this.position, {
                        x: player.position.x + 50* Math.cos(this.slot*(360/6)),
                        y: player.position.y + 50 *Math.sin(this.slot*(360/6)),
                        onComplete: async() => {
                            this.isAttacking = false;
                            await new Promise(r => setTimeout(r, this.attackSpeed));
                            this.onCooldown = false;
                        }
                    })
                }
            })
        }
        
        
    }

    class Item {
        constructor({
            name,
            image,
            meleeDmg,
            rangedDmg,
            Speed,
            hp,
            lifesteal,
            type
        }){
        this.name = name
        this.image = image
        this.meleeDmg = meleeDmg
        this.rangedDmg = rangedDmg
        this.Speed = Speed
        this.hp = hp
        this.lifesteal = lifesteal
        this.type = type
        }
    }


    class WeaponShop {
        constructor({
            name,
            damage,
            attackSpeed,
            image,
            meleeDmg,
            rangedDmg,
            Speed,
            hp,
            lifesteal,
            type,
            price
        }){
        this.name = name
        this.image = image
        this.damage = damage
        this.attackSpeed = attackSpeed
        this.meleeDmg = meleeDmg
        this.rangedDmg = rangedDmg
        this.Speed = Speed
        this.hp = hp
        this.lifesteal = lifesteal
        this.type = type
        this.price = price
        }
        buyItem = () => {
            player.money -= this.price
            if(this.type === "weapon") {
            if(ownedWeapons.length < 6){
            ownedWeapons.push(new WeaponMelee ({
                slot: ownedWeapons.length,
                image: this.image,
                damage: this.damage,
                attackSpeed: this.attackSpeed,
                meleeDmg: this.meleeDmg,
                rangedDmg: this.rangedDmg,
                Speed: this.Speed,
                hp: this.hp,
                lifesteal: this.lifesteal
            }))
            let img = document.createElement("img");
            img.src = this.image.src;
            img.className="inv-images"
            document.getElementById("weapons").appendChild(img)
        }
        } else {
            inventory.push(new Item ({
                image: this.image,
                meleeDmg: this.meleeDmg,
                rangedDmg: this.rangedDmg,
                Speed: this.Speed,
                hp: this.hp,
                lifesteal: this.lifesteal
            }))
            let img = document.createElement("img");
            img.src = this.image.src;
            img.className="inv-images"
            document.getElementById("inventory").appendChild(img)

        }
        applyStats(this)
        displayPlayerStats()
        }
}




const applyStats = (obj) => {
    for(let key in obj) {
        if(key != "image" && key != "buyItem" && (obj[key] < 0 || obj[key] > 0) && key != "damage" && key != "attackSpeed" && key != "price")
        player[key] += obj[key]
    }
}