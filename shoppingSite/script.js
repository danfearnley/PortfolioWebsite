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

const stockList = [{
    name: "loaf of bread",
    type: "food",
    quantity: 12,
    price: 0.85
},{
    name: "multipack beans",
    type: "food",
    quantity: 21,
    price: 1
},{
    name: "multipack lemonade",
    type: "drink",
    quantity: 24,
    price: 1.5
},{
    name: "beer",
    type: "drink",
    quantity: 46,
    price: 7 
},{
    name: "nappies",
    type: "other",
    quantity: 30,
    price: 12 
},{
    name: "butter",
    type: "food",
    quantity: 0,
    price: 2
},{
    name: "batteries",
    type: "other",
    quantity: 14,
    price: 7.5
}]

// console.log(calculateTotalPrice(stockList, 50, "any"));
// console.log(priceRange(stockList, 0.9, 1.1, true));

// Above for class

let trolleyItems = []; // Cannot be const as being reassigned in removeFromTrolley

const discountInput = document.getElementById("discountCode");
discountInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") updateTrolleyTotal();
})

sentenceCase = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

returnStockValue = (item, property) => {
    for (let i in stockList) {
        if (item == stockList[i].name) {
            switch (property) {
                case "type":
                    return stockList[i].type;
                case "quantity":
                    return stockList[i].quantity;
                case "price":
                    return stockList[i].price;
            }
        }
    }
}

