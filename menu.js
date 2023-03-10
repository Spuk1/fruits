
const removeChildElements = (node) => {
    while(node.firstChild){
        node.removeChild(node.firstChild)
}
}

const char_info_box = document.getElementById("char_info_box")

const displayPlayerStats = () => {
    removeChildElements(char_info_box)
    let statsHeader = document.createElement("h1")
    statsHeader.style.fontSize = "24px"
    statsHeader.style.textAlign = "center"
    statsHeader.innerHTML = "Stats"
    statsHeader.style.color = "aliceblue"
    document.getElementById(`char_info_box`).appendChild(statsHeader);
    for(let key in player){
        if(key != "id"&& key != "position" && key != "image" && key!= "frames" && key!= "animate" && key!= "sprites" && key != "money" && key != "height" && key != "width" && key !="enemyAI") {
            let textElement = document.createElement("p")
                textElement.id = "stats"
                textElement.innerHTML = `${key}: ` + player[key];
                textElement.style.textAlign = "left";
                textElement.style.margin = "5px 0 0 15px"
                textElement.style.color = "aliceblue"
                document.getElementById(`char_info_box`).appendChild(textElement);
        }
    }
}


const getShopItems = async() => {
    
    displayPlayerStats()
    document.getElementById("menu").appendChild(moneyEle)
    moneyEle.style.right = "50%"
    for(let i=1;i<=4;i++) {
        let node = document.getElementById(`item${i}`)
        removeChildElements(node)
    }
    await new Promise(r => setTimeout(r, 100))
    for(i=0;i<4;i++) {
        let img = document.createElement("img")
        let nameText = document.createElement("p")
        let newDiv = document.createElement("div")
        nameText.style.color = "aliceblue"
        nameText.style.textAlign = "left"
        nameText.style.gridColumn = 2
        img.className = "item-images"
        img.style.gridRow = 1
        nameText.innerHTML = chosen[i].name;
        img.src = chosen[i].image.src;
        newDiv.style.display = "grid"
        newDiv.id = `item${i+1}_grid`



        document.getElementById(`item${i+1}`).appendChild(newDiv);
        document.getElementById(`item${i+1}_grid`).appendChild(nameText);
        document.getElementById(`item${i+1}_grid`).appendChild(img);
        for(let key in chosen[i]) {
            if(chosen[i][key] != null && key != "image" && key != "name" && key != "position" && key != "type" && key != "buyItem" && key != "price") {
                let textElement = document.createElement("p")
                textElement.id = "added"
                textElement.innerHTML = `${key}: ` + chosen[i][key];
                textElement.style.textAlign = "left";
                textElement.style.margin = "5px 0 0 15px"
                document.getElementById(`item${i+1}`).appendChild(textElement);
            }
            
        }
        let buttonElement = document.createElement("button")
        buttonElement.className = `buy_button`
        buttonElement.id = `${chosen[i].name}`
        buttonElement.innerHTML = chosen[i].price
        document.getElementById(`item${i+1}`).appendChild(buttonElement);
    }
}



document.querySelectorAll(".items").forEach((button) => {
    button.addEventListener("click", (e)=> {
        switch(e.currentTarget.id) {
            case "item1":
                if(!(chosen[0]) || (chosen[1].type === "weapon" && ownedWeapons.length === 6)) break;
                if(player.money >= chosen[0].price) {
                chosen[0].buyItem();
                delete chosen[0]
                let node = document.getElementById(`item1`);
                removeChildElements(node)
                break;}
            case "item2":
                if(!(chosen[1]) || (chosen[1].type === "weapon" && ownedWeapons.length === 6)) break;
                if(player.money >= chosen[1].price) {
                    chosen[1].buyItem();
                    delete chosen[1]
                    let node = document.getElementById(`item2`);
                    removeChildElements(node)
                    break;}
            case "item3":
                if(!(chosen[2])) break;
                if(player.money >= chosen[2].price) {
                    chosen[2].buyItem();
                    delete chosen[2]
                    let node = document.getElementById(`item3`);
                    removeChildElements(node)
                    break;}
            case "item4":
                if(!(chosen[3])) break;
                if(player.money >= chosen[3].price) {
                    chosen[3].buyItem();
                    delete chosen[3]
                    let node = document.getElementById(`item4`);
                    removeChildElements(node)
                    break;}
        }
    })
})