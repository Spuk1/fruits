class Sprite {
    constructor({
        position,
        image,
        frames= {max: 1, hold: 10},
        animate = false,
        sprites,
        hp = 100
    }){
        this.position = position
        this.image = image
        this.frames = {...frames, val:0, elapsed:0}
        this.animate = animate
        this.sprites = sprites
        this.hp = hp
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
        if(distX < 0) {
            this.position.x -= 1.5;
        }else this. position.x += 1.5;
        if(distY < 0) {
            this.position.y -= 1.5;
        }else this.position.y += 1.5;
    }
}

class WeaponMelee {
    constructor({
        position,
        slot,
        damage,
        attackSpeed,
        image,
        isAttacking = false,
        onCooldown = false
    }){
    this.position = position
    this.slot = slot
    this.damage = damage
    this.attackSpeed = attackSpeed
    this.image = image
    this.isAttacking = isAttacking
    this.onCooldown = onCooldown
    }
    draw(){
        c.drawImage(this.image, this.position.x -45, this.position.y -45);
    }
    attack = () => {
        let enemyDistance = Math.sqrt(Math.pow((player.position.x - emby.position.x),2) + Math.pow((player.position.y - emby.position.x),2));
        if(enemyDistance < 300) {
            this.onCooldown = true;
            this.isAttacking = true;
            
            gsap.to(this.position, {
                x: emby.position.x + 50,
                y: emby.position.y + 50,
                onComplete: () => {
                     // Enemy gets hit
                    emby.hp -= 20
                    gsap.to(this.position, {
                        x: player.position.x -20,
                        y: player.position.y -20,
                        onComplete: async() => {
                            this.isAttacking = false;
                            await new Promise(r => setTimeout(r, 5000));
                            this.onCooldown = false;
                        }
                    })
                }
            })
        }
        
    }
}
