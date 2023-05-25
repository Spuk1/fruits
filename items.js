// Weapon


const fruitpick = new Item({
    name: "Fruitpick",
    image: {src: "assets/fruitpick.png"},
    attributes: {
        damage: 10,
        attackSpeed: 500,
        lifesteal:1,
        range: 200
    },
    type: "weapon-melee",
    price: 22,
})

const flyswatter = new Item({
    name: "Fly swatter",
    image: {src: "assets/flyswatter.png"},
    attributes: {
        damage: 20,
        meleeDmg: +2,
        attackSpeed: 3000,
        Speed: +3,
        rangedDmg: -3,
        range: 300
    },
    type: "weapon-melee",
    price: 28,
})

const Spray = new Item({
    name: "Spray",
    image: {src: "assets/Insektenspray.png"},
    attributes: {
        damage: 5,
        attackSpeed: 1000,
        Speed: +3,
        rangedDmg: +3,
        range:1000
    },
    type: "weapon-ranged",
    price: 30,
})

const Bulldozer = new Item({
    name: "Bulldozer",
    image: {src: "assets/locket_item.png"},
    attributes: {
        Speed: -3,
        rangedDmg: -3,
        hp:+10,
        hpregen:5,
        meleeDmg: -3, 
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
        dodge: +10
    },
    type: "item",
    price: 38
})

const Helmet = new Item({
    name: "Helmet",
    image:{src:"assets/Insektenschutz.png"},
    attributes: {
        hp:+5,
        armor: +5
    },
    type: "item",
    price: 15
})

const Sunglasses = new Item({
    name: "Sunglasses",
    image:{src:"assets/sunglasses.png"},
    attributes: {
        rangedDmg: +2,
        meleeDmg: +2,
        armor: -2
    },
    type: "item",
    price: 20
})

const Bottle = new Item({
    name: "Waterbottle",
    image:{src:"assets/Wasserflasche.png"},
    attributes: {
        hpregen: +3,
        rangedDmg: -1
    },
    type: "item",
    price: 25
})

const Candle = new Item({
    name: "Candle",
    image:{src:"assets/Kerze.png"},
    attributes: {
        rangedDmg: +5,
        hpregen: -2
    },
    type: "item",
    price: 20
})

const Book = new Item({
    name: "The art of fencing flies",
    image:{src:"assets/sunglasses.png"},
    attributes: {
        meleeDmg: +8,
        dodge: -15
    },
    type: "item",
    price: 30
})



const weapons = [flyswatter,Spray, fruitpick]
const items = [Bulldozer,SchwiftyBoots, Candle, Sunglasses, Bottle, Helmet]
const inventory = []
const chosen = []

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