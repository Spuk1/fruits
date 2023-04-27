// Weapon


const sword = new Item({
    name: "Sword",
    image: {src: "assets/sword.png"},
    attributes: {
        damage: 20,
        meleeDmg: +2,
        attackSpeed: 3000,
        Speed: +3,
        rangedDmg: -3,
        range: 300
    },
    type: "weapon-melee",
    price: 22,
})

const Spray = new Item({
    name: "Spray",
    image: {src: "assets/Insektenspray.png"},
    attributes: {
        damage: 5,
        attackSpeed: 1000,
        Speed: +3,
        rangedDmg: -3,
        lifesteal: +1,
        range:1000
    },
    type: "weapon-ranged",
    price: 25,
})

const Bulldozer = new Item({
    name: "Bulldozer",
    image: {src: "assets/locket_item.png"},
    attributes: {
        Speed: -3,
        rangedDmg: -3,
        hp:+5,
        hpregen:2,
        meleeDmg: +1, 
    },
    type: "item",
    price: 37
})

const SchwiftyBoots = new Item({
    name: "Schwifty Boots",
    image:{src:"assets/boots.png"},
    attributes: {
        Speed: +6,
        hp:-3,
        meleeDmg:-1,
    },
    type: "item",
    price: 55
})


const weapons = [sword,Spray]
const items = [Bulldozer,SchwiftyBoots]
const inventory = []
const chosen = [sword,Spray,Bulldozer]

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