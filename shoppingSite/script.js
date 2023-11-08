// calculateTotalPrice = (cart, discountAmount, type) => {
//     let totalPrice = 0;
//     let itemType;

//     for (let item in cart) {
//         type === "any" ? itemType = cart[item].type : itemType = type; // if we discount any, assign item type to be the focus item
//         totalPrice += (cart[item].price * cart[item].quantity * (cart[item].type === itemType ? ((100 - discountAmount) / 100) : 1)); // apply discount if type matches
//     }
//     return totalPrice;
// }

// priceRange = (cart, lowPrice, highPrice, quantity) => {
//     const items = [];

//     for (let item in cart) {
//         if (cart[item].price <= highPrice && cart[item].price >= lowPrice && quantity) {
//             items.push(cart[item]); 
//         }
//     }
//     return items;
// }

// const stockList = [{
//     name: "loaf of bread",
//     type: "food",
//     quantity: 1,
//     price: 0.85
// },{
//     name: "multipack beans",
//     type: "food",
//     quantity: 1,
//     price: 1
// },{
//     name: "multipack lemonade",
//     type: "drink",
//     quantity: 2,
//     price: 1.5
// },{
//     name: "beer",
//     type: "drink",
//     quantity: 6,
//     price: 7 
// },{
//     name: "nappies",
//     type: "other",
//     quantity: 30,
//     price: 12 
// }]

// console.log(calculateTotalPrice(stockList, 50, "any"));
// console.log(priceRange(stockList, 0.9, 1.1, true));

// Above for class

const trolleyItems = [];

returnPropertyValue = (item, property) => {
    for (let i in trolleyItems) {
        if (item == trolleyItems[i].name) {
            switch (property) {
                case "total":
                    return trolleyItems[i].total;
                case "quantity":
                    return trolleyItems[i].amount;
                case "price":
                    return trolleyItems[i].price;
            }
        }
    }
}

generateTrolley = (trolleyAmount, itemToAdd) => {
    if (!trolleyAmount) {
        const trolleySidebar = document.querySelector("#trolleyBody");
    
        const trolleyCard = document.createElement("div");
        trolleyCard.classList.add("card");
        trolleyCard.style.cssText = "width: 18rem;";
    
        const trolleyCardBody = document.createElement("div");
        trolleyCardBody.classList.add("card-body");
    
        const trolleyItemAmount = document.createElement("p");
        trolleyItemAmount.classList.add("card-text");
        const itemAmountID = itemToAdd + "TrolleyItemAmount";
        trolleyItemAmount.setAttribute("id", itemAmountID);
        trolleyItemAmount.textContent = `${itemToAdd.charAt(0).toUpperCase() + itemToAdd.slice(1)} x ${returnPropertyValue(itemToAdd, "quantity")}`;
        
        const trolleyItemTotal = document.createElement("p");
        trolleyItemTotal.classList.add("card-text");
        const itemTotalID = itemToAdd + "TrolleyItemTotal";
        trolleyItemTotal.setAttribute("id", itemTotalID);
        trolleyItemTotal.textContent = `£${returnPropertyValue(itemToAdd, "total")}`;
        trolleyItemTotal.style.cssText = "text-align: right;";
    
        trolleyCardBody.appendChild(trolleyItemAmount);
        trolleyCardBody.appendChild(trolleyItemTotal);
    
        trolleyCard.appendChild(trolleyCardBody);
    
        trolleySidebar.appendChild(trolleyCard);
    } else {
        const trolleyItemID = `${itemToAdd}TrolleyItemAmount`;
        document.getElementById(trolleyItemID).innerHTML = `${itemToAdd.charAt(0).toUpperCase() + itemToAdd.slice(1)} x ${checkTrolley(itemToAdd)}`;

        const trolleyTotalID = `${itemToAdd}TrolleyItemTotal`;
        document.getElementById(trolleyTotalID).innerHTML = `£${parseInt(returnPropertyValue(itemToAdd, "total"))}`;
    }
}

checkTrolley = (checkItem) => {
    for (let i = 0; i < trolleyItems.length; i++) {
        if (checkItem === trolleyItems[i].name) {
            return trolleyItems[i].amount;
        }
    }
    return false;
}

