let dmgCD = false
class Sprite {
    constructor({
        id,
        position,
        image,
        frames= {max: 1, hold: 10},
        animate = false,
        sprites,
        hp = {max: 20, current: 20},
        money = 0,
        meleeDmg = 0,
        rangedDmg = 0,
        Speed = 0,
        lifesteal = 0,
        dodge = 0,
        range = 0,
        hpregen = 0
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
        this.opacity = 1
        this.image.onload = () => {
            this.width = this.image.width /this.frames.max
            this.height = this.image.height
        }
        this.dodge = dodge,
        this.range = range,
        this.hpregen = hpregen
    
    }
    draw() {
        c.save()
        c.globalAlpha = this.opacity
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

    recieveDmg = async() => {
        document.getElementById("health").innerHTML = this.hp.current
        await new Promise(r => setTimeout(r, 200))
        if(!dmgCD) {
            for(let i=0; i<enemies.length;i++) {
            let enemy = enemies[i]
            if(getCollision(this, enemy)) {
                dmgCD = true
                if(Math.random() * 100 >= this.dodge)
                this.hp.current -= enemy.damage
                gsap.to(this, {
                    opacity: 0,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.08,
                onComplete: async() => {
                    this.opacity=1
                    await new Promise(r => setTimeout(r, 1000))
                    dmgCD = false
                }  }
                );
                break
        }
    }
}
    death()   
    
}
}

class Enemy extends Sprite {
    constructor({
        position,
        image,
        frames= {max: 1, hold: 10},
        animate = true,
        sprites,
        hp = 20,
        Speed = 2,
        damage = 3,
    }){
    super({
        position, image, animate, frames, sprites
    })
    this.hp = hp
    this.damage = damage
    this.Speed = Speed,
    this.onCooldown = false
  }
  enemyAI = async() =>{   
    await new Promise(r => setTimeout(r, 100))
            var movable = true
            if(this.position.x + this.width -10 <= player.position.x){
                this.image.src = this.sprites.right
                for(let i=0;i<enemies.length;i++){
                    let e = enemies[i]
                    if(e === this) continue
                    movable = true
                    if(getCollisionX(this,e)){
                        movable = false
                        this.position.x, e.position.x += this.Speed * 0.8
                        break
                        //console.log("should be false"
                    }
                }
                  if(movable)  this.position.x += this.Speed
            } 
            else if(this.position.x >= player.position.x +player.width-10){
                this.image.src = this.sprites.left
                for(let i=0;i<enemies.length;i++){
                    let e = enemies[i]
                    if(e === this) continue
                    movable = true
                    if(getCollisionX(this, e)){
                        movable = false
                        this.position.x, e.position.x -= this.Speed * 0.8
                        //console.log("should be false")
                        break
                    }
            } 
            if(movable) this.position.x -=this.Speed
        }
            if(this.position.y >= player.position.y + player.height) {
                for(let i=0;i<enemies.length;i++){
                    const e = enemies[i]
                    if(e === this) continue
                    movable=true
                    if(getCollisionY(this, e)){
                        movable = false
                        this.position.y, e.position.y -= this.Speed * 0.8
                        //console.log("should be false")
                        break
                    }}
                if(movable) this.position.y -= this.Speed*0.8
            }
            else if(this.position.y + this.height/2 <= player.position.y) {
                for(let i=0;i<enemies.length;i++){
                    const e = enemies[i]
                    if(e === this) continue
                    movable = true
                    if(getCollisionY(this,e)){
                        movable = false
                        this.position.y, e.position.y += this.Speed*0.8
                        //console.log("should be false")
                        break
                    }}
                if(movable) this.position.y += this.Speed
            }
        
                
}
attack = () => {
    this.onCooldown = true;
    
    gsap.to(this, {
        opacity: 0.4,
        repeat: 2,
        yoyo: true,
        duration: 0.2,
        onComplete: () => {
            let currentPosition = this.position
            this.opacity = 1
            gsap.to(this.position, {
                x: player.position.x +50,
                y: player.position.y +50,
                onComplete: () => {
                    gsap.to(this.position, {
                        x: currentPosition.x,
                        y: currentPosition.y,
                        onComplete: async() => {
                            await new Promise(r => setTimeout(r, 5000));
                            this.onCooldown = false;
                }
            })
        }
    })
        }
    })
    
}
getPlayerDist = (obj, i) => {
    let Distance = Math.sqrt(Math.pow((this.position.x - player.position.x),2) + Math.pow((this.position.y - player.position.y),2));
    if(Distance < (300) && !this.onCooldown) {
        this.attack()
    }
}
}





class WeaponMelee {
    constructor({
        position = player.position,
        slot,
        damage,
        attackSpeed = 3000,
        image,
        isAttacking = false,
        onCooldown = false
    }){
    this.position = position
    this.slot = slot
    this.damage = damage
    this.attackSpeed = attackSpeed
    this.image = new Image()
    this.isAttacking = isAttacking
    this.onCooldown = onCooldown
    this.image.src = image.src
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    }
    getEnemyDist = (obj, i) => {
        let enemyDistance = Math.sqrt(Math.pow((player.position.x - obj.position.x),2) + Math.pow((player.position.y - obj.position.y),2));
        if(enemyDistance < (200 + player.range*0.5) && !this.onCooldown) {
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
                    obj.hp -= this.damage + player.meleeDmg
                    if(!(player.hp.current + player.lifesteal > player.hp.max))
                    player.hp.current += player.lifesteal
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
            type,
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
            damage = 0,
            attackSpeed = 0,
            image,
            meleeDmg = 0,
            rangedDmg = 0,
            Speed = 0,
            hp = 0,
            lifesteal = 0,
            range = 0,
            dodge = 0,
            hpregen = 0,
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
        this.range = range
        this.dodge = dodge
        this.hpregen = hpregen
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
    player.hp.max += obj.hp
    for(let key in obj) {
        if(key != "image" && key != "buyItem" && (obj[key] < 0 || obj[key] > 0) && key != "damage" && key != "attackSpeed" && key != "price" && key != "hp")
        player[key] += obj[key]
    }
}