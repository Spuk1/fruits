

const getShopItems = () => {
    let j = 1;
    for(i=0;i<chosen.length;i++) {
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
        buttonElement.id = `button_item${i+1}`
        buttonElement.innerHTML = chosen[i].price
        document.getElementById(`item${i+1}`).appendChild(buttonElement);
    }
}