addButton = (clickedID) => {
    let itemToAdd;

    switch (clickedID) {
        case "addBeans":
            itemToAdd = "beans";
            break;
        case "addBread":
            itemToAdd = "bread";
            break;
        case "addLemonade":
            itemToAdd = "lemonade";
            break;
        case "addBeer":
            itemToAdd = "beer";
            break;
        case "addBatteries":
            itemToAdd = "batteries";
            break;
    }
    const stockID = itemToAdd + "Stock";

    if (parseInt(document.getElementById(stockID).innerText.replace(/^\D+/g, '')) == 0) {
        alert("Item out of stock");
    } else {
        const trolleyAmount = checkTrolley(itemToAdd); // check if item already in trolley, return number if it is
        const amountID = itemToAdd + "Amount";
        let selectedAmount = parseInt(document.getElementById(amountID).value);
        if (!selectedAmount) selectedAmount = 1; // If NaN, ie, not entered anything, default to 1
        const priceID = itemToAdd + "Price";
        const totalAmount = document.getElementById(priceID).innerText.substring(1) * selectedAmount; // get total price, removing £ from start
        alert(trolleyAmount);
        if (!trolleyAmount) { // If not already in trolley
            trolleyItems.push({
                name: itemToAdd,
                amount: selectedAmount,
                price: document.getElementById(priceID).innerText.substring(1),
                total: totalAmount
            })
        } else {
            for (let item in trolleyItems) {
                if (trolleyItems[item].name == itemToAdd) { // Find item in trolley
                    trolleyItems[item].amount = selectedAmount + trolleyAmount; // Add item to total
                    trolleyItems[item].total = trolleyItems[item].amount * document.getElementById(priceID).innerText.substring(1); // Increase total price
                    break;
                }
            }
        }

        const stockID = itemToAdd + "Stock";
        document.getElementById(stockID).innerText = `Quantity in stock: ${parseInt(document.getElementById(stockID).innerText.replace(/^\D+/g, '')) - selectedAmount}`;
        document.getElementById(amountID).value = "";
        generateTrolley(trolleyAmount, itemToAdd);
        console.log(trolleyItems);
    }
}

decreaseButton = (clickedID) => {
    let amountID;

    switch (clickedID) {
        case "decreaseBeans":
            amountID = "beansAmount";
            break;
        case "decreaseBread":
            amountID = "breadAmount";
            break;
        case "decreaseLemonade":
            amountID = "lemonadeAmount";
            break;
        case "decreaseBeer":
            amountID = "beerAmount";
            break;
        case "decreaseBatteries":
            amountID = "batteriesAmount";
            break;
    }

    let selectedAmount = document.getElementById(amountID).value;

    if (selectedAmount > 0) {
        document.getElementById(amountID).value = parseInt(selectedAmount) - 1;
    } else if (!selectedAmount) {
        document.getElementById(amountID).value = 0;
    }
}

increaseButton = (clickedID) => {
    let amountID;
    let stockID;

    switch (clickedID) {
        case "increaseBeans":
            amountID = "beansAmount";
            stockID = "beansStock";
            break;
        case "increaseBread":
            amountID = "breadAmount";
            stockID = "breadStock";
            break;
        case "increaseLemonade":
            amountID = "lemonadeAmount";
            stockID = "lemonadeStock";
            break;
        case "increaseBeer":
            amountID = "beerAmount";
            stockID = "beerStock";
            break;
        case "increaseBatteries":
            amountID = "batteriesAmount";
            stockID = "batteriesStock";
            break;
    }

    let selectedAmount = parseInt(document.getElementById(amountID).value);
    let stockAmount = parseInt(document.getElementById(stockID).innerText.replace(/^\D+/g, '')); // replace all none numbers with nothing

    if (stockAmount == 0) {
        // Do nothing as item out of stock
    } else if (!selectedAmount) {
        document.getElementById(amountID).value = 2;
    } else if (selectedAmount < stockAmount) {
        document.getElementById(amountID).value = selectedAmount + 1;
    } 
}

getMaxValue = (...args) => {
    for (let i = 0; i < args.length; i++) {
        const stockID = args[i] + "Stock";
        const stockAmount = document.getElementById(stockID).innerText.replace(/^\D+/g, '');
        const amountID = args[i] + "Amount";
        const inputField = document.getElementById(amountID);
        
        inputField.addEventListener("blur", (e) => {
            parseInt(e.target.value) > parseInt(stockAmount) ? inputField.value = stockAmount : inputField.value = parseInt(e.target.value);
        })
    }
}

getMaxValue("beans", "bread", "lemonade", "beer", "batteries");