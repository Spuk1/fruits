

const fruitpick = () => {
    return new Item({
    name: "Fruitpick",
    image: {src: "assets/fruitpick.png"},
    attributes: {
        damage: 10,
        attackSpeed: 500,
        lifesteal:1,
        range: 200
    },
    type: "weapon-melee",
    audio: "audio/413496__inspectorj__stab-metal-knife-in-lettuce-a.wav",
    price: 22,
})}

const flyswatter = () => {
    return new Item({
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
    audio: "audio/394416__inspectorj__bamboo-swing-a3.wav"
})}

const Spray = () => {
    return new Item({
    name: "Spray",
    image: {src: "assets/Insektenspray.png"},
    projectile: "assets/Insektenspray_Munition.png",
    frames:{max:4},
    attributes: {
        damage: 5,
        attackSpeed: 1000,
        Speed: +3,
        rangedDmg: +1,
        range:1000
    },
    type: "weapon-ranged",
    price: 30,
    audio: "audio/472688__silverillusionist__fire-burst.wav"
})}

const Slingshot = () => {
    return new Item({
    name: "Slingshot",
    image: {src: "assets/Slingshot.png"},
    projectile: "assets/stone.png",
    frames: {max:1},
    attributes: {
        damage: 8,
        attackSpeed: 2000,
        rangedDmg: +3,
        hp:3,
        range:1000
    },
    type: "weapon-ranged",
    price: 30,
    audio: "audio/353033__renne100__slingshot.mp3"
})}

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
    image:{src:"assets/DieKunstDesFliegenFechtens.png"},
    attributes: {
        meleeDmg: +8,
        dodge: -15
    },
    type: "item",
    price: 30
})


const weapons = ["flyswatter","Spray", "fruitpick","Slingshot"]
const items = [Bulldozer,SchwiftyBoots, Candle, Sunglasses, Bottle, Helmet,Book]
const inventory = []
const chosen = []

const ownedWeapons = [];



const create_Weapon = (name) => {
    let object
    switch (name) {
        case "flyswatter":
            object = flyswatter();
            break;
        case "Spray": 
            object = Spray();
            break;
        case "fruitpick":
            object = fruitpick();
            break;
        case "Slingshot":
            object = Slingshot();
            break;
    }
    return object
}

const randomizeShop = (wave) => {
    if(!rerollcount) rerollPrice = 7
    document.getElementById("RerollCredits").innerHTML = rerollPrice
    chosen.splice(0,chosen.length)
    for(let i = 0; i<4;i++) {
        if(wave < 3 && chosen.length <2 || chosen.length === 0) {
            let weapon = create_Weapon(weapons[Math.floor(Math.random()* weapons.length)  ])
            chosen.push(weapon)
        } else {
            chosen.push(items[Math.floor(Math.random()* items.length) ])
        }
        
        
    }
    getShopItems()
}




const get_starter_Item = () => {
    player.money = 30
    chosen.splice(0,chosen.length)
    weapons.forEach(name => {
        chosen.push(create_Weapon(name))
    })
        
    if(chosen)
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