returnTrolleyValue = (item, property) => {
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
    if (!trolleyAmount) { // Generate a card on the fly if not in the trolley
        const trolleySidebar = document.querySelector("#trolleyBody");
    
        const trolleyCard = document.createElement("div");
        trolleyCard.classList.add("card");
        trolleyCard.style.cssText = "width: 18rem;";
        const trolleyItemAmountID = `${itemToAdd}TrolleyCard`;
        trolleyCard.setAttribute("id", trolleyItemAmountID);
    
        const trolleyCardBody = document.createElement("div");
        trolleyCardBody.classList.add("card-body");
    
        const trolleyItemAmount = document.createElement("p");
        trolleyItemAmount.classList.add("card-text");
        const itemAmountID = itemToAdd + "TrolleyItemAmount";
        trolleyItemAmount.setAttribute("id", itemAmountID);
        trolleyItemAmount.textContent = `${sentenceCase(itemToAdd)} x ${returnTrolleyValue(itemToAdd, "quantity")}`;
        
        const trolleyItemTotal = document.createElement("p");
        trolleyItemTotal.classList.add("card-text");
        const itemTotalID = itemToAdd + "TrolleyItemTotal";
        trolleyItemTotal.setAttribute("id", itemTotalID);
        trolleyItemTotal.textContent = `£${returnTrolleyValue(itemToAdd, "total").toFixed(2)}`;
        trolleyItemTotal.style.cssText = "text-align: right;";

        const trolleyRemove = document.createElement("button");
        trolleyRemove.classList.add("btn");
        trolleyRemove.classList.add("btn-danger");
        const trolleyRemoveID = itemToAdd + "Remove";
        trolleyRemove.setAttribute("id", trolleyRemoveID);
        trolleyRemove.setAttribute("type", "button");
        trolleyRemove.setAttribute("onclick", "removeFromTrolley(this.id)");
        trolleyRemove.textContent = "Remove";
    
        trolleyCardBody.appendChild(trolleyItemAmount);
        trolleyCardBody.appendChild(trolleyItemTotal);
        trolleyCardBody.appendChild(trolleyRemove);
    
        trolleyCard.appendChild(trolleyCardBody);
    
        trolleySidebar.appendChild(trolleyCard);
    } else { // Amend existing card if already in trolley
        const trolleyItemID = `${itemToAdd}TrolleyItemAmount`;
        document.getElementById(trolleyItemID).innerHTML = `${sentenceCase(itemToAdd)} x ${checkTrolley(itemToAdd)}`;

        const trolleyTotalID = `${itemToAdd}TrolleyItemTotal`;
        document.getElementById(trolleyTotalID).innerHTML = `£${parseInt(returnTrolleyValue(itemToAdd, "total"))}`;
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
    const itemToAdd = clickedID.substring(3).toLowerCase();
    const stockID = itemToAdd + "Stock";

    if (returnStockValue(itemToAdd, "quantity") == 0) {
        alert("Item out of stock");
    } else {
        const trolleyAmount = checkTrolley(itemToAdd); // check if item already in trolley, return number if it is
        const amountID = itemToAdd + "Amount";
        let selectedAmount = parseFloat(document.getElementById(amountID).value); // get amount the user wants to add to trolley

        if (isNaN(selectedAmount)) {
           selectedAmount = 1; // If NaN, ie, not entered anything, default to 1 
        } 

        if (selectedAmount > 0) {
            if (!trolleyAmount) { // If not already in trolley
                trolleyItems.push({
                    name: itemToAdd,
                    amount: selectedAmount,
                    price: returnStockValue(itemToAdd, "price"),
                    total: returnStockValue(itemToAdd, "price") * selectedAmount,
                    type: returnStockValue(itemToAdd, "type")
                })

                for (let i in stockList) {
                    if (itemToAdd == stockList[i].name) {
                        stockList[i].quantity -= selectedAmount;
                    }
                }
            } else {
                for (let item in trolleyItems) {
                    if (trolleyItems[item].name == itemToAdd) { // Find item in trolley
                        trolleyItems[item].amount = selectedAmount + trolleyAmount; // Add item to total
                        trolleyItems[item].total = trolleyItems[item].amount * returnStockValue(itemToAdd, "price"); // Increase total price

                        for (let i in stockList) {
                            if (itemToAdd == stockList[i].name) {
                                stockList[i].quantity -= selectedAmount;
                                break;
                            }
                        }
                        break;
                    }
                }
            }

            const stockID = itemToAdd + "Stock";
            document.getElementById(stockID).innerText = `Quantity in stock: ${returnStockValue(itemToAdd, "quantity")}`;
            document.getElementById(amountID).value = "";
            generateTrolley(trolleyAmount, itemToAdd);
            console.log(trolleyItems);
        }
        updateTrolleyTotal();
    }
}

decreaseButton = (clickedID) => {
    const amountID = `${clickedID.substring(8).toLowerCase()}Amount`;
    const selectedAmount = document.getElementById(amountID).value;

    if (selectedAmount > 0) {
        document.getElementById(amountID).value =parseFloat(selectedAmount) - 1;
    } else if (!selectedAmount) {
        document.getElementById(amountID).value = 0;
    }
}

increaseButton = (clickedID) => {
    const amountID = `${clickedID.substring(8).toLowerCase()}Amount`;

    const selectedAmount = parseFloat(document.getElementById(amountID).value);
    const stockAmount = returnStockValue(clickedID.substring(8).toLowerCase(), "quantity");

    if (stockAmount == 0) {
        // Do nothing as item out of stock
    } else if (!selectedAmount && stockAmount == 1) {
        document.getElementById(amountID).value = 1;
    } else if (!selectedAmount) {
        document.getElementById(amountID).value = 2; // assign to 2 if pressing plus on blank
    } else if (selectedAmount < stockAmount) {
        document.getElementById(amountID).value = selectedAmount + 1;
    } 
}

removeFromTrolley = (removeID) => {
    const itemRemoved = removeID.substring(0, removeID.length - 6); // get item to be removed
    const itemRemovedQuantityID = `${itemRemoved}Stock`

    document.getElementById(itemRemovedQuantityID).innerText = `Quantity in stock: ${returnStockValue(itemRemoved, "quantity") + returnTrolleyValue(itemRemoved, "quantity")}`;
    stockList[stockList.findIndex(item => item.name === itemRemoved)].quantity += returnTrolleyValue(itemRemoved, "quantity"); // Add back to stock

    trolleyItems = trolleyItems.filter(item => item.name != itemRemoved); // remove from array

    const element = document.getElementById(`${itemRemoved}TrolleyCard`); // remove card from trolley
    element.classList.add("hide");
    delay(500).then(() => element.remove());
    updateTrolleyTotal();
}

delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
  }

