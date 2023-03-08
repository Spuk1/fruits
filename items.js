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
    name: "Dagger",
    image: {src: "assets/dagger.svg"},
    damage: 20,
    attackSpeed: 2000,
    Speed: +3,
    rangedDmg: -3,
    lifeSteal: +1,
    type: "weapon",
    price: 25
})

const Bulldozer = new WeaponShop({
    name: "Bulldozer",
    image: {src: "assets/locket_item.png"},
    Speed: -3,
    rangedDmg: -3,
    hp:+5,
    meleeDmg: +1,
    type: "item",
    price: 37
})


const weapons = [sword,dagger]
const items = []
const chosen = [sword,dagger,Bulldozer]

const ownedWeapons = [];