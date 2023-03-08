// Weapon


const sword = new WeaponShop({
    name: "Sword",
    image: {src: "assets/sword.png"},
    damage: 20,
    meleeDmg: +2,
    Speed: +3,
    rangedDmg: -3,
})

const dagger = new WeaponShop({
    name: "Dagger",
    image: {src: "assets/dagger.svg"},
    damage: 20,
    attackSpeed: 2000,
    Speed: +3,
    rangedDmg: -3,
})
const weapons = [sword,dagger]
const chosen = [sword,dagger]

const ownedWeapons = [];