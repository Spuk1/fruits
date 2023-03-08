class Sprite {
    constructor({
        id,
        position,
        image,
        frames= {max: 1, hold: 10},
        animate = false,
        sprites,
        hp = 20
    }){
        this.id = id
        this.position = position
        this.image = image
        this.frames = {...frames, val:0, elapsed:0}
        this.animate = animate
        this.sprites = sprites
        this.hp = hp
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
    enmeyAI(){
        let distX = player.position.x - this.position.x;
        let distY = player.position.y - this.position.y;
        if(distX < -40) {
            this.position.x -= 1.5;
        }else if(distX > 40){
            this.position.x += 1.5;
        }
        if(distY < -40) {
            this.position.y -= 1.5;
        }else if(distY > 40){
            this.position.y += 1.5;
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
        if(enemyDistance < 300 && !this.onCooldown) {
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


    class WeaponShop {
        constructor({
            name,
            damage,
            attackSpeed = 3000,
            image,
            meleeDmg,
            rangedDmg,
            Speed,
            hp,
            lifesteal
        }){
        this.name = name
        this.damage = damage
        this.attackSpeed = attackSpeed
        this.image = image
        this.meleeDmg = meleeDmg
        this.rangedDmg = rangedDmg
        this.Speed = Speed
        this.hp = hp
        this.lifesteal = lifesteal
        }
        buyWeapon = () => {
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
        }
}