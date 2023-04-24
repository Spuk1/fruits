// Weapon


const sword = new WeaponShop({
    name: "Sword",
    image: {src: "assets/sword.png"},
    damage: 20,
    meleeDmg: +2,
    Speed: +3,
    rangedDmg: -3,
    attackSpeed: 3000,
    type: "weapon",
    price: 22
})

const dagger = new WeaponShop({
    name: "Spray",
    image: {src: "assets/Insektenspray.png"},
    damage: 20,
    attackSpeed: 2000,
    Speed: +3,
    rangedDmg: -3,
    lifesteal: +1,
    type: "weapon",
    price: 25
})

const Bulldozer = new WeaponShop({
    name: "Bulldozer",
    image: {src: "assets/locket_item.png"},
    Speed: -3,
    rangedDmg: -3,
    hp:+5,
    hpregen:2,
    meleeDmg: +1,
    type: "item",
    price: 37
})

const SchwiftyBoots = new WeaponShop({
    name: "Schwifty Boots",
    image:{src:"assets/boots.png"},
    Speed: +6,
    hp:-3,
    meleeDmg:-1,
    type: "item",
    price: 55
})


const weapons = [sword,dagger]
const items = [Bulldozer,SchwiftyBoots]
const inventory = []
const chosen = [sword,dagger,Bulldozer]

const ownedWeapons = [];

const randomizeShop = (wave) => {
    if(!rerollcount) rerollPrice = 7
    document.getElementById("RerollCredits").innerHTML = rerollPrice
    chosen.splice(0,chosen.length)
    for(let i = 0; i<4;i++) {
        if(wave < 3 && chosen.length <2 || chosen.length === 0) {
            chosen.push(weapons[Math.floor(Math.random()* weapons.length)  ])
        } else {
            chosen.push(items[Math.floor(Math.random()* items.length) ])
        }
        
        
    }
    getShopItems()
}

let rerollButton = document.getElementById("Reroll-button")

rerollButton.addEventListener("click", (e) => {
    if(player.money >= rerollPrice) {
    player.money -= rerollPrice
    rerollPrice = (rerollcount+2)*7
    rerollcount++
    randomizeShop(currentWave)}
})