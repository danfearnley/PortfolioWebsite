calculateTotalPrice = (cart, discountAmount, type) => {
    let totalPrice = 0;
    let itemType;

    for (let item in cart) {
        type === "any" ? itemType = cart[item].type : itemType = type; // if we discount any, assign item type to be the focus item
        totalPrice += (cart[item].price * cart[item].quantity * (cart[item].type === itemType ? ((100 - discountAmount) / 100) : 1)); // apply discount if type matches
    }
    return totalPrice;
}

priceRange = (cart, lowPrice, highPrice, quantity) => {
    const items = [];

    for (let item in cart) {
        if (cart[item].price <= highPrice && cart[item].price >= lowPrice && quantity) {
            items.push(cart[item]); 
        }
    }
    return items;
}

const stockList = [{
    name: "loaf of bread",
    type: "food",
    quantity: 1,
    price: 0.85
},{
    name: "multipack beans",
    type: "food",
    quantity: 1,
    price: 1
},{
    name: "multipack lemonade",
    type: "drink",
    quantity: 2,
    price: 1.5
},{
    name: "beer",
    type: "drink",
    quantity: 6,
    price: 7 
},{
    name: "nappies",
    type: "other",
    quantity: 30,
    price: 12 
}]

console.log(calculateTotalPrice(stockList, 50, "any"));
console.log(priceRange(stockList, 0.9, 1.1, true));

// Above for class

const trolleyItems = [];

checkTrolley = (checkItem) => {

}

addButton = (clickedID) => {
    switch (clickedID) {
        case "addBeans":
            alert(document.getElementById("beansStock").innerText.replace(/^\D+/g, ''));
            break;
        case "addBread":
            alert(document.getElementById("breadStock").innerText.replace(/^\D+/g, ''));
            break;
        case "addLemonade":
            alert(document.getElementById("lemonadeStock").innerText.replace(/^\D+/g, ''));
            break;
        case "addBeer":
            alert(document.getElementById("beerStock").innerText.replace(/^\D+/g, ''));
            break;
        case "addBatteries":
            alert(document.getElementById("batteriesStock").innerText.replace(/^\D+/g, ''));
            break;
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

    let selectedAmount = document.getElementById(amountID).value;
    let stockAmount = document.getElementById(stockID).innerText.replace(/^\D+/g, ''); // replace all none numbers with nothing
    
    if (!selectedAmount) {
        document.getElementById(amountID).value = 2;
    } else if (selectedAmount < stockAmount) {
        document.getElementById(amountID).value = parseInt(selectedAmount) + 1;
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

for (let item in trolleyItems) {
    
}