updateTrolleyTotal = () => {
    const trolleyTotal = document.getElementById("offcanvasRightLabel");
    const discountCode = document.getElementById("discountCode").value.toLowerCase();
    let trolleyAmount = 0;
    let itemType;
    const discountAmount = (100 - 20) / 100;

    for (let item in trolleyItems) {
        if (discountCode === "any") {
            itemType = trolleyItems[item].type;
        } else if (discountCode) {
            itemType = discountCode;
        }
        trolleyAmount += parseFloat(trolleyItems[item].total * (trolleyItems[item].type === itemType ? discountAmount : 1)); // apply discount if type matches

        const itemTotalID = trolleyItems[item].name + "TrolleyItemTotal";
        const trolleyItemTotal = document.getElementById(itemTotalID);
        if (trolleyItems[item].type === itemType) {
            trolleyItemTotal.innerHTML = `£${(returnTrolleyValue(trolleyItems[item].name, "total") * discountAmount).toFixed(2)}   <span style="text-decoration: line-through;">£${returnTrolleyValue(trolleyItems[item].name, "total").toFixed(2)}</span>`;
        } else {
            trolleyItemTotal.innerHTML = `£${returnTrolleyValue(trolleyItems[item].name, "total").toFixed(2)}`;
        }
    }
    trolleyTotal.innerText = `Your Trolley | Total £${trolleyAmount.toFixed(2)}`;
}

getMaxValue = (...args) => {
    for (let i = 0; i < args.length; i++) {
        const stockAmount = returnStockValue(args[i], "quantity");
        const amountID = args[i] + "Amount";
        const inputField = document.getElementById(amountID);
        
        inputField.addEventListener("blur", (e) => { // ensure users cant type more than stock amount
           parseFloat(e.target.value) >parseFloat(stockAmount) ? inputField.value = stockAmount : inputField.value = parseFloat(e.target.value);
        })
    }
}

storeFront = (stockList) => { // There MUST be a quicker way of doing this?
    for (let item in stockList) {
        const itemGridID = `${stockList[item].type}Grid`;
        const itemGrid = document.getElementById(itemGridID);

        const itemCard = document.createElement("div");
        itemCard.classList.add("card");
        const itemCardID = `${stockList[item].name}Card`;
        itemCard.setAttribute("id", itemCardID);
        itemCard.style.cssText = "width: 16rem;";

        const itemCardHeader = document.createElement("div");
        itemCardHeader.classList.add("card-header");

        const itemCardH5 = document.createElement("h5");
        itemCardH5.classList.add("card-title");
        itemCardH5.textContent = sentenceCase(stockList[item].name);

        itemCardHeader.appendChild(itemCardH5);
        itemCard.appendChild(itemCardHeader);

        const itemCardBody = document.createElement("div");
        itemCardBody.classList.add("card-body");
        itemCardBody.classList.add("text-center");

        const itemCardStock = document.createElement("p");
        const itemCardStockID = `${stockList[item].name}Stock`;
        itemCardStock.setAttribute("id", itemCardStockID);
        itemCardStock.textContent = `Quantity in stock: ${stockList[item].quantity}`;
        itemCardBody.appendChild(itemCardStock);

        const itemCardPrice = document.createElement("p");
        const itemCardPriceID = `${stockList[item].name}Price`;
        itemCardPrice.setAttribute("id", itemCardPriceID);
        itemCardPrice.textContent = `£${stockList[item].price.toFixed(2)}`;
        itemCardBody.appendChild(itemCardPrice);

        const itemCardButtons = document.createElement("div");
        itemCardButtons.classList.add("cardButtons");

        const itemCardStockButtons = document.createElement("div");
        itemCardStockButtons.classList.add("input-group");
        itemCardStockButtons.classList.add("input-group-sm");
        itemCardStockButtons.classList.add("btn-group-sm");
        itemCardStockButtons.classList.add("amountGroup");
        itemCardStockButtons.setAttribute("role", "group");

        const itemCardDecrease = document.createElement("button");
        itemCardDecrease.classList.add("btn");
        itemCardDecrease.classList.add("btn-outline-primary");
        itemCardDecrease.setAttribute("type", "button");
        const itemCardDecreaseID = `decrease${sentenceCase(stockList[item].name)}`;
        itemCardDecrease.setAttribute("id", itemCardDecreaseID);
        itemCardDecrease.setAttribute("onclick", "decreaseButton(this.id)");
        itemCardDecrease.textContent = "-";
        itemCardStockButtons.appendChild(itemCardDecrease);

        const itemCardAmount = document.createElement("input");
        itemCardAmount.classList.add("form-control-sm-1");
        itemCardAmount.classList.add("amountNumber");
        itemCardAmount.setAttribute("type", "number");
        const itemCardAmountID = `${stockList[item].name}Amount`;
        itemCardAmount.setAttribute("id", itemCardAmountID);
        itemCardAmount.setAttribute("placeholder", 1);
        itemCardAmount.setAttribute("min", 0);
        itemCardStockButtons.appendChild(itemCardAmount);

        const itemCardIncrease = document.createElement("button");
        itemCardIncrease.classList.add("btn");
        itemCardIncrease.classList.add("btn-outline-primary");
        itemCardIncrease.setAttribute("type", "button");
        const itemCardIncreaseID = `increase${sentenceCase(stockList[item].name)}`;
        itemCardIncrease.setAttribute("id", itemCardIncreaseID);
        itemCardIncrease.setAttribute("onclick", "increaseButton(this.id)");
        itemCardIncrease.textContent = "+";
        itemCardStockButtons.appendChild(itemCardIncrease);

        itemCardButtons.appendChild(itemCardStockButtons);

        const itemCardAdd = document.createElement("button");
        itemCardAdd.classList.add("btn");
        itemCardAdd.classList.add("btn-outline-primary");
        itemCardAdd.classList.add("btn-sm");
        itemCardAdd.classList.add("addButton");
        itemCardAdd.setAttribute("type", "button");
        const itemCardAddID = `add${sentenceCase(stockList[item].name)}`;
        itemCardAdd.setAttribute("id", itemCardAddID);
        itemCardAdd.setAttribute("onclick", "addButton(this.id)");
        itemCardAdd.textContent = "Add";
        itemCardButtons.appendChild(itemCardAdd);

        itemCardBody.appendChild(itemCardButtons);
        itemCard.appendChild(itemCardBody);
        itemGrid.appendChild(itemCard);
    }
}

