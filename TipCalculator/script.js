function calcBut(button) {
    let preTipTotal = document.getElementById("bill").value;
    let tipAmount = document.getElementById("tip").value;
    let tipType = document.getElementById("options").value;
    let split = document.getElementById("split").value;

    let tipTotal;
    let billTotal;

    if (!split) {
        split = 1;
    }
    preTipTotal = parseInt(preTipTotal);
    tipAmount = parseInt(tipAmount);

    if (tipType === "2") {
        tipTotal = tipAmount;
    } else {
        tipTotal = ((tipAmount / 100) * preTipTotal);
    }

    billTotal = tipTotal + preTipTotal;
    
    document.getElementById("billOutput").innerText = `Your bill total is £${billTotal.toFixed(2)}, meaning you tipped £${tipTotal.toFixed(2)}.
    
    Per person, you will be paying £${(billTotal/split).toFixed(2)}.`;        
}

function dropdownLabel(dropdown) {
    let tipType = document.getElementById("options").value;

    if (tipType == "2") {
        document.getElementById("tipLabel").innerText = "Enter the tip amount:";
    } else {
        document.getElementById("tipLabel").innerText = "Enter the tip percentage:";
    }
}