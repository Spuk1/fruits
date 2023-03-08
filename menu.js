const getShopItems = () => {
    for(i=0;i<chosen.length;i++){
        let id = `item${i+1}_name`
        document.getElementById(id).innerHTML = chosen[i].name;
        document.getElementById(`item${i+1}_image`).src = chosen[i].image.src;
        document.getElementById(`item${i+1}_stat1`).innerHTML = "Damage: " + chosen[i].damage;
        document.getElementById(`item${i+1}_stat2`).innerHTML = "AttackSpeed: " + chosen[i].attackSpeed;
        document.getElementById(`item${i+1}_stat3`).innerHTML = "MeleeDamage: "+chosen[i].meleeDmg;
        document.getElementById(`item${i+1}_stat4`).innerHTML = "RangedDamage: "+chosen[i].rangedDmg;
        document.getElementById(`item${i+1}_stat5`).innerHTML = "Speed: "+ chosen[i].Speed;
        document.getElementById(`item${i+1}_button`).onclick = chosen[i].buyWeapon()
    }
}