unhideEverything = () => {
    // Have to use a while, as getElementsByClassName is an active nodelist. As we remove the list updates,
    //  so the next index willmean we've skipped one as index 1 will become index 0.
    let itemsToUnhide = document.getElementsByClassName("hide");
    while (itemsToUnhide.length) {
        itemsToUnhide[0].classList.remove("hide");
    }
}

hideCard = (cardToHide) => {
    document.getElementById(cardToHide).classList.add("hide");
}

hideGrid = (gridToHide) => {
    for (let elem in document.getElementsByClassName("itemGrid")) {
        if (document.getElementsByClassName("itemGrid")[elem].id !== gridToHide && document.getElementsByClassName("itemGrid")[elem].id) {
            document.getElementById(document.getElementsByClassName("itemGrid")[elem].id).classList.add("hide");
        }
    }
}

applyFilters = () => {
    const priceFrom = document.getElementById("priceFrom").value;
    const priceTo = document.getElementById("priceTo").value;

    // Below 2 lines put all the buttons within the item filter into an array using ID and then input type.
    // With this array, we check each item, and look to see where the value of checked is true.
    // Then we assign the ID into activeItemFiler, after removing the word "filter"
    const itemFilterButtons = Array.from(document.querySelectorAll("#itemFilterButtons input"));
    const activeItemFilter = itemFilterButtons.filter(item => item.checked === true)[0].id.slice(0, -6);

    const onlyShowStocked = document.getElementById("onlyShowStocked").checked; // Bool
    console.log(`${priceFrom} ${priceTo} ${activeItemFilter} ${onlyShowStocked}`);

    if (activeItemFilter !== "all") { // Check item filter first
        hideGrid(`${activeItemFilter}Grid`);
    } else {
        unhideEverything();
    }

    for (let item in stockList) {
        if (priceFrom > 0 && stockList[item].price < priceFrom) {
            hideCard(`${stockList[item].name}Card`);
        }

        if (priceTo > 0 && stockList[item].price > priceTo) {
            hideCard(`${stockList[item].name}Card`);
        }

        if (onlyShowStocked && stockList[item].quantity === 0) {
            hideCard(`${stockList[item].name}Card`);
        }
    }
}

resetFilters = () => {
    document.getElementById("priceFrom").value = "";
    document.getElementById("priceTo").value = "";
    document.getElementById("allFilter").checked = true;
    document.getElementById("foodFilter").checked = false;
    document.getElementById("drinkFilter").checked = false;
    document.getElementById("otherFilter").checked = false;
    document.getElementById("onlyShowStocked").checked = false;

    unhideEverything();
}

storeFront(stockList);
stockList.forEach((item) => getMaxValue(item.name));
console.log(stockList);